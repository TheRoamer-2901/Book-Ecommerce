import jwt, {Secret} from 'jsonwebtoken'

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']    
    
    const token = authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, (err, user) => {
      if(err) res.sendStatus(403)
      else { 
        delete user.iat;
        delete user.exp;  
        req.user = user
        console.log("user at auth: ", user)
        next()
      }
    })
}
