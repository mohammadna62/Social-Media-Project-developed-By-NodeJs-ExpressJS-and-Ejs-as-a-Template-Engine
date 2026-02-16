process.noDeprecation = true;

// یا فقط برای DEP0044
process.on('warning', (warning) => {
  if (warning.code === 'DEP0044') return;
  console.warn(warning.name, warning.message);
});
const app = require("./app");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");

//! Load ENV
const productionMode = process.env.NODE_ENV === "production";
if (!productionMode) {
  dotenv.config();
}
//! Database Connection
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDb Connected Successfully : ${mongoose.connection.host}  `);
    
  } catch (err) {
    console.error(`Error in Datebase Connection -->  ${err}`);
    process.exit(1); //* this code cuase the poroject has stopped
  }
}

function startServer() {
  const port = +process.env.PORT;
  app.listen(port, () => {
    console.log(
      `Server Runnig in ${productionMode ? "production" : "development"} on Port ${port}`,
    );
  });
}

async function run() {
  startServer();
  await connectToDB();
}

//! notie : nodemon package run directly server.js from packahe.Json and "main": "./src/server.js" in package.json,

run();
