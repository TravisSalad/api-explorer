const path = require("path");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("dist"));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

const server = module.exports = app.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});

server.isRunning = true;