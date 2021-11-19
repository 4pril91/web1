const express = require('express')
const app = express()
const port = 3000

//db 연결
const connect = require('./schemas')
connect()

//body
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const boardRoute = require("./routes/board");
app.use("/writeApi", [boardRoute]);
app.use("/listApi", [boardRoute]);
app.use("/updateApi", [boardRoute]);

// ejs setting
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('write')
});

app.get('/detail', (req, res) => {
    res.render('detail')
});

app.get('/update', (req, res) => {
    res.render('update')
});

app.get('/list', (req, res) => {
    res.render('list')
});


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
});
