
const { Expo } = require("expo-server-sdk");

const expo = new Expo();

async function sendNotifications(
  tokens,
  title,
  body,
  data = {}
) {

  if (!Array.isArray(tokens)) {
    throw new Error("Push tokens must be an array");
  }

  const messages = [];

  for (const token of tokens) {

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

      title: title,

      body: body,

      data: data,

      // MUST match the Android channel
      channelId: "rocketie",

      priority: "high"
    });
  }

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
      "ALL EXPO TICKETS:",
      JSON.stringify(tickets, null, 2)
    );

    // --------------------------------------------------
    // GET EXPO RECEIPTS
    // --------------------------------------------------

    const receiptIds = tickets
      .filter(ticket => ticket.status === "ok")
      .map(ticket => ticket.id);

    console.log(
      "RECEIPT IDS:",
      receiptIds
    );

    if (receiptIds.length > 0) {

      // Give Expo a moment to process the notification
      await new Promise(resolve =>
        setTimeout(resolve, 3000)
      );

      const receiptChunks =
        expo.chunkPushNotificationReceiptIds(
          receiptIds
        );

      for (const receiptChunk of receiptChunks) {

        console.log(
          "Checking Expo notification receipts..."
        );

        const receipts =
          await expo.getPushNotificationReceiptsAsync(
            receiptChunk
          );

        console.log(
          "EXPO RECEIPTS:",
          JSON.stringify(
            receipts,
            null,
            2
          )
        );

        for (const receiptId in receipts) {

          const receipt =
            receipts[receiptId];

          if (receipt.status === "ok") {

            console.log(
              "NOTIFICATION DELIVERED:",
              receiptId
            );

          } else {

            console.error(
              "NOTIFICATION DELIVERY ERROR:",
              receiptId,
              receipt
            );

          }
        }
      }
    }

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
