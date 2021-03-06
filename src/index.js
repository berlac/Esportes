const express = require('express')
//const bodyParser = require('body-parser')
const path = require('path')
const flash = require('req-flash')
var session = require('express-session')

require('./database/index')

var produtoRoute = require('./routes/produtoRoute')
var userRoute = require('./routes/userRoute')
var quadraRoute = require('./routes/quadraRoute')
var caixaRoute = require('./routes/caixaRoute')
const app = express();
var port = process.env.PORT || 3000;

app.use(session({secret:'123', resave:true, saveUninitialized:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(flash())

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static(path.join("src", "public")))

app.use('/admin/produto', produtoRoute)
app.use('/admin/user', userRoute)
// Rotas
//app.use('/admin/quadra', quadraRoute)
//app.use('/caixa', caixaRoute)

app.listen(port)