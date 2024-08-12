const express = require("express");
const path = require("path");
const urlRoute = require("./routes/user");
const { connectMongoDB } = require("./connections");
const URL = require("./models/user");

const app = express();
const PORT = 2000;

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

connectMongoDB("mongodb://127.0.0.1:27017/shortUrl").then(() =>
  console.log("MongoDB connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  return res.render("home");
});

app.use("/url", urlRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortURL = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortURL },
    {
      $push: { visitHistory: { timestamp: Date.now() } },
    }
  );
  if (entry === null) return res.json({ msg: `entry is null ${entry}` });
  res.redirect(entry.reDirectUrl);
});

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
