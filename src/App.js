import React, { useState } from "react";

const ResultsFetcher = () => {
  const [rollNo, setRollNo] = useState(""); // Roll number input state
  const [data, setData] = useState(null); // Fetched data state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [name, setName] = useState(""); // Name state for student

  // Fetch data based on roll number input
  fetch(`/api/cors-proxy?url=https://jntuhresults.up.railway.app/api/academicresult?htno=${rollNo}`)
  .then((response) => response.json())
  .then((data) => {
    console.log("Fetched Data:", data);
    if (data && data.Details && data.Details.NAME) {
      setName(data.Details.NAME);
    } else {
      setName("Name not available");
    }

    if (data && data.Results) {
      setData(data);
    } else {
      setError("No results found for this roll number.");
    }
    setLoading(false);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    setError("Error fetching data");
    setLoading(false);
  });

  
  
  // For testing purposes: Uncomment this and use mock data if API fails
  // const fetchData = () => {
  //   const mockData = {
  //     Details: { NAME: "John Doe" },
  //     Results: {
  //       "2-1": {
  //         subject1: {
  //           subject_code: "15307",
  //           subject_name: "DATA STRUCTURES LAB",
  //           subject_internal: 25,
  //           subject_external: 73,
  //           subject_total: 98,
  //           subject_grade: "O",
  //           subject_credits: 1.5,
  //         },
  //         total: 149,
  //         credits: 21,
  //         CGPA: 7.10,
  //       },
  //     },
  //   };
  //   setName(mockData.Details.NAME);
  //   setData(mockData);
  // };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h2 style={{ color: "#333" }}>Enter Roll Number to Fetch Results</h2>
        <input
          type="text"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          placeholder="Enter Roll Number"
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            marginRight: "10px",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={fetchData}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Fetch Results
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: "center", fontSize: "18px", color: "#333" }}>
          Loading...
        </div>
      )}
      {error && (
        <div style={{ textAlign: "center", fontSize: "18px", color: "#d9534f" }}>
          {error}
        </div>
      )}

      {data && (
        <div>
          <h2 style={{ textAlign: "center", color: "#333" }}>
            Results for Roll Number: {rollNo} - {name}
          </h2>
          {Object.keys(data.Results).map((semester) => {
            const semesterData = data.Results[semester];
            const subjects = Object.values(semesterData);

            if (subjects.length === 0) return null;

            return (
              <div key={semester} style={{ marginBottom: "30px" }}>
                <h3 style={{ color: "#4CAF50", textAlign: "center" }}>
                  {semester}
                </h3>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: "15px",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                      <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                        Subject Code
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                        Subject Name
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                        Internal Marks
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                        External Marks
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                        Total Marks
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                        Grade
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                        Credits
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject, index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                        }}
                      >
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {subject.subject_code}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {subject.subject_name}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {subject.subject_internal}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {subject.subject_external}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {subject.subject_total}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {subject.subject_grade}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {subject.subject_credits}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ textAlign: "center", fontWeight: "bold" }}>
                  <p>
                    Total Marks: {semesterData.total} | Credits:{" "}
                    {semesterData.credits} | CGPA:{" "}
                    {semesterData.CGPA || "N/A"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResultsFetcher;