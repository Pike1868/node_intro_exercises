const { readFile, existsSync } = require("fs");
const axios = require("axios");
const argv = process.argv;

const cat = (path) => {
  readFile(path, "utf8", (err, text) => {
    if (err) throw err;
    console.log("\n", text);
  });
};

const webCat = (url) => {
  axios
    .get(url)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((err) => {
      console.error(`Error fetching ${url}: \n ${err.message}`);
      process.exit(1);
    });
};

if (existsSync(argv[2])) {
  console.log("File path exists");
  cat(argv[2]);
} else {
  webCat(argv[2]);
}
