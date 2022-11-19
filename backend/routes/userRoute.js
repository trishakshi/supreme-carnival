const router = require("express").Router();
const { User, Role } = require("../models/userModel");

// try{

// }
// catch(err){
//   return res.status(500).send()
// }

router.post("/register", async (req, res) => {
  try {
    const role = await Role.findOne({ slug: req.body.memberType });

    if (!role)
      return res
        .status(400)
        .json({ err: "User with this role does not exists." });

    const account = await User.find({ phoneNumber: req.body.phoneNumber });
    if (account && account.role[0].slug === role.slug)
      return res.status(400).json({ err: "Account already exists." });

    const newUser = await User(req.body);
    newUser.role = role;

    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (err) {
    return res.status(500).send();
  }
});

module.exports = router;
