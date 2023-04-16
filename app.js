const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

app.use(express.static(__dirname + '/tda7'))


// app.get("/", function(req, res) {
//   res.send('ok3');
// });
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/tda7/index.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
