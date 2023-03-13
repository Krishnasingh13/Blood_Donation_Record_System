const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const donorRoutes = require("../Server/routes/userRoutes");
const adminRoutes = require("../Server/routes/adminRoutes");
const bloodBankRoutes = require("../Server/routes/bloodBankRoutes");

const app = express();

app.use(cors());
app.use(express.json());

//DB Config
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("Connection Failed");
    console.log(err);
    // process.exit(1)
  });

//API Routes
app.use("/api/donor", donorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bloodBank", bloodBankRoutes);


app.listen(5000, () => {
  console.log(`Server is Started ${5000}`);
});

// Pxywtd1MsMwMXczx
// mongodb+srv://krishnasingh200113:<password>@cluster0.sfkyb7z.mongodb.net/?retryWrites=true&w=majority
