const ToDoListModel = require("../models/ToDoListModel")

exports.CreateToDo=(req,res)=>{
    let reqBody=req.body;
    let TodoSubject=reqBody['TodoSubject']
    let TodoDescription=reqBody['TodoDescription']
    let UserName=req.headers['username']
    let TodoStatus="New"
    let TodoCreateDate=Date.now();
    let TodoUpdateDate=Date.now();

    let PostBody={
        UserName:UserName,
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        TodoStatus:TodoStatus,
        TodoCreateDate:TodoCreateDate,
        TodoUpdateDate:TodoUpdateDate
    }

    ToDoListModel.create(PostBody).then((data) => {
        res.status(201).json({status: "Success", data: data});
    }).catch((err) => {
        res.status(400).json({status: "fail", data: err});
    })
}



exports.SelectToDo=(req,res)=>{
    let UserName=req.headers['username']
    ToDoListModel.find({UserName:UserName}).then((data) => {
        res.status(201).json({status: "Success", data: data});
    }).catch((err) => {
        res.status(400).json({status: "fail", data: err});
    })
}

exports.UpdateToDo=(req,res)=>{

    let TodoSubject=req.body['TodoSubject']
    let TodoDescription=  req.body['TodoDescription']
    let _id=  req.body['_id']
    let TodoUpdateDate=Date.now();

    let PostBody={
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        TodoUpdateDate:TodoUpdateDate,
    }

    ToDoListModel.updateOne({_id:_id},{$set:PostBody},{upsert:true}).then((data) => {
        res.status(201).json({status: "Success", data: data});
    }).catch((err) => {
        res.status(400).json({status: "fail", data: err});
    })

}


exports.UpdateStatusToDo=(req,res)=>{

    let TodoStatus=req.body['TodoStatus']
    let _id=  req.body['_id']
    let TodoUpdateDate=Date.now();

    let PostBody={
        TodoStatus:TodoStatus,
        TodoUpdateDate:TodoUpdateDate,
    }

    ToDoListModel.updateOne({_id:_id},{$set:PostBody},{upsert:true}).then((data) => {
        res.status(201).json({status: "Success", data: data});
    }).catch((err) => {
        res.status(400).json({status: "fail", data: err});
    })
}


exports.RemoveToDo=(req,res)=>{

    let _id=  req.body['_id']

    ToDoListModel.deleteOne({_id:_id}).then((data) => {
        res.status(201).json({status: "Success", data: data});
    }).catch((err) => {
        res.status(400).json({status: "fail", data: err});
    })
}


exports.SelectToDoByStatus=(req,res)=>{
    let UserName=req.headers['username']
    let TodoStatus=  req.body['TodoStatus']
    ToDoListModel.find({UserName:UserName,TodoStatus:TodoStatus}).then((data) => {
        res.status(201).json({status: "Success", data: data});
    }).catch((err) => {
        res.status(400).json({status: "fail", data: err});
    })
}


exports.SelectToDoByDate=(req,res)=>{
    let UserName=req.headers['username']
    let FormDate=  req.body['FormDate']
    let ToDate=  req.body['ToDate']

    ToDoListModel.find({UserName:UserName,TodoCreateDate:{$gte:new Date(FormDate),$lte:new Date(ToDate)}}).then((data) => {
        res.status(201).json({status: "Success", data: data});
    }).catch((err) => {
        res.status(400).json({status: "fail", data: err});
    })
}