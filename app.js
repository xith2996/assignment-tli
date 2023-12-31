require("dotenv").config();
require("./config/database").connect();
const mongoose = require("mongoose");

const express = require("express");

const app = express();
const Insured = require("./models/customer");
const indexController = require("./controllers/indexController");
const getRateController = require("./controllers/getRateController");

app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");

const validateRequest = (req, res, next) => {
  const { headerData, requestRecord } = req.body;

  if (
    !headerData ||
    !headerData.messageID ||
    !headerData.sentDateTime ||
    !requestRecord ||
    !requestRecord.insureName
  ) {
    return res.status(400).send({
      headerData: {
        responseDateTime: new Date().toISOString(),
      },
      responseStatus: {
        status: "E",
        errorCode: "BAD_REQUEST",
        errorMessage: "Missing necessary fields in the request.",
      },
    });
  }

  next();
};

const formatDate = (dateTime) => {
  const date = new Date(dateTime);
  const formattedDate = date.toISOString().split("T")[0];
  const formattedTime = date.toTimeString().split(" ")[0];
  return `${formattedDate} ${formattedTime.split(":").slice(0, 3).join(":")}`;
};

app.get("/", indexController);
app.get("/getrate", getRateController);

app.delete("/api/delete/:id", async (req, res) => {
  // http://localhost:4000/api/delete/64e7531b5a50c3d867c8dfda
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        responseStatus: {
          status: "E",
          errorCode: "INVALID_ID",
          errorMessage: "Provided ID is not a valid MongoDB ObjectId.",
        },
      });
    }

    const deletedCustomer = await Insured.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).send({
        responseStatus: {
          status: "E",
          errorCode: "NOT_FOUND",
          errorMessage: "Insured not found.",
        },
      });
    }

    res.send({
      responseStatus: {
        status: "S",
        errorCode: "",
        errorMessage: "",
      },
      data: {
        message: "Insured deleted successfully.",
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      responseStatus: {
        status: "E",
        errorCode: "INTERNAL_ERROR",
        errorMessage: "An error occurred while processing the request.",
      },
    });
  }
});

app.get("/api/fetchall", async (req, res) => {
  const cust = await Insured.find();
  res.status(201).json(cust);
});

app.post("/api/add", async (req, res) => {
  //   {
  //     "insureName": "Tanasak",
  //     "policies": [
  //        {
  //           "policyNo": "P00099",
  //           "policyType": "AB",
  //           "status": "A",
  //           "agentID": "00000004"
  //        }
  //     ]
  // }
  try {
    const { insureName, policies } = req.body;
    if (!insureName || !policies || policies.length === 0) {
      res.status(400).send({
        headerData: {
          responseDateTime: formatDate(new Date().toISOString()),
        },
        responseStatus: {
          status: "E",
          errorCode: "BAD_REQUEST",
          errorMessage: "Missing necessary fields in the request.",
        },
      });
    }

    const oldCus = await Insured.findOne({ insureName });

    if (oldCus) {
      res.status(409).send({
        headerData: {
          responseDateTime: formatDate(new Date().toISOString()),
        },
        responseStatus: {
          status: "E",
          errorCode: "Duplicate",
          errorMessage: "Customer already exist.",
        },
      });
    }

    const cust = await Insured.create({
      insureName,
      policies,
    });

    res.status(201).json(cust);
  } catch (error) {}
});

app.post("/api/fetch", validateRequest, async (req, res) => {
  //   {
  //     "headerData": {
  //         "messageID": "12345ABC",
  //         "sentDateTime": "2023-08-24T12:00:00Z"
  //     },
  //     "requestRecord": {
  //         "insureName": "Mr.A"
  //     }
  // }
  try {
    const insured = await Insured.findOne({
      insureName: req.body.requestRecord.insureName,
    });

    if (!insured) {
      return res.status(404).send({
        headerData: {
          responseDateTime: formatDate(new Date().toISOString()),
        },
        responseStatus: {
          status: "E",
          errorCode: "NOT_FOUND",
          errorMessage: "Insured not found.",
        },
      });
    }

    const primaryPolicy = insured.policies[0];

    res.send({
      headerData: {
        messageID: req.body.headerData.messageID,
        sentDateTime: formatDate(req.body.headerData.sentDateTime),
        responseDateTime: formatDate(new Date().toISOString()),
      },
      responseRecord: {
        policy: insured.policies,
        policyNo: primaryPolicy.policyNo,
        policyType: primaryPolicy.policyType,
        status: primaryPolicy.status,
        agentID: primaryPolicy.agentID,
      },
      responseStatus: {
        status: "S",
        errorCode: "",
        errorMessage: "",
      },
    });
  } catch (err) {
    console.error(err.errorMessage);
    res.status(500).send({
      headerData: {
        responseDateTime: formatDate(new Date().toISOString()),
      },
      responseStatus: {
        status: "E",
        errorCode: "INTERNAL_ERROR",
        errorMessage: "An error occurred while processing the request.",
      },
    });
  }
});

module.exports = app;
