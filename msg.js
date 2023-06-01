const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  // Read the messages from the file
  fs.readFile('message.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading messages');
    }

    const messages = data.split('\n').filter(Boolean); // Split the data into individual messages
    const messageList = messages.map(message => {
      const [username, content] = message.split(':'); // Split each message into username and content
      return `<li><strong>${username.trim()}:</strong> ${content.trim()}</li>`; // Format the message with HTML tags
    });

    // Display the messages on the page
    res.send(`
      <h1>Enter Your Message</h1>
      <form action="/send" method="post">
        <input type="text" placeholder="Message" name="message" />
        <input type="hidden" name="username" id="usernameInput" />
        <button type="submit">Send</button>
      </form>
      <ul>${messageList.join('')}</ul>
  
      <script>
        const username = localStorage.getItem('username');
        document.getElementById('usernameInput').value = username;
      </script>
    `);
  });
});

router.post('/send', (req, res) => {
  const message = req.body.message;
  const username = req.body.username;

  const data = `${username}: ${message}\n`;

  fs.appendFile('message.txt', data, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to store the message' });
    }

    console.log('Message stored:', data);
    return res.redirect('/');
  });
});

module.exports = router;