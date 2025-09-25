import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Login";
import UploadResume from "./UploadResume";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/upload-resume" element={<UploadResume />} />
      </Routes>
    </Router>
  );
}

export default App
