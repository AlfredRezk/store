const morgan = require("morgan");
const fs = require("fs");

module.exports = () => {
  const MODE = process.env.MODE || "production";

  if (MODE === "development") return morgan("dev");
  else {
    const [date, time] = new Date().toISOString().split("T");
    return morgan("combined", {
      stream: fs.createWriteStream(`./logs/${date}.log`, { flags: "a+" }),
    });
  }
};
