const express = require('express');
const path = require('path');
const { executeHybridTask } = require('./cli');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for processing tasks
app.post('/api/process', async (req, res) => {
  try {
    const { task, options } = req.body;
    // For simplicity, we'll use default options
    const result = await executeHybridTask(task, { complexity: 'auto' });
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Hybrid AI GUI is running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});