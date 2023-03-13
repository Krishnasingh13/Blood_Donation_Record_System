const BloodBank = require("../model/bloodBankModel");
const Donation = require("../model/donationModel");
const PDF = require("../model/certificateModel");
const bcrypt = require("bcrypt");
const PDFDocument = require("pdfkit");
const fs = require("fs");
// const pdfMaster = require("pdf-master");

module.exports.login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const bloodBank = await BloodBank.findOne({ username });
    if (!bloodBank)
      return res.json({
        msg: "Incorrect Username or Password",
        status: false,
      });

    const passwordIsValid = await bcrypt.compare(password, bloodBank.password);
    if (!passwordIsValid)
      return res.json({
        msg: "Incorrect Username or Password",
        status: false,
      });
    delete bloodBank.password;
    return res.json({ status: true, bloodBank });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getMeBloodBank = async (req, res, next) => {
  try {
    const { bloodBankId } = req.params;
    const bloodBank = await BloodBank.findOne({ bloodBankId }).populate(
      "donation"
    );

    // console.log("Donation", donation);
    console.log(bloodBank);

    return res.json({ status: true, bloodBank });
  } catch (error) {
    console.log(error);
  }
};

module.exports.generateCertificate = async (req, res, next) => {
  try {
    const { donationId } = req.params;
    const donation = await Donation.findById(donationId);
    console.log(donation);

    const doc = new PDFDocument();
    const name = "certificate.pdf";

    // Generate PDF content
    // doc.fontSize(20).text("Hello, Krishna");
    doc.info.Title = "Blood Donation Certificate";

    // Set the document fonts
    doc.registerFont("Helvetica", "Helvetica.ttf");

    // Set the document information
    doc.info.Title = "Blood Donation Certificate";

    // Set the document size and margins
    doc.page.width = 612;
    doc.page.height = 792;
    doc.page.margins = { top: 72, bottom: 72, left: 72, right: 72 };

    // Add the certificate content
    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .text("Blood Donation Certificate", { align: "center" });
    doc.moveDown();
    doc
      .fontSize(14)
      .font("Helvetica")
      .text(
        `This is to certify that Mr/Mrs ${
          donation.donor.name
        } has generously donated blood on ${new Date(donation.date).toDateString()} ${new Date(
          donation.date
        ).toLocaleTimeString()}.`,
        { align: "justify" }
      );
    doc.moveDown();
    doc
      .fontSize(14)
      .font("Helvetica")
      .text(
        `The blood donation was made at ${donation.bloodBank.name} blood bank at ${donation.bloodBank.place}.`,
        {
          align: "justify",
        }
      );
    doc.moveDown(2);
    doc
      .fontSize(12)
      .font("Helvetica")
      .text(
        "This certificate is awarded to the donor as a recognition of the noble act of blood donation.",
        { align: "justify" }
      );
    doc.moveDown();
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .text("Thank you for your support.", { align: "right" });

    const chunks = [];
    doc.on("data", (chunk) => {
      chunks.push(chunk);
    });

    doc.on("end", () => {
      const data = Buffer.concat(chunks).toString("base64");
      const pdf = new PDF({ certificateName: name, data });
      pdf.save();

      donation.certificateGenerated = true;
      donation.certificate = pdf;
      donation.save();

      return res.json({ status: true, pdf });
    });
    doc.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports.downloadPdf = async (req, res, next) => {
  const { certificateId } = req.params;

  const pdf = await PDF.findById(certificateId);

  const base64DataWithoutHeader = pdf.data.replace(
    /^data:application\/pdf;base64,/,
    ""
  );

  // Convert base64 string to buffer
  const bufferData = Buffer.from(base64DataWithoutHeader, "base64");

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", "attachment; filename=example.pdf");

  return res.send(bufferData);
};
