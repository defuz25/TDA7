const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

let html = fs.readFileSync('public/c.html', 'utf8');
// app.get("/", function(req, res) {
//   res.send('ok3');
// });
app.get("/", function(req, res) {
  res.sendFile('/public/c.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
