import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/CourseList.css";

function CourseList({ refresh, onEdit, onDelete }) {
  const [courses, setCourses] = useState([]);
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCourses();
  }, [refresh]);

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://127.0.0.1:8080/api/courses/${courseId}`);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
      console.log("Course deleted successfully.");
    } catch (error) {
      console.error("Error deleting course: ", error);
    }
  };

  const handleEditClick = (courseId) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [courseId]: true,
    }));
  };

  const handleSaveClick = async (courseId) => {
    const editedCourse = courses.find((course) => course._id === courseId);
    try {
      await axios.put(
        `http://127.0.0.1:8080/api/courses/${courseId}`,
        editedCourse
      );

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId ? editedCourse : course
        )
      );

      setEditMode((prevEditMode) => ({
        ...prevEditMode,
        [courseId]: false,
      }));

      console.log("Course updated successfully.");
    } catch (error) {
      console.error("Error updating course: ", error);
    }
  };

  const handleInputChange = (courseId, field, value) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === courseId ? { ...course, [field]: value } : course
      )
    );
  };

  return (
    <div className="course-card">
      {courses.map((course) => (
        <div
          key={course._id}
          className={`course-card-item ${
            editMode[course._id] ? "edit-mode" : ""
          }`}
        >
          {editMode[course._id] ? (
            <div>
              <input
                type="text"
                value={course.title}
                onChange={(e) =>
                  handleInputChange(course._id, "title", e.target.value)
                }
              />
              <textarea
                value={course.description}
                onChange={(e) =>
                  handleInputChange(course._id, "description", e.target.value)
                }
              />
              <button
                className="edit-button"
                onClick={() => handleSaveClick(course._id)}
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <button
                className="edit-button"
                onClick={() => handleEditClick(course._id)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(course._id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CourseList;
