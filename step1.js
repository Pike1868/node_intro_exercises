const { readFile } = require("fs");
const argv = process.argv;

// for (let i = 0; i < argv.length; i += 1) {
//   console.log(i, argv[i]);
// }

const cat = (path) => {
  readFile(path, "utf8", (err, text) => {
    if (err) throw err;
    console.log("\n", text);
  });
};

cat(argv[2]);
