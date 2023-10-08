const { SignUp, Login } = require("../Controlers/Representative");
const cloudinary = require("../Controlers/cloud");
const uploader = require("../Controlers/multer");
const express = require("express");
const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const RepresentativeData = req.body;
//     const Representative = await SignUp(RepresentativeData);
//     res.status(200).json(Representative);
//   } catch (err) {
//     res.status(401).json(err.message);
//   }
// });
router.post('/', uploader.single("Image"), async (req, res) => {
  // console.log(req.file);
  try {
    const image = await cloudinary.uploader.upload(req.file.path);
    const AdminData = req.body
    AdminData.Image = image.secure_url
    console.log(AdminData)
    const Admin = await SignUp(AdminData)
    res.status(200).json(Admin)

  } catch (err) {
    res.status(401).json(err.message)
  }

})
router.post("/Login", async (req, res, next) => {
  try {
    const StoredRepresentative = await Login(req.body);
    res.status(200).json(StoredRepresentative);
  } catch (err) {
    res.status(401).json(err.message);
  }
});

module.exports = router;
