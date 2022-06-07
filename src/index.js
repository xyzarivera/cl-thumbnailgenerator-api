const app = require("./app");
const config = require("./config");

const PORT = config.port;

app.listen(PORT, () => {
  console.log("API server is listening at port", PORT);
});
