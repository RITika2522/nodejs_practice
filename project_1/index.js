const express = require('express');
const fs = require('fs');
let users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8000;


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

app.get('/users/', (req,res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

//REST API 

app.get('/api/users', (req,res) => {
    // console.log("I am in get route", req.myUsername);
    res.setHeader("newHeader","Ritika Chandak");
    //Good practice to add X before custome headers
    return res.json(users);
});

app.route("/api/users/:id")
.get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user)return res.status(404).json({error: "User not found"});
    return res.json(user);
})
.put((req,res) => {
    return res.json({status: "pending"});
})
.patch((req,res) => {
    const id =Number(req.params.id);
    const user = users.findIndex((user) => user.id === id);
    if(!user){
        return res.status(404).json({status: "User not found"});
    }
    users[user] = { ...users[user], ...req.body };
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) return res.status(500).json({ status: "Error updating user" });
        return res.status(205).json({ status: "User updated", user: users[user]  });
    });
    
    
})
.delete((req,res) => {
    const id = Number(req.params.id);
    const userId = users.findIndex((user) => user.id === id);
    if(userId === -1){
        return res.status(404).json({status: "User not found"});
    }
    users = users.filter((user) => user.id !== id);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users.filter((user) => user.id !== id)), (err) => {
        if (err) return res.status(500).json({ status: "Error deleting user" });
        return res.json({ status: "User deleted" });
    });
    
});

app.post('/api/users',(req,res) => {
    const body = req.body;
    if(!body ||!body.first_name || !body.last_name || !body.email || !body.job_title){
        return res.status(400).json({status: "Bad Request", message: "Please provide all required fields"});
    }
    users.push({...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err, data) => {
        return res.status(201).json({status: "Success", id: users.length});
    });
    
});

app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ${PORT}`));