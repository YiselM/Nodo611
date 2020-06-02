const mysql = require('mysql');
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors")
// init express

var app = express();
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
// this makes public folder
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.rendFile("index.html")
})
// --------------------------------------
/* var con = mysql.createConnection({
    host: "db4free.net",
    user: "baenav",
    password: "qwertyuiop",
    database: "proyecto_diseno"
}); */
var con = mysql.createConnection({
    host: "database-1.cbelsi1ervaq.us-east-1.rds.amazonaws.com",
    user: "adminpardo",
    password: "Pfestacion123!",
    database: "nodo"
});

con.connect(function (err) {
    if (err) throw err;
});


// querys 
const quer1 = "SELECT P1, P2, P3, P4, P5, estado, CONCAT_WS(' ', fecha, hora) AS datetime FROM datos " +
    "WHERE CONCAT_WS(' ', fecha, hora) > date_sub(NOW(), INTERVAL 7 HOUR)";

const querD = "SELECT P1, P2, P3, P4, P5, estado, CONCAT_WS(' ', fecha, hora) AS datetime FROM datos " +
    "WHERE CONCAT_WS(' ', fecha, hora) > date_sub(NOW(), INTERVAL 1 DAY)";


const querS = "SELECT P1, P2, P3, P4, P5, estado, CONCAT_WS(' ', fecha, hora) AS datetime FROM datos WHERE  YEARWEEK(fecha, 1) = YEARWEEK(CURDATE(), 1)";
//SELECT P1, P2, P3, P4, P5, estado, CONCAT_WS(' ', fecha, hora) AS datetime FROM datos WHERE YEARWEEK(fecha,1)=YEARWEEK(NOW(),1)-1";
// SELECT * FROM   datos WHERE  YEARWEEK(`fecha`, 1) = YEARWEEK(CURDATE(), 1)
//"SELECT P1, P2, P3, P4, P5, estado, CONCAT_WS(' ', fecha, hora) AS datetime FROM datos " +
//    "WHERE CONCAT_WS(' ', fecha, hora) > date_sub(NOW(), INTERVAL 1 WEEK)";

const querEstados = "SELECT estado FROM datos ORDER BY id DESC LIMIT 1";

const querActuales = "SELECT P1, P2, P3, P4, P5 FROM datos ORDER BY id DESC LIMIT 1";

// ----------------------------------
app.get('/Generar', function (req, res) {
    // console.log('Generando')
    con.query(quer1, function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        //console.log(JSON.stringify(result))
        res.send(JSON.stringify(result));

    });
    //con.end();

})
app.get('/GenerarDay', function (req, res) {
    // console.log('Generando')
    con.query(querD, function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
        //console.log(JSON.stringify(result))
        res.send(JSON.stringify(result));

    });
    //con.end();

})
app.get('/GenerarWeek', function (req, res) {
    // console.log('Generando')
    con.query(querS, function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
        //console.log(JSON.stringify(result))
        res.send(JSON.stringify(result));

    });
    //con.end();

});
app.get('/GenerarCal', function (req, res) {
    // console.log('Generando')
    console.log(req._parsedUrl.query)

    var Fechas = req._parsedUrl.query.split(",")
    console.log(Fechas)


    const querC = "SELECT P1, P2, P3, P4, P5, estado, CONCAT_WS(' ', fecha, hora) " +
        "AS datetime FROM datos WHERE fecha BETWEEN '" + Fechas[0] + "' AND '" + Fechas[1] + "' ORDER BY fecha ASC, hora ASC";

    con.query(querC, function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
        //console.log(JSON.stringify(result))
        res.send(JSON.stringify(result));

    });
    //con.end();

});

app.get('/GenerarEstados', function (req, res) {
    //console.log('Generando')
    con.query(querEstados, function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
        //console.log(JSON.stringify(result))
        res.send(JSON.stringify(result));

    });
    //con.end();

});

app.get('/GenerarActual', function (req, res) {
    //console.log('Generando')


    con.query(querActuales, function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
        //console.log(JSON.stringify(result))
        res.send(JSON.stringify(result));

    });
    //con.end();

});

app.get('/SwitchT', (req, res) => {
    const Uploadto5 = "INSERT INTO ToCinco (To5) VALUES (1) ";
    con.query(Uploadto5, function (err, result, fields) {
        if (err) throw err;
        res.json({
            ok: true
        });
        
    });
});

app.get('/SwitchF', (req, res) => {
    const Uploadto5 = "INSERT INTO ToCinco (To5) VALUES (0) ";
    con.query(Uploadto5, function (err, result, fields) {
        if (err) throw err;
        res.json({
            ok: true
        });

    });
});

//Esto es para activar y desactivar la red
app.get('/SwitchRT', (req, res) => {
    const REDT = "INSERT INTO ToCinco (To5) VALUES (1) ";
    console.log("activada")
    con.query(REDT, function (err, result, fields) {
        if (err) throw err;
        res.json({
            ok: true
        });

    });
});

app.get('/SwitchRF', (req, res) => {
    const REDF = "INSERT INTO ToCinco (To5) VALUES (0) ";
    console.log("desactivada")
    con.query(REDF, function (err, result, fields) {
        if (err) throw err;
        res.json({
            ok: true
        });

    });
});

app.get('/RED', (req, res) => {
    const RED = "SELECT To5 FROM ToCinco ORDER BY id DESC LIMIT 1";
    con.query(RED, function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));

    });
});
// ----------------------------------
app.listen(process.env.PORT || 3000, function () {
    console.log("Running server too")
});