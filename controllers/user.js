const URL = require("../models/user");
const { generate } = require("randomstring");

async function HandleGetAllUser(req, res) {
  const body = req.body;
  if (body.url === undefined)
    return res.status(404).json({ err: "url required" });
  const shortUrl = generate(8);
  await URL.create({
    shortURL: shortUrl,
    reDirectUrl: body.url,
    visitHistory: [],
  });
  return res.json({ url: shortUrl });
}

async function handleGetAnalytics(req, res) {
  const shortURL = req.params.shortId;
  const result = await URL.findOne({ shortURL });
  res.json({
    totalClicks: result.visitHistory.length,
    Analytics: result.visitHistory,
  });
}

module.exports = { HandleGetAllUser, handleGetAnalytics };
