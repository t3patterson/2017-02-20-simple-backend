let Router = require('express').Router;
const apiRouter = Router()

/*
 * NOTE: the model for the data-table should not have the name 'SomeModel'
 */
let SomeModel = require('../db/models/bandModel.js')


apiRouter
  .get('/bands', function(req, res){
   SomeModel.find(req.query , function(err, results){
     if(err) return res.json(err)
     res.json(results).status(200)
   })
 })
 .get('/bands/:_id', function(req, res){
   SomeModel.findById(req.params._id, "-password", function(err, record){
     if(err || !record ) return res.json(err)
     res.json(record).status(200)
   })
 })
 .post('/bands', function(req, res){
     let newRecord = new SomeModel(req.body)

     newRecord.save(function(err, record){
        if(err) return res.status(500).send(err)
        let objCopy = newRecord.toObject()
        delete objCopy.password
        res.json(objCopy).status(200)
     })
 })
 .put('/bands/:_id', function(req, res){

   SomeModel.findByIdAndUpdate(req.params._id, req.body, function(err, record){
       if (err) {
         res.status(500).send(err)
       }
       else if (!record) {
         res.status(400).send('no record found with that id')
       }
       else {
         res.json(Object.assign({},req.body,record)).status(200)
       }
   })
 })

 .delete('/bands/:_id', function(req, res){
   SomeModel.remove({ _id: req.params._id}, (err) => {
     if(err) return res.json(err)
     res.json({
       msg: `record ${req.params._id} successfully deleted`,
       _id: req.params._id
     }).status(200)
   })
 })

 // TO DELETE ALL:
 // .delete("/resources/all/records", function(req, res){
 //   SomeModel.remove({}, (err) => {
 //     if(err) return res.json(err)
 //     res.json({
 //       msg: `EVEYTHING successfully deleted`
 //     })
 //   })
 // })

module.exports = apiRouter