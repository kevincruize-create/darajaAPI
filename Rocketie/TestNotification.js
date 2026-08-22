const axios = require("axios");

const sendNotifications = require("./SendNotification");

async function sendRoomNotification() {

  try {

    // Fetch tokens from PHP
    const response = await axios.get(
      "http://forexapi.atwebpages.com/Rocketie/Log_in/Display_notf_codes.php"
    );

    const users = response.data;

    console.log(
      "Users received:",
      users.length
    );

    // Extract tokens
    const tokens = users
      .map(user => user.push_token)
      .filter(Boolean);

    console.log(
      "Tokens found:",
      tokens.length
    );

    // Send notification
    const result =
      await sendNotifications(
        tokens,
        "🚀 New Rocketie Room",
        "A new room has been created. Join now!",
        {
          type: "NEW_ROOM"
        }
      );

    return result;

  } catch (error) {

    console.error(
      "Failed to send room notifications:",
      error.response?.data ||
      error.message
    );

    throw error;
  }
}

module.exports =
  sendRoomNotification;
