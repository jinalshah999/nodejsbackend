var express = require('express');
var router = express.Router();
var student_model=require('../models/student_model');
router.get('/',function(req,res,next){

    student_model.getAllStudent(function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});
router.post('/',function(req,res,next){

        student_model.addStudent(req.body,function(err,count){
            if(err)
            {
                res.json(err);
            }
            else{
                    res.json(req.body);//or return count for 1 & 0
            }
        });
});
router.post('/:id',function(req,res,next){

student_model.deleteStudent(req.body,function(err,count){

                if(err){
                    res.json(err);
                }
                else{
                    res.json(req.body);
                }

});
});

module.exports=router;