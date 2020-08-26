const router = require('express').Router();
const jwt = require('jsonwebtoken');



router.post("/th15_15_4_53r3t_r0ut3", async(req, res) => {
    const authorizationHeader = req.headers.authorization || (req.cookies && req.cookies.authtoken && `Bearer ${req.cookies.authtoken}`);
    let result;
    console.log(req.cookies, authorizationHeader);

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]; // Bearer <token>
      const options = {
        expiresIn: '2000',
        issuer: "Delta_Onsites"
      };
      const JWT_SECRET= "474d5098fc404162778cb1bac110ae29";
      try {
        result = jwt.verify(token, JWT_SECRET, options);
        req.user = result.user;
        res.status(200).json({success: true, msg: "Well Done!", flag: "dctf{D3v1l_0f_my_w0rd}"});
      } catch (err) {
        console.log(err);
        res.status(200).json({success: false, msg: "Invalid Token, Verification failed."});
      }
    } else {
      res.status(200).json({success: false, msg: "Authentication Token Required."});
    }
});

router.post("/login",  async (req, res, next) => {
    try{
        const username = req.body.username;
        const password = req.body.password;
        console.log(username, password);
        if(username === "whitehack" && password === "wI1hE25tAhKc596"){
            var user = {
                userID: "556",
                username: "whitehack",
                auth: "native"
            };
            let payload = {user: user};
            let secret = "474d5098fc404162778cb1bac110ae29";
            let options = {
                           expiresIn: '2000', 
                          //  expiresIn: "1d",
                           issuer: "Delta_Onsites"
                          };
            var token = jwt.sign(payload, secret, options);
            res.status(200).json({success: true, msg: "Credentials Found", jwttoken: token});
        }  
        else{
            setTimeout(function() {
                res.status(200).json({success: false, msg: "Invalid credentials"});
            }, 10000);
            
        }
    }
    catch(err){
        res.status(200).json({success: false, msg: err});
    }
});

router.get("/verify",  async (req, res, next) => {
  const authorizationHeader = req.headers.authorization || (req.cookies && req.cookies.authtoken && `Bearer ${req.cookies.authtoken}`);
  let result;
  console.log(req.cookies, authorizationHeader);

  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1]; // Bearer <token>
    const options = {
      expiresIn: '2000',
      // expiresIn: "1d",
      issuer: "Delta_Onsites"
    };
    const JWT_SECRET= "474d5098fc404162778cb1bac110ae29";
    try {
      result = jwt.verify(token, JWT_SECRET, options);
      req.user = result.user;
      res.status(200).json({success: true, msg: "Welcome Back!"});
    } catch (err) {
      console.log(err);
      res.status(200).json({success: false, msg: "Invalid Token, Verification failed."});
    }
  } else {
    res.status(200).json({success: false, msg: "Authentication Token Required."});
  }
});


router.get("/",  async (req, res, next) => {
    try{
        res.status(200).json({success: true, msg: "API alive!"});
    }
    catch(err){
        res.status(200).json({success: false, msg: err});
    }
});

module.exports = router;