var express = require("express");
var router = express.Router();

router.post('/register',(req,res)=>{

        // const query1 = "select email from poc1";
        // const query2 = "insert into poc1 set?";

        const hash = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));
        const user = {
            name:req.body.username,
            email:req.body.email,
            password:hash
        }

        User.findOne({email:req.body.email},(error,result)=>{
            if(error){
                res.send({status:"error",message:"Something wrong in email finding"})
            }else if(result){
                res.send({status:"error",message:"Email already exists"})
            }else{
                //res.send({status:"success",message:"Email doesnot exist please proceed"})
                User.create(user,(error,result)=>{
                    if(error){
                        res.send({status:"error",message:"Error in inserting into database"})
                    }else{
                        res.send({status:"success",message:"User registered successfully Please login",data:result})
                    }
                })
            }
        })
    })

router.post('/login',(req,res)=>{
        //const query3 = "select email from poc1 where=?";
       // const query4 = ""
        console.log(req.body)
       User.findOne({email:req.body.email},(error,result)=>{
           if(error){
               res.send({status:"0",message:"Error in email finding"})
           }else if(!result){
               res.send({status:"0",message:"Email doesnot exists"})
           }else{

            console.log(result);
           // console.log(req.session.user);
            console.log(req.session);
              // res.send({status:"success",message:""})
              if(bcrypt.compareSync(req.body.password,result.password)){
                req.session.user = result;
                res.send({status:"1",message:"Login successful",data:result});
              }else{
                  delete result["password"]
                res.send({status:"0",message:"authentication failed"});
              }
           }
       })
    })

    // router.post("/trail",function(req,res){
    //     res.render("trail");
    // })


module.exports = router;
