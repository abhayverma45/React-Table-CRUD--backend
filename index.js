const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const dotenv = require("dotenv");
// const Databaseconnection = require("./connector/db");
const userModel = require("./models/details");

const DB =
  "mongodb+srv://abhay:abhay356@cluster0.7az8zhf.mongodb.net/?retryWrites=true&w=majority";
// mongo atlas connection
mongoose.set("strictQuery", false);
mongoose
  .connect(DB)
  .then(() => {
    console.log(`successfully connected`);
  })
  .catch((err) => console.log(`no connection`));

app.post("/api/formdata", async (req, res) => {
  try {
    const { Name, Phone, Email, Hob } = req.body;
    const front = new userModel({
      Name,
      Phone,
      Email,
      Hob,
    });
    await front.save();
    res.json({ success: true });
  } catch (error) {
    console.log(error);

    return res.status(404).json({ success: false, error: error.message });
  }
});

// GET API

app.get("/api/form", async (req, res) => {
  try {
    const data = await userModel.find();
    res.json({ data: data, success: true });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, error: error.message });
  }
});

//   update api
app.put("/api/update", async (req, res) => {
  try {
    const { Name, Phone, Email, Hob, id } = req.body;
    console.log(id);
    const Data = await userModel.findOneAndUpdate(
      { _id: id },
      { Name, Phone, Email, Hob },
      { new: true }
    );
    res.json({ data: Data, success: true });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, error: error.message });
  }
});

// delete api

app.delete("/api/delete/:id", async (req, res) => {
  try {
    const data = await userModel.findOneAndDelete({
      _id: req.params.id,
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false });
  }
});
const port = process.env.PORT || 6000;
    if (process.env.NODE_ENV === "production") {
      app.use(express.static("client/build"));
      app.get("*", (req, res) => {
        res.sendFile(
          path.resolve(__dirname + "/Client/build/index.html"),
          function (err) {
            if (err) {
              console.log(err);
            }
          }
        );
      });
    }
// Databaseconnection();
app.listen(port, () => {
  console.log("SERVER IS RUNNING AT 6000");
});
