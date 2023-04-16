const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const fs = require('fs')

let html = fs.readFileSync('public/c.html', 'utf8');
app.get("/", function(req, res) {
  res.send('ok');
});
app.get("/public/", function(req, res) {
  res.sendFile(__dirname + '/c.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
