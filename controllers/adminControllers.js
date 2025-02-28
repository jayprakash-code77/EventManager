
// rendering sign up page to user
exports.newUser = (req, res) => {
    try {
        res.render("../views/protected/adminDas.ejs");
    } catch (error) {
        console.log("Error is :- " + error);
    }
}