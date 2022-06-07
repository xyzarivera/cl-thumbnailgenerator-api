const { setupApp } = require("./app");
const config = require("../config");

console.log(config);

const app = setupApp();
const PORT = config.port;

app.listen(PORT, () => {
  console.log("API server is listening at port", PORT);
});
