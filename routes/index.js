var express = require('express');
var router = express.Router();
var Task = require('../models/task');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://todo:todo321@cluster0-pmkr5.mongodb.net/todoDb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/task', function (req, res, next) {
  Task.find().exec(function (err, tasks) {
    if (err) {
      console.error(err);
      res.status(300).json({ status: error, message: err })
    } else {
      res.json({
        status: 'Success',
        data: tasks
      })

    }

  });
  // res.json([
  //   { id: 1, name: 'Get up' },
  //   { id: 2, name: 'Eat' },
  //   { id: 3, name: 'Go to school' },
  //   { id: 4, name: 'Study' },
  //   { id: 5, name: 'Go home' },
  //   { id: 6, name: 'Sleep' }
  // ]);
});

router.post('/task', function(req, res, next){
  console.log(req.body);
});
module.exports = router;
