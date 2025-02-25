exports.newUser = (req, res) => {
    try {
        // res.render("signup.ejs");
        res.send("I am working!!!");
    } catch (error) {
        console.log("Error in signing up!!!");
    }
}



// // rendering sign up page to user
// exports.newUser = (req, res) => {
//     try {
//         res.render("../views/usersViews/signup.ejs");
//     } catch (error) {
//         console.log("Error is :- " + error);
//     }
// }
