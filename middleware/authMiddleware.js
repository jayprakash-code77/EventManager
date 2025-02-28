const jwt = require('jsonwebtoken');

const middleware = (req, res, next ) => {
    try{
        // taking the token from header
        const token = req.headers.authorization.split(' ')[1];
        // verifying the token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // this will return object = {userId: user._id}
        // add "userId" property to on the 'req' (request) body
        req.body.userId = decodedToken.userID;

        // call the next method to forward the request to the next route or middleware.
        next();
    }catch (error) {
        res.send({
            message:error.message,
            success:false
        });
    }
}

module.exports = middleware;