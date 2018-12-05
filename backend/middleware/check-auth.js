const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        token = req.headers.authorization.split(" ")[1];
    
        const decodedOwner = jwt.verify(token, process.env.JWT_KEY);
        req.OwnerDetails = {companyEmail: decodedOwner.companyEmail, _id: decodedOwner._id, role: decodedOwner.role}
  
        next();
    }
    catch(error) {
        res.status(401).json({
            message: "Authentication Failed"
        })
    }
}