const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

// Get The Schema From Database
const userdata = require("./Models/User");
const Postdata = require("./Models/post");
const ContactRouter = require("./Routes/Contact");
const userRouter = require("./Routes/User");
const cors = require("cors");

//Monodb Connetcion
const CONNECTUION_UTL =
  "mongodb+srv://armaankhan:armaan242@cluster0.ygbfntv.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(CONNECTUION_UTL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3001, () => console.log("server is running on 3001"));
  })
  .catch((e) => {
    console.log(e.message);
  });
app.use(express.json());
app.use(cors());

//Routing
app.use("/signup", userRouter);
app.use("/contact", ContactRouter);

app.get("/", (req, res) => {
  res.send("armaaan");
});

app.get("/s", async (req, res) => {
  try {
    const data = await userdata.find();
    console.log(data);
    res.json(data);
  } catch (e) {
    res.status(404).json(e.message);
  }
});
//Get The Data From Database
app.get("/post", async (req, res) => {
  const data = await Postdata.find();
  res.json(data);
});
app.post("/post", (req, res) => {
  const mtdata = new Postdata(req.body);
  console.log("this is req.body" + req.body);
  mtdata.save();
});

//Post Data To Database
app.post("/s", (req, res) => {
  var myData = new userdata(req.body);
  myData
    .save()
    .then((item) => {
      res.send("item saved to database");
      console.log(item);
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

app.listen(3000, () => {
  console.log("This is Port 3000");
  console.log(userdata.name);
});

// res.sendFile(path.join(__dirname, "./Pages/index.html"));
