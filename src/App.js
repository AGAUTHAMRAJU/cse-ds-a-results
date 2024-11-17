import React, { useState } from 'react';

const ResultsFetcher = () => {
  const [rollNo, setRollNo] = useState(''); // Roll number input state
  const [data, setData] = useState(null); // Fetched data state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const [name, setName] = useState(''); // Name state for student

  // Fetch data based on roll number input
  const fetchData = () => {
    if (!rollNo) return; // Don't fetch if roll number is empty

    setLoading(true);
    setError('');

    fetch(`https://jntuhresults.up.railway.app/api/academicresult?htno=${rollNo}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        if (data && data.Details && data.Details.NAME) {
          setName(data.Details.NAME); // Set name from response
        } else {
          setName('Name not available'); // Default in case of missing name
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching data');
        setLoading(false);
      });
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#333' }}>Enter Roll Number to Fetch Results</h2>
        <input
          type="text"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)} // Updates roll number as the user types
          placeholder="Enter Roll Number"
          style={{ padding: '10px', fontSize: '16px', width: '300px', marginRight: '10px', borderRadius: '5px' }}
        />
        <button
          onClick={fetchData} // Fetch data only on button click
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Fetch Results
        </button>
      </div>

      {loading && <div style={{ textAlign: 'center', fontSize: '18px', color: '#333' }}>Loading...</div>}
      {error && <div style={{ textAlign: 'center', fontSize: '18px', color: '#d9534f' }}>{error}</div>}

      {data && (
        <div>
          <h2 style={{ textAlign: 'center', color: '#333' }}>
            Results for Roll Number: {rollNo} - {name}
          </h2>
          {Object.keys(data.Results).map(semester => {
            const semesterData = data.Results[semester];
            const subjects = Object.values(semesterData);

            // If there are no subjects, skip generating a table
            if (subjects.length === 0) return null;

            return (
              <div key={semester} style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#4CAF50', textAlign: 'center' }}>
                  {semester}
                </h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Subject Code</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Subject Name</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Internal Marks</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>External Marks</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Total Marks</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Grade</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject, index) => (
                      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{subject.subject_code}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{subject.subject_name}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{subject.subject_internal}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{subject.subject_external}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{subject.subject_total}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{subject.subject_grade}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{subject.subject_credits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  <p>Total Marks: {semesterData.total} | Credits: {semesterData.credits} | CGPA: {semesterData.CGPA || 'N/A'}</p>
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
