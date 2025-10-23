import React, { useState, useEffect } from "react";
import axios from "axios";

function ParseResume() {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://localhost:7050/api/resume/parse",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setParsedData(response.data);
      console.log("Parsed Resume:", response.data);
    } catch (err) {
      console.error("Error parsing resume:", err);
      alert("Failed to parse resume. Please try again.");
    }
  };

  useEffect(() => {
    if (parsedData) {
      console.log("Parsed Data:", parsedData);
    }
  }, [parsedData]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Resume Parser</h2>

      <div style={{ marginBottom: "15px" }}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          onClick={handleUpload}
          style={{
            marginLeft: "10px",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Upload & Parse
        </button>
      </div>
          
      {parsedData && (
  <div
    style={{
      backgroundColor: "#f8f9fa",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    }}
  >
    {(() => {
      // Handle both key casings
      const contact = parsedData.Contact || parsedData.contact;
      const experience = parsedData.Experience || parsedData.experience;
      const education = parsedData.Education || parsedData.education;
      const skills = parsedData.Skills || parsedData.skills;
      const summary = parsedData.Summary || parsedData.summary;

      // Helper to safely access both PascalCase and camelCase inside contact
      const getVal = (obj, key) =>
        obj?.[key] ||
        obj?.[key.toLowerCase()] ||
        obj?.[key.charAt(0).toUpperCase() + key.slice(1)] ||
        "";

      return (
        <>
          {/* CONTACT SECTION */}
          {contact && (
            <section>
              <h3 style={{ borderBottom: "2px solid #007bff" }}>Contact</h3>
              <p><strong>Name:</strong> {getVal(contact, "name")}</p>
              <p><strong>Phone:</strong> {getVal(contact, "phone")}</p>
              <p><strong>Email:</strong> {getVal(contact, "email")}</p>
              <p><strong>Location:</strong> {getVal(contact, "location")}</p>
              <p><strong>LinkedIn:</strong> {getVal(contact, "linkedin")}</p>
            </section>
          )}

          {/* SUMMARY SECTION */}
          {summary && (
            <section style={{ marginTop: "20px" }}>
              <h3 style={{ borderBottom: "2px solid #007bff" }}>Summary</h3>
              <p>{summary}</p>
            </section>
          )}

          {/* EXPERIENCE SECTION */}
          {experience && experience.length > 0 && (
            <section style={{ marginTop: "20px" }}>
              <h3 style={{ borderBottom: "2px solid #007bff" }}>Experience</h3>
              {experience.map((exp, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "15px",
                    padding: "10px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 0 5px rgba(0,0,0,0.05)",
                  }}
                >
                  <p>
                    <strong>
                      {exp.title || exp.Title || "Title not available"}
                    </strong>{" "}
                    @ {exp.company || exp.Company || "Company not available"} (
                    {exp.dates || exp.Dates || "Dates not available"})
                  </p>
                  {exp.description && (
                    <p style={{ marginTop: "5px", whiteSpace: "pre-line" }}>
                      {exp.description || exp.Description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* EDUCATION SECTION */}
          {education && education.length > 0 && (
            <section style={{ marginTop: "20px" }}>
              <h3 style={{ borderBottom: "2px solid #007bff" }}>Education</h3>
              {education.map((edu, index) => (
                <p key={index}>
                  <strong>
                    {edu.degree || edu.Degree || "Degree not available"}
                  </strong>{" "}
                  - {edu.institution || edu.Institution || "Institution"} (
                  {edu.dates || edu.Dates || "Dates not available"})
                </p>
              ))}
            </section>
          )}

          {/* SKILLS SECTION */}
          {skills && (
            <section style={{ marginTop: "20px" }}>
              <h3 style={{ borderBottom: "2px solid #007bff" }}>Skills</h3>
              {Array.isArray(skills) ? (
                <ul style={{ columns: 2, listStyleType: "square" }}>
                  {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              ) : (
                Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <p style={{ marginTop: "10px" }}>
                      <strong>{category}:</strong>{" "}
                      {Array.isArray(items) ? items.join(", ") : items}
                    </p>
                  </div>
                ))
              )}
            </section>
          )}
        </>
      );
    })()}
  </div>
)}
    </div>
  );
}

export default ParseResume;
