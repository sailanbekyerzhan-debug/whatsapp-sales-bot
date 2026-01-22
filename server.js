const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Serve static files from the build directory (if you build a React app)
app.use(express.static(path.join(__dirname, 'build')));

app.post('/api/send', (req, res) => {
  const { phone, message } = req.body;
  if (!phone || !message) {
    return res.status(400).json({ error: 'phone және message міндетті' });
  }

  // TODO: integrate with a WhatsApp provider (Twilio, Meta Cloud API, etc.) here.
  console.log('Send request:', { phone, message });

  // Currently return a stubbed response
  res.json({ result: 'queued', phone });
});

// Serve index.html for all other routes (client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
