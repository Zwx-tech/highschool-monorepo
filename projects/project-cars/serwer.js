//* require
const Datastore = require("nedb");
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

//* express set up
const app = express();
const PORT = 3000;

//* db set up
const db = new Datastore({
    filename: "collection.db",
    autoload: true
});

//* handle post
app.use(express.urlencoded({
    extended: true
}));

//* handlebars set up
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    helpers: {
         
    }
}));
app.set('view engine', 'hbs');


//* HELPERS
function parseCarValues(value) {
    if(value === null) return 'BRAK';
    if(value === false) return 'NIE';
    return 'TAK';
}

function parseCar(car) {
    const parsedData = {
        ...car,
        ubezpiecznie: parseCarValues(car.ubezpiecznie),
        benzyna: parseCarValues(car.benzyna),
        uszkodzony: parseCarValues(car.uszkodzony),
        naped: parseCarValues(car.naped)
    }   
    return {
        ...parsedData,
        alertData: JSON.stringify(parsedData, null, 5)
    }    
}

//? GET
//* BASE route
app.get("/", function (req, res) {
    res.render('view.hbs');  
})

//* ADD route
app.get("/add", function (req, res) {
    console.log(req.body)
    res.render('add.hbs'); 
})

//* LIST route
app.get("/list", function (req, res) {
    db.find({}, (err, cars) => {
        const parsedCars = cars.map(car => parseCar(car));
        res.render('list.hbs', { cars: parsedCars }); 
    })
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
