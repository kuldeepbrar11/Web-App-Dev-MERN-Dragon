const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const courseController = require("./controllers/courseController");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://techcoder:B3GhOcvRqzvyxZl1@cluster0.ilzm4qh.mongodb.net/lms?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(`Connected to MongoDB: ${mongoose.connection.db.databaseName}`);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to lms backend" });
});

app.get("/api/courses", courseController.getAllCourses);
app.get("/api/courses/:id", courseController.getCourseById);
app.post("/api/courses", courseController.addCourse);
app.put("/api/courses/:id", courseController.updateCourse);
app.delete("/api/courses/:id", courseController.removeCourse);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
