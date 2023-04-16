const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
func();

app.get("/", (req, res) => res.type('html').send(html));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


async function func() {
	let html = await fs.promises.readFile('public/c.html', 'utf8');
  console.log(html)
}
