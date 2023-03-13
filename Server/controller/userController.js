const User = require("../model/donorModel");
const BloodBank = require("../model/bloodBankModel");
const Donation = require("../model/donationModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, phone, aadhaarNumber, password } = req.body;
    const aadhaarNumberCheck = await User.findOne({ aadhaarNumber });

    if (aadhaarNumberCheck)
      return res.json({
        msg: "This Aadhaar number is already registered",
        status: false,
      });

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      aadhaarNumber,
      password: hashedPassword,
      role: "donor",
    });

    // handle password
    delete user.password;

    return res.json({ status: true, user });
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user)
      return res.json({
        msg: "Incorrect Mobile or Password",
        status: false,
      });

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid)
      return res.json({
        msg: "Incorrect Mobile or Password",
        status: false,
      });
    delete user.password;

    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.getMeDonor = async (req, res, next) => {
  try {
    const { donorId } = req.params;
    const donor = await User.findOne({ donorId })
      .populate("donation")
      .select("-password");

    return res.json({ status: true, donor });
  } catch (error) {
    console.log(error);
  }
};

module.exports.donateBlood = async (req, res, next) => {
  try {
    const { donorId, bloodBankId } = req.params;
    const donor = await User.findOne({ _id: donorId });
    const bloodBank = await BloodBank.findOne({ _id: bloodBankId });

    const bloodDonation = await Donation.create({
      donor,
      bloodBank,
      bloodBankId
    });

    donor.donation.push(bloodDonation);
    donor.save();

    bloodBank.donation.push(bloodDonation);
    bloodBank.save();

    console.log(bloodDonation);

    return res.json({ status: true, bloodDonation });
  } catch (error) {
    console.log(error);
  }
};
