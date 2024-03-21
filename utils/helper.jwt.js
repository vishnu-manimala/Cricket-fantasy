const jwt = require('jsonwebtoken');
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const tokenGenerator = async(data)=>{
    
    return jwt.sign({userId:data},PRIVATE_KEY,{expiresIn:'1d'});

}

const  refreshTokenGenerator = async(data)=>{
    return jwt.sign({ userId:data }, PRIVATE_KEY, { expiresIn: '30d' });
}



module.exports = {
    tokenGenerator,
    refreshTokenGenerator
}