const express = require('express');


const process = (app) => {
app.use(express.json());
const { Expo } = require("expo-server-sdk");

const expo = new Expo();
const fetchData = async (phone) => {
 


async function sendNotification() {
  const pushToken = "ExponentPushToken[rPV5ohJD-g3iVoLqV3uJZ1]";

  // Check that the token is valid
  if (!Expo.isExpoPushToken(pushToken)) {
    console.log("❌ Invalid Expo Push Token");
    return;
  }

  const message = {
    to: pushToken,
    sound: "default",
    title: "🚀 Rocketie",
    body: "A new room has been created!",
    data: {
      roomId: "12345",
    },
  };

  try {
    const ticket = await expo.sendPushNotificationsAsync([
      message,
    ]);

    console.log("Notification sent!");
    console.log(ticket);

  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

sendNotification();
 

}


module.exports = process;
