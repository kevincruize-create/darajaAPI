const sendRoomNotification =
  require("./SendRoomNotification");

function TestNotification(app) {

  app.post(
    "/test-notification",
    async (req, res) => {

      console.log(
        "================================"
      );

      console.log(
        "TEST NOTIFICATION REQUEST RECEIVED"
      );

      console.log(
        "================================"
      );

      try {

        // Get the complete message sent by React
        const message = req.body.message;

        console.log(
          "Message received from React:",
          message
        );

        // Make sure message exists
        if (!message) {

          return res.status(400).json({
            success: false,
            message:
              "Notification message is missing"
          });
        }

        // Send the exact message to Expo
        const result =
          await sendRoomNotification(
            message
          );

        res.status(200).json({

          success: true,

          message:
            "Notifications sent successfully",

          result

        });

      } catch (error) {

        console.error(
          "TEST NOTIFICATION ERROR:"
        );

        console.error(error);

        res.status(500).json({

          success: false,

          message:
            "Failed to send notifications",

          error:
            error.message

        });

      }

    }
  );
}

module.exports =
  TestNotification;
