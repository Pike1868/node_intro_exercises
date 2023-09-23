const { readFile, existsSync, writeFile } = require("fs");
const axios = require("axios");
const argv = process.argv;

const cat = (path, callback) => {
  readFile(path, "utf8", (err, text) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    callback(text);
  });
};

const webCat = (url, callback) => {
  axios
    .get(url)
    .then((resp) => {
      console.log(resp.data);
      callback(resp.data);
    })
    .catch((err) => {
      console.error(`Error fetching ${url}: \n ${err.message}`);
      process.exit(1);
    });
};

const catWrite = (outputPath, data) => {
  writeFile(outputPath, data, "utf8", (err) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    console.log(`Output added to ${outputPath}.`);
  });
};

if (argv[2] == "--out") {
  let outputPath = argv[3];
  if (existsSync(argv[4])) {
    console.log("File path exists");
    let data = cat(argv[4], (data) => {
      catWrite(outputPath, data);
    });
  } else {
    webCat(argv[4], (data) => {
      catWrite(outputPath, data);
    });
  }
} else {
  if (existsSync(argv[2])) {
    console.log("File path exists");
    cat(argv[2], (data) => console.log(data));
  } else {
    webCat(argv[2], (data) => console.log(data));
  }
}

for (let i = 0; i < argv.length; i += 1) {
  console.log(i, argv[i]);
}