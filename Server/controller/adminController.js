const Admin = require("../model/adminModel");
const BloodBank = require("../model/bloodBankModel");
const Donation = require("../model/donationModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, username, password } = req.body;
    const usernameCheck = await Admin.findOne({ username });

    if (usernameCheck)
      return res.json({
        msg: "This Username is already registered",
        status: false,
      });

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      username,
      password: hashedPassword,
      role: "admin",
    });

    // handle password
    delete admin.password;

    return res.json({ status: true, admin });
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username });
    if (!user)
      return res.json({
        msg: "Incorrect Username or Password",
        status: false,
      });

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid)
      return res.json({
        msg: "Incorrect Username or Password",
        status: false,
      });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    console.log(error);
  }
};

module.exports.createBloodBank = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, username, password, place } = req.body;
    const usernameCheck = await BloodBank.findOne({ username });

    if (usernameCheck)
      return res.json({
        msg: "This Username is already registered",
        status: false,
      });

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    const bloodBank = await BloodBank.create({
      name,
      username,
      place,
      password: hashedPassword,
      role: "bloodBank",
    });

    // handle password
    delete bloodBank.password;

    return res.json({ status: true, bloodBank });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllBloodBank = async (req, res, next) => {
  try {
    const bloodBanks = await BloodBank.find()
      .populate("donation")
      .select("-password");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    async function getDonationStats() {
      const stats = [];

      for (let element of bloodBanks) {
        const Id = element._id;
        try {
          const todayCount = await Donation.countDocuments({
            bloodBankId: Id,
            date: { $gte: today },
          });

          const weekCount = await Donation.countDocuments({
            bloodBankId: Id,
            date: { $gte: oneWeekAgo, $lt: today },
          });

          const monthCount = await Donation.countDocuments({
            bloodBankId: Id,
            date: { $gte: oneMonthAgo, $lt: today },
          });

          const newStats = {
            bloodBankId: Id,
            today: todayCount,
            week: weekCount,
            month: monthCount,
          };
          stats.push(newStats);

          // Update bloodBank document with new stats object
          await BloodBank.findByIdAndUpdate(Id, { $set: { stats: newStats } });
          BloodBank.save();
        } catch (err) {
          console.error(err);
        }
      }

      return stats;
    }

    getDonationStats()
      .then((stats) => {
        return res.json({ status: true, bloodBanks });
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getStats = async (req, res, next) => {
  try {
    const { bloodBankId } = req.params;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayStats = await Donation.aggregate([
      {
        $match: {
          bloodBankId: bloodBankId,
          date: { $gte: today },
        },
      },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);

    // console.log(todayStats);
  } catch (error) {
    console.log(error);
  }
};
