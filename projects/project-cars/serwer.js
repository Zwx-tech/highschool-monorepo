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

//* handlebars set up
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs'
}));
app.set('view engine', 'hbs');

//? GET
//* BASE route
app.get("/", function (req, res) {
    res.render('view.hbs');  
})

//* ADD route
app.get("/add", function (req, res) {
    res.render('add.hbs'); 
})

//* LIST route
app.get("/list", function (req, res) {
    res.render('list.hbs'); 
})

//* DELETE route
app.get("/delete", function (req, res) {
    res.render('delete.hbs');
})

//* EDIT route
app.get("/edit", function (req, res) {
    res.render('edit.hbs');
})

//* static
//? remeber use static right before the listen func
app.use(express.static(path.join(__dirname, 'static')))

//* SERVE
app.listen(PORT, () => {
    console.log(`App running at port ${PORT}`)
})
