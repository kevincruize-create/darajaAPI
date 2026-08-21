const { Expo } = require("expo-server-sdk");

const expo = new Expo();

async function sendNotification(
  pushToken,
  title,
  body,
  data = {}
) {
  if (!Expo.isExpoPushToken(pushToken)) {
    throw new Error("Invalid Expo Push Token");
  }

  const message = {
    to: pushToken,
    sound: "default",
    title,
    body,
    data,
  };

  try {
    const tickets =
      await expo.sendPushNotificationsAsync([
        message,
      ]);

    console.log(
      "Notification tickets:",
      tickets
    );

    return tickets;

  } catch (error) {
    console.error(
      "Expo notification error:",
      error
    );

    throw error;
  }
}

module.exports = sendNotification;
