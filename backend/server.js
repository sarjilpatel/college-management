const app = require("./app");
const { connectDatabase } = require("./config/database");

connectDatabase();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app start on port : ${PORT}`);
});
