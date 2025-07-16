const express = require('express');
const fs = require('fs');
let users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8000;


//Middleware - Plugin
app.use(express.urlencoded({extended: false}));
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
    return res.json(users);
});

app.route("/api/users/:id")
.get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
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
        return res.json({ status: "User updated", user: users[user]  });
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
    users.push({...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err, data) => {
        return res.json({status: "Success", id: users.length});
    });
    
});

app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ${PORT}`));