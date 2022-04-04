const express = require("express");
const fs = require("fs");

let navData = [];
let imgArr = [];

const port = 9000;
const app = express();

app.set('view engine', 'ejs')
app.listen(port, console.log("server listen on port:", port));

fs.readFile("./nav.json", 'utf8', (err, data) => {
    if (err) {
        console.log("Error in readFile nav.json");
        return
    }
    else {
        navData = JSON.parse(data);
    }
})

fs.readFile("./gallery.json", (err, data) => {
    if (err) {
        console.log("Error in readFile gallery.json");
        return
    }
    else {
        imgArr = JSON.parse(data);
    }
})

app.use((req, _, next) => {
    console.log("new request", req.method, req.url);
    next();
})

app.use(express.static("public"))

app.get("/", (req, res) => {

    res.render("pages/home", {
        navBarItems: navData,
        title: "Home"
    })
})

app.get("/team", (req, res) => {
    res.render("pages/team", {
        navBarItems: navData,
        title: "Team"
    })
})

app.get("/about", (req, res) => {
    res.render("pages/about", {
        navBarItems: navData,
        title: "About"
    })
})

app.get("/contact", (req, res) => {
    res.render("pages/contact", {
        navBarItems: navData,
        title: "Contact"
    })
})

app.get("/gallery", (req, res) => {
    res.render("pages/gallery", {
        navBarItems: navData,
        galleryItems: imgArr,
        title: "Gallery"
    })
})

app.use((_, res) => {
    res.status(404).render("pages/404", {
        navBarItems: navData,
        title: "404 - Error"
    })
})