require("dotenv").config();
const router = require("express").Router();
const multer = require("multer");
const { roleAuth, userAuth } = require("../middleware/Auth");
const { Media, Personalized } = require("../models/mediaModel");
const roles = require("../models/roles");
const User = require("../models/userModel");

// getting all users
// try{}
//     catch (err) {
//         return res.status(500).send()
//     }

const storage = multer.diskStorage({
  destination: "images",

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// upload image
router.post(
  "/upload",
  upload.single("image"),
  roleAuth,
  userAuth,
  async (req, res) => {
    const users = await User.find({ roleId: roles.user }).select([
      "-passwordHash",
      "-updatedAt",
      "-__v",
    ]);
    res.json(users)
    for (let i = 0; i < 3; i++) {
      res.json(users[i].name);
    }
  }
);

module.exports = router;
