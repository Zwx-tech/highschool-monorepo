const Datastore = require("nedb");
const path = require('path');

//* db set up
const db = new Datastore({
    filename: "collection.db",
    autoload: true
});

function addToDb(data) {
    db.insert(data, (err, neDoc) => {
        console.log('Dodano pomyślnie')
    });
}
/*
? DB structure
* @param _id represents string
* @param ubezpiecznie null | bool
* @param benzyna null | bool
* @param uszkodzony null | bool
* @param naped null | bool
*/

addToDb({
    ubezpiecznie: true,
    benzyna: true,
    uszkodzony: true,
    naped: true
});

addToDb({
    ubezpiecznie: true,
    benzyna: true,
    uszkodzony: true,
    naped: null
});

addToDb({
    ubezpiecznie: true,
    benzyna: true,
    uszkodzony: true,
    naped: false
});

addToDb({
    ubezpiecznie: true,
    benzyna: false,
    uszkodzony: true,
    naped: true
});