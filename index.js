require('dotenv').config({path:'./config/app.env'})
require('colors');
require('express-async-errors');
const {engine} = require('express-handlebars')
const session = require('cookie-session')
const flash = require('connect-flash')
const express = require('express');

const app = express();

// Configuration 
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';
const MODE = process.env.MODE || 'production';

// Configure Hbs 
app.engine('hbs', engine({extname:'.hbs'}))
app.set('view engine', 'hbs');

// Connect to DB
require('./config/db')();

// Middlewares
// Logger middleware
app.use(require('./middlewares/logger')())
// Parse form data 
app.use(express.urlencoded({extended:false}));
// Session
app.use(session({secret: process.env.SECRET}))
app.use(flash())

// Static files 
app.use('/css', express.static('./public/css'))
app.use('/js', express.static('./public/js'))
app.use('/img', express.static('./public/images'))


app.use((req, res, next)=>{
    res.locals.errorMessage = req.flash('error');
    res.locals.successMessage = req.flash('success');
    res.locals.seller = req.session?.user?.role==='seller';
    res.locals.admin = req.session?.user?.role==='admin';
    res.locals.super =  req.session?.user?.role==='admin' || req.session?.user?.role==='seller';
    res.locals.user = req.session?.user || null;
 

    next()
})

app.use(require('./routes'))


// Error Handler


// Run server 
const server = app.listen(PORT, console.log(`Server running on ${MODE} mode at http://${HOST}:${PORT}`.blue))

process.on('unhandledRejection', (error, promise)=>{
    console.log(`Error: ${error.message}`.red)
    server.close(()=>{
        console.log(`Server Stoped`.red.underline)
        process.exit(1)
    })
})