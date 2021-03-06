let express = require("express");
let router = express.Router();
let userApi = require("./api");
router.post("/", (req, res) => {
  res.send("router");
});
let data;
router.post("/register", async (req, res) => {
  try {
    console.log(req.body)
    data = req.body;
    let check = await userApi.checkUsername(data);
    console.log(check)
    if (Object.keys(check).length !== 0) {
     
      res.send(JSON.stringify("already there"));
    }else {
      let dataInserted = await userApi.createNewUser(data);

      var mailOptions = {
        from: "Preety",
        to: req.body.email,
        subject: "Sending Email using Node.js",
        text: "Verify",
        html:
          '<a href="http://localhost:2007/verify/' +
          dataInserted.username +
          '">Click here to verify  </a>'
      };
      await userApi.send_mail(mailOptions);
      res.send(dataInserted)
    }
  } catch (err) {
    console.log(err);
    res.send(JSON.stringify("some error"));
  }
});
router.get("/verify/:username", async (req, res) => {
  try {
    var data = {
      username: req.params.username
    };
    let dataVerified = await userApi.verifyNewUser(data);
    console.log(dataVerified);
    res.redirect("http://localhost:3000/login");
  } catch (err) {
    console.log(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    let data = req.body;
    let loginData = await userApi.loginUser(data);
    console.log(loginData);
    res.send(loginData);
  } catch (err) {
    res.send(err);
  }
});

router.post("/login/password", async (req, res) => {
  try {
    let data = req.body;
    let loginData = await userApi.loginUserPassword(data);
    console.log(loginData);

    res.send(loginData);
  } catch (err) {
    res.send(err);
  }
});

router.post("/login/verify", async (req, res) => {
  try {
    let data = req.body;
    let loginData = await userApi.loginUserVerification(data);
    console.log(loginData);

    res.send(loginData);
  } catch (err) {
    res.send(err);
  }
});
router.post("/forget", async (req, res) => {
  try {
    var result = await userApi.forgetPassword(req.body);
    var exist;
    if (Object.keys(result).length === 0) {
      exist = false;
    } else {
      exist = true;
    }
    console.log(exist);
    res.send(exist);
    // res.redirect('/home/sahyogsharma/Desktop/preety/frontend/src/login.js');
  } catch (err) {
    console.log(err);
  }
});

router.post("/reset", async (req, res) => {
  try {
    let data = req.body;
    updatedData = await userApi.updatePassword(data);
    console.log(updatedData);
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
// let dataInserted = await userApi.createNewUser(data);
// console.log(dataInserted);
// } catch (err) {
// res.send(err);
// }
