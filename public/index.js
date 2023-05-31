 // Check if the user is logged in
const isLoggedIn = localStorage.getItem('username');

if (isLoggedIn) {
  showChatForm();
} else {
  document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);

    showChatForm();
  });
}

function showChatForm() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('messageForm').style.display = 'block';

   document.getElementById('messageForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const message = document.getElementById('message').value;
    const username = localStorage.getItem('username');
    const chatMessages = document.getElementById('chatMessages');

    const messageItem = document.createElement('li');
    messageItem.textContent = username + ': ' + message;
    chatMessages.appendChild(messageItem);

    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', '/messages');
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === XMLHttpRequest.DONE) {
    //     if (xhr.status === 200) {
    //       console.log('Message stored successfully');
    //       // Perform any other actions or updates after storing the message
    //     } else {
    //       console.error('Failed to store message');
    //       // Handle the error condition appropriately
    //     }
    //   }
    // };
    // xhr.send(JSON.stringify({ username, message }));

    document.getElementById('message').value = '';
  });
}

