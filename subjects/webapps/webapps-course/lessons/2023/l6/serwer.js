//* require
const Datastore = require("nedb");
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

//* express set up
const app = express();
const PORT = 3000;

//* handle post
app.use(express.urlencoded({
    extended: true
}));

//* db set up
const coll1 = new Datastore({
  filename: "collection.db",
  autoload: true
});

//* handlebars set up
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs'
}));
app.set('view engine', 'hbs');

//? GET
app.get("/", function (req, res) {
    res.render('view.hbs');   // nie podajemy ścieżki tylko nazwę pliku
})

//? POSRT
app.post("/handleForm", function (req, res) {
    const { login, password } = req.body;
    //? add user to db
    coll1.insert({login, password, timestamp: Date.now()}, function(err, newDoc) {
        console.log(`added user of id: ${newDoc._id}`);
        coll1.find({}, function (err, users) {
            users.sort(user => user.timestamp); //* sort users by timestamp
            res.render('view.hbs', {users});
        });
    });
    
})

//* static
app.use(express.static(path.join(__dirname, 'static')))

//* SERVE
app.listen(PORT, () => {
    console.log(`App running at port ${PORT}`)
})