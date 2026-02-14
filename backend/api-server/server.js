const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Import mood routes
const moodRoutes = require('./routes/moodRoutes');
app.use('/mood', moodRoutes);

app.get('/', (req, res) => {
  res.send('API server is running. Try /mood');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
