const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mainTexts = require(`${__dirname}/main-texts.js`)
const currentDate = require(`${__dirname}/current-date.js`)

const homeStartingContent = mainTexts.homeText;
const aboutContent = mainTexts.aboutText;
const contactContent = mainTexts.contactText;
const POSTS = [];


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


// Get Request
app.get('/', (req,res) => {
    res.render('home', {homeStartingContent, POSTS});
});

app.get('/about', (req,res) => {
    res.render('about', {aboutContent});
});

app.get('/contact', (req,res) => {
    res.render('contact', {contactContent});
});

app.get('/compose', (req,res) => {
    res.render('compose');
});

app.get('/posts/:postName', (req,res) => {
    const postNameParametr = _.lowerCase(req.params.postName);

    POSTS.forEach((post) => {
        const storedTitle = _.lowerCase(post.title);
        if (postNameParametr === storedTitle) {
            const {title: postTitle, content: postContent} = post;
            res.render('post', {postTitle, postContent});
        }
    });
});

app.post('/compose', (req,res) => {
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody,
        date: currentDate.getCurrentDate()
    }
    POSTS.push(post);
    res.redirect('/');
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));














app.listen(3000, function() {
  console.log("Server started on port 3000");
});
