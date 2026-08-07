import dotenv from "dotenv/config";
import app from "./app.js";
import connectDB from "./db/DBConnection.js";

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on PORT http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error", err);
  });
