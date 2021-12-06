const https = require("http");
const key = "Your key";
const url =
  "http://api.weatherstack.com/current?access_key=" +
  key +
  "&query=19.876165,%2075.343315";

const request = https.request(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log("An error", error);
});

request.end();
