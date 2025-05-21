// backend/index.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

// Import the calculateAllocations function
const calculateAllocations = require('./controllers/allocationController');

app.use(cors()); // Enables CORS to allow communication between different origins (frontend & backend)
app.use(express.json()); // Parses incoming requests with JSON payloads

// Route to handle allocation calculation
app.post('/api/calculateAllocations', (req, res) => {
  const inputData = req.body;
  try {
    const result = calculateAllocations(inputData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error calculating allocations', error: error.message });
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
