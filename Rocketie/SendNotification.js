const { Expo } = require("expo-server-sdk");

const expo = new Expo();

async function sendNotifications(
  tokens,
  title,
  body,
  data = {}
) {

  // Make sure tokens is an array
  if (!Array.isArray(tokens)) {
    throw new Error(
      "Push tokens must be an array"
    );
  }

  const messages = [];

  for (const token of tokens) {

    if (!Expo.isExpoPushToken(token)) {

      console.log(
        "Invalid token:",
        token
      );

      continue;
    }

    messages.push({
      to: token,
      sound: "default",
      title: title,
      body: body,
      data: data,
    });
  }

  if (messages.length === 0) {

    throw new Error(
      "No valid push tokens found"
    );
  }

  try {

    const chunks =
      expo.chunkPushNotifications(
        messages
      );

    const tickets = [];

    for (const chunk of chunks) {

      const ticketChunk =
        await expo.sendPushNotificationsAsync(
          chunk
        );

      tickets.push(
        ...ticketChunk
      );
    }

    console.log(
      "Notifications sent:",
      tickets
    );

    return tickets;

  } catch (error) {

    console.error(
      "Notification error:",
      error
    );

    throw error;
  }
}

module.exports =
  sendNotifications;
