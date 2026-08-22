const axios = require("axios");

const sendNotifications =
  require("./SendNotification");


async function sendRoomNotification() {

  try {

    console.log(
      "Fetching push tokens from PHP..."
    );

    const response = await axios.get(
      "http://forexapi.atwebpages.com/Rocketie/Log_in/Display_notf_codes.php"
    );

    console.log(
      "PHP response:",
      response.data
    );

    const users = response.data;

    // Make sure PHP returned an array
    if (!Array.isArray(users)) {

      throw new Error(
        "PHP did not return an array of users"
      );
    }

    console.log(
      "Users received:",
      users.length
    );


    // Extract push tokens
    const tokens = users
      .map(
        user => user.push_token
      )
      .filter(Boolean);


    console.log(
      "Tokens found:",
      tokens.length
    );


    if (tokens.length === 0) {

      throw new Error(
        "No push tokens were found in the PHP response"
      );
    }


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
      "Failed to send room notifications:"
    );

    console.error(
      error.response?.data ||
      error.message
    );

    throw error;
  }
}


module.exports =
  sendRoomNotification;
