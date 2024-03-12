const express = require('express');
const cors = require("cors")

const app = express();
app.use(cors());


app.get("/", (req, res) => {
    res.send([
        {
           "id": 111,
           "kolor": "yellow"
        },
        {
           "id": 222,
           "kolor": "red"
        },
        {
           "id": 555,
           "kolor": "green"
        },
        {
           "id": 888,
           "kolor": "blue"
        },
        {
           "id": 999,
           "kolor": "violet"
        }
      ]);
});


app.listen(3000, () => {
    console.log('app started')
})