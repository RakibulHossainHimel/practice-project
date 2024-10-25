const ProfileModel = require('../models/ProfileModel');
const jwt = require("jsonwebtoken");




//Create Profile
exports.CreateProfile=(req,res)=> {
    let reqBody = req.body;

    ProfileModel.create(reqBody).then((data) => {
        res.status(201).json({status: "Success", data: data});
    }).catch((err) => {
        res.status(400).json({status: "fail", data: err});
    })
}


//Login
exports.UserLogin=(req,res)=> {
    let UserName = req.body['UserName'];
    let Password = req.body['Password'];


    ProfileModel.find({UserName:UserName, Password:Password}).then((data) => {
        if(data.length > 0){
            //Create Auth Token
            let payload={
                exp:Math.floor(Date.now()/1000)+(24*60*60), data:data[0]
            }
            let token = jwt.sign(payload,"SecretKey123");

            res.status(201).json({status: "Success",token:token, data: data[0]});
        }
        else{
            res.status(401).json({status: "Unauthorized"});
        }
    }).catch((err) => {
        res.status(400).json({status: "fail", data: err});
    })
}


//Select Profile
exports.SelectProfile=(req,res)=> {
    let UserName = req.headers['username'];


    ProfileModel.find({UserName:UserName}).then((data) => {
            res.status(201).json({status: "Success", data: data[0]});
    }).catch((err) => {
        res.status(400).json({status: "fail", data: err});
    })
}

exports.UpdateProfile=(req,res)=> {
    let UserName = req.headers['username'];
    let Query ={UserName:UserName};
    let reqBody = req.body;
    ProfileModel.updateOne(Query,reqBody).then((data) => {
        res.status(201).json({status: "Success", data: data});
    }).catch((err) => {
        res.status(400).json({status: "fail", data: err});
    })
}