import "./App.css";
import React, { useState } from "react";
import CourseList from "./courses/CourseList";
import CreateCourse from "./courses/CreateCourse";
import Header from "./header/Header";

function App() {
  const [refreshCourseList, setRefreshCourseList] = useState(false);

  const triggerCourseListRefresh = () => {
    setRefreshCourseList((prev) => !prev);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <CreateCourse onCourseAdded={triggerCourseListRefresh} />
        <CourseList refresh={refreshCourseList} />
      </main>
    </div>
  );
}

export default App;
