const sendNotification = require("./SendNotification");

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

        const result =
          await sendNotification(
            "ExponentPushToken[rPV5ohJD-g3iVoLqV3uJZ1]",
            "🚀 Rocketie",
            "This notification was sent from the React button!",
            {
              type: "TEST_NOTIFICATION",
            }
          );

        console.log(
          "Notification result:",
          result
        );

        res.status(200).json({
          success: true,
          message:
            "Notification sent successfully",
          result,
        });

      } catch (error) {

        console.error(
          "Notification error:",
          error
        );

        res.status(500).json({
          success: false,
          message:
            "Failed to send notification",
          error: error.message,
          details:
            error.response?.data || null,
        });
      }
    }
  );

}

module.exports = TestNotification;
