const { Expo } = require("expo-server-sdk");

const expo = new Expo();

async function sendNotification() {
  const pushToken = "ExponentPushToken[rPV5ohJD-g3iVoLqV3uJZ1]";

  if (!Expo.isExpoPushToken(pushToken)) {
    console.log("Invalid Expo Push Token");
    return;
  }

  const message = {
    to: pushToken,
    sound: "default",
    title: "🚀 Rocketie",
    body: "A new Rocketie room has been created!",
    data: {
      type: "ROOM_AVAILABLE",
      roomId: "12345",
    },
  };

  try {
    const tickets = await expo.sendPushNotificationsAsync([
      message,
    ]);

    console.log("Notification tickets:");
    console.log(tickets);
  } catch (error) {
    console.error("Error sending notification:");
    console.error(error);
  }
}

sendNotification();

module.exports = sendNotification;
