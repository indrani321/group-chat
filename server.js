const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static('public'));



app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','login.html'));
});
app.post('/messages', (req, res) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: 'Invalid username or message' });
  }

  const data = { username, message };

  try {
    const filePath = path.join(__dirname, 'public', 'data.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    let messages = fileData ? JSON.parse(fileData) : [];
    messages.push(data);
    fs.writeFileSync(filePath, JSON.stringify(messages));
    return res.status(200).json({ message: 'Message stored successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to store message' });
  }
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});



