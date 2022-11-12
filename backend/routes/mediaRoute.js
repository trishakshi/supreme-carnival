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

router.get("/", async (req, res) => {
  try {
    res.json(users);
  } catch (err) {
    return res.status(500).send();
  }
});

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
    try {
      const isAdmin = await User.findById({ _id: req.user });
      const users = await User.find({ roleId: roles.user });

      //   for (let i = 0; i < users.length; i++) {
      //     console.log(i);
      //     const newPersonalized = new Personalized({
      //       userId: users[i].roleId,
      //       image: req.file.originalname,
      //     });
      //     const savedPersonalized = await newPersonalized.save();
      //     res.json(savedPersonalized);
      //   }

      if (req.role === roles.admin && isAdmin.roleId === roles.admin) {
        const newUpload = new Media({
          uploadedBy: req.user,
          title: req.body.title,
          image: req.file.originalname,
          description: req.body.description,
          hashTag: req.body.hashTag,
        });
        const savedUpload = await newUpload.save();
        // res.json(savedUpload);
      } else {
        return res.status(401).json({ err: "Unauthorized." });
      }
    } catch (err) {
      res.status(500).send();
    }
  }
);

module.exports = router;
