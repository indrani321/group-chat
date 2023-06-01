const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <h1>Enter Username</h1>
    <form onsubmit="saveUsername(event)">
      <input type="text" placeholder="Username" id="usernameInput" />
      <button type="submit">Submit</button>
    </form>

    <script>
      function saveUsername(event) {
        event.preventDefault();
        const username = document.getElementById('usernameInput').value;
        localStorage.setItem('username', username);
        window.location.href = '/';
      }
    </script>
  `);
});

module.exports = router;