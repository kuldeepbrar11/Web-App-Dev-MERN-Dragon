import React, { useState } from "react";
import axios from "axios";
import "../css/CreateCourse.css";

const handleCreateCourse = async (courseDetails) => {
  const { title, description, onCourseAdded } = courseDetails;

  try {
    const response = await axios.post("http://127.0.0.1:8080/api/courses", {
      title,
      description,
    });
    console.log("Course added:", response.data);
    onCourseAdded();
  } catch (error) {
    console.error("Error adding course:", error);
  }
};
function CreateCourse({ onCourseAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateCourse({ title, description, onCourseAdded });

    setTitle("");
    setDescription("");
  };

  return (
    <div className="create-course">
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateCourse;
