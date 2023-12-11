import React, { useState } from "react";
import axios from "axios";
import "../css/SubmitAssignment.css";

const handleSubmitAssignment = async (assignmentDetails) => {
  const { file, audio, video, comments, onAssignmentSubmitted } = assignmentDetails;

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("audio", audio);
    formData.append("video", video);
    formData.append("comments", comments);

    // Make a POST request to your backend endpoint
    await axios.post("http://127.0.0.1:8080/api/submitAssignment", formData);

    // Clear form data after submission
    onAssignmentSubmitted();

    console.log("Assignment submitted successfully.");
  } catch (error) {
    console.error("Error submitting assignment: ", error);
  }
};

function SubmitAssignment({ onAssignmentSubmitted }) {
  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState(null);
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAudioChange = (event) => {
    setAudio(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSubmitAssignment({ file, audio, video, comments, onAssignmentSubmitted });

    // Clear form data after submission if needed
    setFile(null);
    setAudio(null);
    setVideo(null);
    setComments("");
  };

  return (
    <div className="submit-assignment">
      <h1>Submit Assignment</h1>
      <p>
        <strong>After uploading, you must click Submit to complete the submission.</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Choose File:</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <div>
          <label>Record Audio:</label>
          <input type="file" accept="audio/*" onChange={handleAudioChange} />
        </div>

        <div>
          <label>Record Video:</label>
          <input type="file" accept="video/*" onChange={handleVideoChange} />
        </div>

        <div>
          <label>Comments:</label>
          <textarea value={comments} onChange={handleCommentsChange} />
        </div>

        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => onAssignmentSubmitted()}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default SubmitAssignment;
