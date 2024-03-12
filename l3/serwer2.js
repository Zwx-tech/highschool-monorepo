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

// add static files
app.use(express.static('static'));

// for valid jsons
app.use(express.json());


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/html/no-form.html"));
});

app.post("/handleFetch", (req, res) => {
    res.header("content-type","application/json");
    
    const {first, second, operation} = req.body;
    const [num1, num2] = [parseInt(first), parseInt(second)];

    const response = []
    if(operation == "suma" || operation == "wszystko") {
        response.push({
            message: "Suma 2 elementów",
            wynik: num1 + num2
        });

    }
    if(operation == "roznica" || operation == "wszystko") {
        response.push({
            message: "Roznica 2 elementów",
            wynik: num1 - num2
        });
        
    }
    if(operation == "mnozenie" || operation == "wszystko") {
        response.push({
            message: "Iloraz 2 elementów",
            wynik: num1 * num2
        });
        
    }
    if(operation == "dzielenie" || operation == "wszystko") {
        response.push({
            message: "Iloczyn 2 elementów",
            wynik: num2 != 0 ? num1 / num2 : "Nie mozna dzielic przez 0"
        });
    }
    console.log(response);
    
    if(operation != "wszystko") {
        res.send(JSON.stringify(response[0], null, 5));
        return;
    }
    res.send(JSON.stringify(response, null, 5));
});



app.listen(PORT, () => {
    console.log("serwer started");
})