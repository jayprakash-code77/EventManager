const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/index");
const dotenv = require('dotenv');
const User = require("./models/user");
const authMiddleware = require("./middleware/authMiddleware");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
dotenv.config({ path: './config.env' });


// middlewares
app.use(express.json()); // Allows JSON body parsing
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from the "public" folder




//public Routes available to everyone 
app.get("/", (req, res) => res.render("home.ejs"));
app.get("/features", (req, res) => res.render("public/features.ejs"));
app.get("/about", (req, res) => res.render("public/about.ejs"));
app.get("/events", (req, res) => res.render("public/events.ejs"));
app.get("/contact", (req, res) => res.render("public/contact.ejs"));

// signup/login page render
app.get("/signup", (req, res) => {
    res.render("auth/signup.ejs");
});

// 
app.post("/signup", async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData);
        const data = {
            fname: req.body.dob,
            lname: req.body.lname,
            gender: req.body.gender,
            dob:req.body.role,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        }
        await User.insertOne(data);
        res.redirect("/signin")

    } catch (error) {
        console.log("Error in sign up!!");
    }
})

// signup/login page render
app.get("/signin", (req, res) => {
    res.render("auth/signup.ejs");
});

app.post("/auth", async (req, res) => {
    try {
        const { email } = req.body;
        console.log(req.body);

        // Fetch the user document
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            console.log("User not found!");
            return res.status(404).json({ message: "User not found" });
        }

        // Check user role and redirect accordingly
        if (user.role === "student") {
            console.log("Student login successful!!!");
            return res.redirect("/api/student");
        } else if (user.role === "admin") {
            console.log("Admin login successful!!!");
            return res.redirect("/api/admin")
        }else if(user.role === "faculty"){
            console.log("Faculty login successful!!!");
            return res.redirect("/api/faculty");
        }

        // If role is neither student nor admin
        return res.status(403).json({ message: "Unauthorized role" });

    } catch (error) {
        console.error("ERROR: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// this are the protected routes : Student, Faculty and Admin
app.use("/api", routes);


module.exports = app;