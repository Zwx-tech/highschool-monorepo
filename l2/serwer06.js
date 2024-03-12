// imports
const express = require("express");
const path = require("path")

// app setup
const app = express("");
const PORT = 3000;

// for valid post
app.use(express.urlencoded({
    extended: true
}));

const users = [
    {nick: "111", email: "111@wp.pl"},
    {nick: "222", email: "222@wp.pl"},
    {nick: "333", email: "333@wp.pl"},
    {nick: "444", email: "444@wp.pl"},
    {nick: "555", email: "555@wp.pl"}
]

// add static files
app.use(express.static('static'));

// helper func
function generateSelect() {
    return `<tr>
    <td><label for="${carName}">${id} -> ${carName}</label></td>
    <td><input type="radio" name="${carName}" value="new"></td>
    <td><input type="radio" name="${carName}" value="used"></td>
    <td><input type="radio" name="${carName}" value="damaged"></td>
    </tr>`
}

// routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/html/addUser.html"));
});

app.post("/handleForm", (req, res) => {
    const { email, nick } = req.body;
    console.log(email);
    if(users.some(el => el.email == email)) {
        res.send("Istnieje user z takim adresem email");  
        return;
    }
    users.push({nick: nick, email: email});
    res.send("Dodano usera do bazy");  
});

app.get("/deleteBySelect", (req, res) => {

});

app.get("/deleteByRadio", (req, res) => {
    
});

app.get("/deleteByCheckbox", (req, res) => {
    let selectBody = '';
    users.forEach(user => {
        selectBody += `<div><input type="checkbox" name="usersToDel" value="${user.email}"/><span> ${user.email}</span></div>`
    });
    res.send(`<form action="/deleteUsers" method="POST" style="display: flex; flex-direction: column; align-items: flex-start; gap: .5rem;">${selectBody}<button type="submit">Submit</button></form>`);
});

app.post('/deleteUsers', (req, res) => {
    console.log(req.body);
    const { userToDel } = req.body;
    if(!userToDel) {
        res.sendFile(path.join(__dirname, "/static/html/addUser.html"));
    } else {
        console.log(123);
    }
});


app.listen(PORT, () => {
    console.log("serwer started");
})