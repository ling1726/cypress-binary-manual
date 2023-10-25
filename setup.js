const execSync = require("child_process").execSync;
const http = require("https");
const fs = require("fs");

if (fs.existsSync('Cypress')) {
  console.log('Cypress binary already exists...');
  return;
}

const url = "https://cdn.cypress.io/desktop/5.4.0/linux-x64/cypress.zip";
const file = fs.createWriteStream("cypress.zip");
console.log('Downloading cypress binary');
const request = http.get(url, function (response) {
  response.pipe(file);

  // after download completed close filestream
  file.on("finish", () => {
    file.close();
    console.log("Download Completed, unzipping...");
    execSync("unzip cypress.zip", { stdio: "inherit" });
  });
});

