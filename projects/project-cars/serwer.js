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
    extname: '.hbs',
    partialsDir: "views/partials",
    helpers: {
        "isCarSelected": function (id, options) {
            if (options.data.root.selectedCar == id) {
                return options.fn(this);
            } 
            return options.inverse(this);
        },
        "equal": function (a, b, options) {
            if (a === b) {
                return 'selected';
            } 
            return '';
        }
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
    };   
    return {
        ...parsedData,
        alertData: JSON.stringify(parsedData, null, 5)
    }    
}

function fetchAllCars() {
    return new Promise((resolve, reject) => {
        db.find({}, (err, cars) => {
            if (err) {
                reject(err);
                return;
            } 
            const parsedCars = cars.map(car => parseCar(car));
            resolve(parsedCars);
        });
    });
}

function delCarById(id) {
    return new Promise((resolve, reject) => {
        db.remove({_id: id}, (err, n) => {
            if (err) {
                reject(err);
                return;
            } 
            resolve();
        });
    });
}

function delCarsByIds(idList) {
    const deleteCount = idList.length;
    return new Promise(async (resolve, reject) => {
        for(const id of idList) {
            try {
                await delCarById(id);
            } catch {
                deleteCount -= 1;
            }
        }
        resolve(deleteCount);
    });
}

function getIdFromReq(query) {
    for(const [key, value] of query) {
        if(value === '') {
            return key
        }
    }  
    return null;
}

function parseSelectEntry(entry) {
    if(entry == "true") return true
    if(entry == "false") return false
    return null
}

function getCarDataFromReq(body) {
    return {
        ubezpiecznie: parseSelectEntry(body.ubezpiecznie),
        benzyna: parseSelectEntry(body.benzyna),
        uszkodzony: parseSelectEntry(body.uszkodzony),
        naped: parseSelectEntry(body.naped)
    }
}


function updateCarById(id, editedCar) {
    console.log(editedCar)
    return new Promise((resolve, reject) => {
        db.update({ _id: id }, { $set: {...editedCar} }, {}, (err, n) => {
            if (err) {
                reject(err);
                return;
            } 
            resolve();
        });
    });
}
const templateDbObject = {
    ubezpiecznie: false,
    benzyna: false,
    uszkodzony: false,
    naped: false
}

//? GET
//* BASE route
app.get("/", function (req, res) {
    res.render('view.hbs');  
})

//* ADD route
app.get("/add", function (req, res) {
    res.render('add.hbs'); 
})

app.post("/add", function (req, res) {
    const carData = Object.keys(req.body);
    const car = structuredClone(templateDbObject);
    for(const key of carData) {
        car[key] = true;
    }
    db.insert(car, (err, newDoc) => {
        res.render('add.hbs', {alert: `new car with id = ${newDoc._id} added to database`});
    })
});

//* LIST route
app.get("/list", async function (req, res) {
    res.render('list.hbs', { cars: await fetchAllCars() }); 
})

//* DELETE route
app.get("/delete", async function (req, res) {
    res.render('delete.hbs', { cars: await fetchAllCars() }); 
})

app.get('/deleteAll', function (req, res) {
    db.remove({}, { multi: true }, async (err, n) => {
        res.render('delete.hbs', { deletedCars: n, cars: await fetchAllCars() });
    })
}); 

app.get('/deleteSelected', async function (req, res) {
    const carsToDel = Object.keys(req.query);
    res.render('delete.hbs', {cars: await fetchAllCars(), deletedCars: await delCarsByIds(carsToDel)});
}); 

app.get('/deleteSingle', async function (req, res) {
    const inputs = Object.entries(req.query);
    for(const [key, value] of inputs) {
        if(value === '') {
            await delCarById(key)
            break;
        }
    }
    res.render('delete.hbs', {cars: await fetchAllCars(), deletedCars: 1});
}); 

//* EDIT route
app.get("/edit", async function (req, res) {
    const query = Object.entries(req.query);
    const selectedCar = getIdFromReq(query);
    res.render('edit.hbs', {cars: await fetchAllCars(), selectedCar: selectedCar});
})

//* EDIT route
app.post("/update", async function (req, res) {
    const resData = Object.entries(req.body);
    const carId = getIdFromReq(resData);
    const carData = getCarDataFromReq(req.body);
    await updateCarById(carId, carData);
    res.redirect('/edit')
})

//* static
//? remeber use static right before the listen func
app.use(express.static(path.join(__dirname, 'static')))

//* SERVE
app.listen(PORT, () => {
    console.log(`App running at port ${PORT}`)
})
