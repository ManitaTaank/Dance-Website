const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance')
const port = 80;

// define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    adress: String,
    desc: String
});
const contact = mongoose.model('contact', contactSchema);

// Express related stuff
app.use('/static', express.static('static'))// for using static files
app.use(express.urlencoded({extended:true}))

// PUG related stuff
app.set('view engine', 'pug')// set the template engine ASpug
app.set('views', path.join(__dirname,'./views'))// set the views directory

// ENDPOINTS
app.get('/', (req, res) => {

    const params = {}
    res.status(200).render('home.pug', params)
});
app.get('/contact', (req, res) => {

    const params = {}
    res.status(200).render('contact.pug', params)
});

app.post('/contact',async(req, res)=>{
    console.log(req.body);
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database ")
    }).catch(() => {
        res.status(400).send("item was not saved to the database")
    });
    // const params = {}
    // res.status(200).render('contact.pug', params)
});
// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});