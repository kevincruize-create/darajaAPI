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
    throw new Error("Push tokens must be an array");
  }

  const messages = [];

  for (const token of tokens) {

    // Check whether token is valid
    if (!Expo.isExpoPushToken(token)) {

      console.log(
        "Invalid Expo push token:",
        token
      );

      continue;
    }

    console.log(
      "Preparing notification for token:",
      token
    );

  messages.push({
  to: token,
  title: "🚀 Rocketie TEST",
  body: "This is a remote notification test",
  data: {
    type: "TEST"
  },
  channelId: "rocketie",
  priority: "high"
});
  }

  // No valid tokens
  if (messages.length === 0) {
    throw new Error(
      "No valid push tokens found"
    );
  }

  try {

    console.log(
      "Messages being sent to Expo:",
      JSON.stringify(messages, null, 2)
    );

    // Split messages into Expo chunks
    const chunks =
      expo.chunkPushNotifications(messages);

    const tickets = [];

    for (const chunk of chunks) {

      console.log(
        "Sending notification chunk..."
      );

      const ticketChunk =
        await expo.sendPushNotificationsAsync(
          chunk
        );

      console.log(
        "Expo ticket response:",
        ticketChunk
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
      "Notification error:"
    );

    console.error(error);

    throw error;
  }
}

module.exports = sendNotifications;
