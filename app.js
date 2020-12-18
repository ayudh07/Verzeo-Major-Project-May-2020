var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");

app.set("view engine","ejs");
app.use(express.static( __dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/user_management",{useNewUrlParser: true, useUnifiedTopology: true});

var user_schema = new mongoose.Schema({
    name: String,
    age:  Number,
    email: String,
    city: String,
    address: String,
    image: String,
    bio: String
});

var User = mongoose.model("User",user_schema);


app.get("/",function(req,res){
    res.redirect("/users")
})

app.get("/users",function(req,res){
    User.find({},function(err,user){
        if(err) {
            console.log(err);
        } else {
            res.render("index",{user: user});
        }
    })
})

app.get("/users/new",function(req,res){
    res.render("new");
})

app.post("/users",function(req,res){
    User.create(req.body.user,function(err,user){
        if(err){
            console.log(err)
        } else {
            res.redirect("/users")
        }
    })
})

app.get("/users/:id",function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log(err);
        } else {
            res.render("show",{user: user});
        }
    })
})

app.get("/users/:id/edit",function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log(err);
        } else {
            res.render("edit",{user: user})
        }
    })
})

app.put("/users/:id",function(req,res){
    User.findByIdAndUpdate(req.params.id,req.body.user,function(err,user){
        if(err){
            console.log(err)
        } else {
            res.redirect("/users/"+req.params.id);
        }
    })
})

app.delete("/users/:id",function(req,res){
    User.findByIdAndRemove(req.params.id,function(err,data){
        if(err){
            console.log(err);
        } else {
            res.redirect("/users");
        }
    })
})

var port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log("Server Started");
})
