const hardCodedRequest = {
    headerData: {
        messageID: "uniqueID",
        sentDateTime: "now"
    },
    requestRecord: {
        insureName: ""
    }
};

module.exports = (req, res) => {
    res.render('index', {
        request: JSON.stringify(hardCodedRequest, null, 2)
    });
}