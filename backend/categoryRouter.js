let express = require("express");
let router = express.Router();
let categoryApi = require("./categoryApi");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "/home/sahyogsharma/Desktop/preety/backend/public/icons");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
console.log(storage.destination);
var upload = multer({ storage: storage });
router.post("/category", (req, res) => {
  res.send("router");
});
router.post("/upload", upload.single("files"), async function(req, res) {
  try {
    console.log("dffd");
    console.log(req.body);
    console.log(req.file.originalname);
    let data = {
      category: req.body.category,
      img: req.file.originalname
    };
    let categoryCheck=await categoryApi.checkCategoryName(data);
    if (Object.keys(categoryCheck).length !== 0) {
     
      res.send(JSON.stringify("already there"));
    }
    else{
    console.log("data in category upload router", data);
    var result = await categoryApi.addPost(data);
    console.log(
      "result of upload category in router ---------------------------" + result
    );
  }
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

router.get("/upload", async function(req, res) {
  try {
    var result = await categoryApi.getPost();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
