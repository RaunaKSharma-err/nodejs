const URL = require("../models/user");
const { generate } = require("randomstring");

async function HandleGetAllUser(req, res) {
  const Body = req.body;
  if (Body?.url === undefined)
    return res.status(404).json({ err: "url required" });
  const shortUrl = generate(8);
  console.log(Body.url);
  await URL.create({
    shortURL: shortUrl,
    reDirectUrl: Body.url,
    visitHistory: [],
  });
  return res.json({ url: shortUrl });
}
module.exports = { HandleGetAllUser };
