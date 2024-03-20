import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudentManagement from "./pages/StudentManagement";
import Timeline from "./pages/Timeline";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/student-management">
            <button>Student Management</button>
          </Link>
          <Link to="/timeline">
            <button>Timeline</button>
          </Link>
        </nav>
        <Routes>
          <Route path="/student-management" element={<StudentManagement />} />
          <Route path="/timeline" element={<Timeline />} />
          {/* Redirect to "/timeline" as the default route */}
          <Route path="/" element={<Timeline />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
