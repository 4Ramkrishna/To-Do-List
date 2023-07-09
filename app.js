const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let item = ["Go to temple","Do DSA","Web Dev"];
let work = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",(req,res) => {
    let options = { weekday: "long", day:"numeric",month: "long"};
    let today = new Date();
    let day = today.toLocaleDateString("en-US",options);
    res.render("list",{ListTitle:day,anotherItem:item});
});

app.post("/",(req,res) => {
    if(req.body.list == "Work"){
        work.push(req.body.newItem);
        res.redirect("/work");
    }
    else{
        item.push(req.body.newItem);
        res.redirect("/");
    }
});

app.get("/work",(req,res) => {
    res.render("list",{ListTitle:"Work",anotherItem:work});
});

app.listen(3000,() => {
    console.log("Server is running at port 3000");
});