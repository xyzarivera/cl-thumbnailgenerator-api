const { setupApp } = require("./app");

const app = setupApp();
const PORT = 8000;

app.listen(PORT, () => {
  console.log("API server is listening at port", PORT);
});
