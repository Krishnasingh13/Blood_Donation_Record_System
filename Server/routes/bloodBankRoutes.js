const { login, downloadPdf, getMeBloodBank, generateCertificate } = require("../controller/bloodBankController");
const router = require("express").Router();

router.post("/login", login);
router.get("/downloadCertificate/:certificateId", downloadPdf);
router.get("/generateCertificate/:donationId", generateCertificate);
router.get("/getMeBloodBank/:bloosBankId", getMeBloodBank);
module.exports = router;
