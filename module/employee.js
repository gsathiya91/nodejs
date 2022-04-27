const { ObjectId } = require('mongodb');
const mongo = require('../shared/connect');

module.exports.getEmployees = async (req, res, next) => {
    try {
        var data = await mongo.selectedDB.collection('employee').find().toArray();
        // console.log(data);
        res.send(data)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
}

module.exports.getEmployee = async (req, res, next) => {
    try {
        var data = await mongo.selectedDB.collection('employee').findOne({ _id: ObjectId(req.params.id) });
        // console.log(data);
        res.send(data)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
}

module.exports.createEmployee = async (req, res, next) => {
    try {
        var data = await mongo.selectedDB.collection("employee").insertOne(req.body);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

module.exports.updateEmployee = async (req, res, next) => {
    try {
        var data = await mongo.selectedDB.collection("employee").findOneAndUpdate(
            { _id: ObjectId(req.params.id) }, { $set: { ...req.body }}, {retunrNewDocument: true})
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

module.exports.updateEmployeeRole = async (req, res, next) => {
    try {
        var data = await mongo.selectedDB.collection("employee").updateOne(
            { _id: ObjectId(req.params.id) }, 
            { $set: { role: req.body.role, salary: req.body.alary }})
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

module.exports.deleteEmployee = async (req, res, next) => {
    try {
        var data = await mongo.selectedDB.collection("employee").remove({_id: ObjectId(req.params.id)})
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}