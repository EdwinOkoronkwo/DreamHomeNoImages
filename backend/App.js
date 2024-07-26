const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const db = require("./db");
const StaffRouter = require("./routes/staffRouter");
const BranchRouter = require("./routes/branchRouter");
const cors = require("cors");

const upload = multer({ dest: "uploads/" });

class App {
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  initializeMiddlewares() {
    this.app.use(
      cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(
      "/uploads",
      express.static(path.join(__dirname, "public/uploads"))
    );
  }

  initializeRoutes() {
    this.app.use("/api/staffs", StaffRouter);
    this.app.use("/api/branches", BranchRouter);
  }

  initializeErrorHandling() {
    this.app.use((err, req, res, next) => {
      console.error(err.stack);
      res
        .status(err.status || 500)
        .json({ message: err.message || "An unexpected error occurred." });
    });
  }

  async startServer(port) {
    try {
      await db.connect();
      console.log("Connected to database");

      const PORT = port || process.env.PORT || 8000;
      this.app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
      });
    } catch (err) {
      console.error("Error connecting to database:", err);
    }
  }
}

module.exports = App;
