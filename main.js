const express = require("express");

const urlRoute = require("./routes/user");
const { connectMongoDB } = require("./connections");
const URL = require("./models/user");

const App = express();
const PORT = 2000;

App.use(express.urlencoded({ extended: false }));

App.use(express.json());

connectMongoDB("mongodb://127.0.0.1:27017/shortUrl").then(() =>
  console.log("MongoDB connected")
);

App.use("/url", urlRoute);

App.get("/:shortId", async (req, res) => {
  const shortid = req.params.shortId;
  const entry = await URL.findOneAndUpdate({shortid}, {
    $push: { visitHistory: { timestamp: Date.now() } },
  });
  if (entry === null) return res.json({ msg: `entry is null ${entry}` });
  res.redirect(entry.reDirectUrl);
});

App.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
