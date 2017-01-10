var db=require('../dbconnection');
var fs = require('fs');
var Student={
    getAllStudent:function(callback){

return db.query("select * from student_tbl",callback);
    },
    deleteStudent:function(Stu,callback){
        if(Student.student_img!='')
        {
        var path='./public'+Stu.student_img;
        fs.unlink(path,function(err){
            if(err){
            console.log(err);
            }
            console.log('Deleted successfuly')});
        }
return db.query("delete from student_tbl where rno=?",[Stu.rno],callback);        
    },
addStudent:function(Stu,callback){
    var dt=new Date();//current date and time of server
    var text = "";//random text
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        var pos=Stu.student_img.indexOf(",");
    var base64d=Stu.student_img.substring(pos+1);
    var path="./public/images/"+text+dt.getDate()+dt.getMonth()+dt.getMilliseconds()+".png";
    var path1="/images/"+text+dt.getDate()+dt.getMonth()+dt.getMilliseconds()+".png";
    fs.writeFile(path,base64d,'base64',function(err){
        if(err) {
        return console.log(err);
        }
        console.log("The file was saved!");
    });

return db.query("Insert into student_tbl values(?,?,?,?)",[Stu.rno,Stu.name,Stu.mobile_no,path1],callback);
}
};
module.exports=Student;