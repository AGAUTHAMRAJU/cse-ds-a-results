module.exports = async (req, res) => {
    // CORS handling logic and proxying the external API requests
    const externalUrl = `https://jntuhresults.up.railway.app/api/academicresult?htno=${req.query.htno}`;
    
    try {
      const response = await fetch(externalUrl);
      const data = await response.json();
      
      // Return the fetched data as response
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  };
  