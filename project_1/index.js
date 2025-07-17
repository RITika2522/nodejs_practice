const express = require('express');
const fs = require('fs');
const mongo = require('mongoose');
// let users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8000;

//Connection
mongo.connect('mongodb://127.0.0.1:27017/job-app')
.then(() => console.log('Database connected successfully'))
.catch((err) => console.log("Database Connection error", err));  

//Schema
const userSchema = new mongo.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email:{
        type: String,
        required:true,
        unique: true,
    },
    jobTitle:{
        type: String,
    },
    gender:{
        type: String
    }
},{timestamps: true});

//Model
const Usermd = mongo.model('user', userSchema);

//Middleware - Plugin
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    fs.appendFile('log.txt',`${Date.now()} : ${req.method}: ${req.path}\n`, (err,data) =>  {next();});
    // console.log("Hello from middleware 1");
    // req.myUsername = "Ritika";
    // return res.json({msg: "Respose from middleware 1"});
    //next();
});

// app.use((req, res, next) => {
//     console.log("Hello from middleware 2", req.myUsername);
//     // return res.end("Hey");
//     next();
// });

//Routes

app.get('/users/', async(req,res) => {
    const allDbUsers = await Usermd.find({});
    const html = `
    <ul>
        ${allDbUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

//REST API 

app.get('/api/users', async(req,res) => {
    const allDbUsers = await Usermd.find({});
    // console.log("I am in get route", req.myUsername);
    res.setHeader("newHeader","Ritika Chandak");
    //Good practice to add X before custome headers
    return res.json(allDbUsers);
});

app.route("/api/users/:id")
.get(async(req,res) => {
    const user = await Usermd.findById(req.params.id);
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    if(!user)return res.status(404).json({error: "User not found"});
    return res.json(user);
})
.put((req,res) => {
    return res.json({status: "pending"});
})
.patch(async(req,res) => {
    const user = await Usermd.findByIdAndUpdate(req.params.id, req.body, {new: true});
    // const id =Number(req.params.id);
    // const user = users.findIndex((user) => user.id === id);
    if(!user){
        return res.status(404).json({status: "User not found"});
    }
    return res.json({status: "User updated", user: req.body});
    // users[user] = { ...users[user], ...req.body };
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
    //     if (err) return res.status(500).json({ status: "Error updating user" });
    //     return res.status(205).json({ status: "User updated", user: users[user]  });
    // });
    
    
})
.delete(async(req,res) => {
    await Usermd.findByIdAndDelete(req.params.id);
    return res.json({status:"Success"});
    // const id = Number(req.params.id);
    // const userId = users.findIndex((user) => user.id === id);
    // if(userId === -1){
    //     return res.status(404).json({status: "User not found"});
    // }
    // users = users.filter((user) => user.id !== id);
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users.filter((user) => user.id !== id)), (err) => {
    //     if (err) return res.status(500).json({ status: "Error deleting user" });
    //     return res.json({ status: "User deleted" });
    // });
    
});

app.post('/api/users',async(req,res) => {
    const body = req.body;
    if(!body ||!body.first_name || !body.last_name || !body.email || !body.job_title){
        return res.status(400).json({status: "Bad Request", message: "Please provide all required fields"});
    }
    const result =await Usermd.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    return res.status(201).json({msg:"User created Successfully"});
});

app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ${PORT}`));