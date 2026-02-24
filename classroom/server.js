const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
app.set("view engine", "ejs");
app.set("views" , path.join(__dirname, "views"));
const sessionOptions = {
    secret: "mysupersecretstring", 
    resave: false, 
    saveUninitialized: true
};

// const cookieParser = require("cookie-parser");

//cookies

// app.use(cookieParser("secretCode"));

// app.get("/getsignedcookie", (req, res) => {
//     res.cookie("made-in", "India", {signed: true});
//     res.send("signed cookie sent");
// });

// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies);
//     res.send("verified");
// })

// app.get("/getcookies", (req, res) => {
//     res.cookie("greet", "hello");
//     res.send("sent you some cookies");
// });

// app.get("/greet", (req, res) => {
//     let {name = "anonymous"} = req.cookies;
//     res.send(`Hi, ${name}`);
// })
// app.get("/", (req, res) => {
//     console.dir(req.cookies);
//     res.send("Hi, I am root!");
// });

//express session

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
   res.locals.successMsg = req.flash("success");
   res.locals.errorMsg = req.flash("error");
   next();
});

// app.get("/reqcount", (req, res) => {
//     if(req.session.count) {
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }
//     res.send(`you sent a request ${req.session.count} times`);
// })
// app.get("/test", (req, res) => {
//     res.send("test successful");
// });

app.get("/register", (req, res) => {
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    if(name === "anonymous") {
    req.flash("success", "user not registered!");
    } else {
        req.flash("error", "user registered successfully!");
    }

   
    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    // res.send(`hello ${req.session.name}`);
    res.render("page.ejs", {name: req.session.name});
});

app.listen(3000, () => {
    console.log("server is listening to 3000");
})
