const admin = require("firebase-admin");

const express = require('express')
const app = express()
const port = 3000


const serviceAccount = require("./service-account-file.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatapp-3a373.firebaseio.com"
});

var token = 'c6C3sHbpRlCnVLQUUDNism:APA91bEVeWSkzQvgmanf9IQjjV_DpNvHbUo3csNFn2pUEYS4KiBvVfdTeTA6fx9BwXpx91A6zwdz25CAhqMlKrujaur1XtUZF1L-YFi25i7c7SCBJIQNq7aiMJyi5Q9soxQd91R_9P55';

var message = {
  data: {
    score: '850',
    time: '2:45'
  },
  token,
};

admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})