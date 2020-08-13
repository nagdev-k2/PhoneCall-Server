const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");

const serviceAccount = require("../../service-account-file.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatapp-3a373.firebaseio.com"
});


const notificationMessage = (sender, receiver, type, status) => {
  let data = {
    message: `${sender.name}  (${sender.mobile}) is ${type} calling you...!`,
    status,
  }
  if (status !== 'start') {
    data.message = `You have a ${type} missed call from ${sender.name}  (${sender.mobile}) ...!`;
  }
  const message = {
    data,
  };
  admin.messaging().sendToDevice(
    receiver.fcmToken,
    message,
    {
      contentAvailable: true,
      priority: 'high',
    },
  )
    .then((response) => {
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
}



router.post('/start_call', (req, res, next) => {
  const {user, receiver, type} = req.body;
  notificationMessage(user, receiver, type, 'start');
  res.status(200).json({
    message: 'working start call',
  })
})

router.post('/missed_call', (req, res, next) => {
  notificationMessage(user, receiver, type, 'missed');
  res.status(200).json({
    message: 'working missed call',
  })
})

module.exports = router;