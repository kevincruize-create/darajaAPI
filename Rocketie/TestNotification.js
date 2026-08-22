const sendRoomNotification =
  require("./SendRoomNotification");

function TestNotification(app) {

  app.post(
    "/test-notification",
    async (req, res) => {

      try {

        const {
          room_name,
          coin
        } = req.body;

        const result =
          await sendRoomNotification(
            room_name,
            coin
          );

        res.status(200).json({
          success: true,
          message:
            "Notifications sent successfully",
          result
        });

      } catch (error) {

        console.error(
          "TEST NOTIFICATION ERROR:",
          error
        );

        res.status(500).json({
          success: false,
          message:
            "Failed to send notifications",
          error: error.message
        });
      }
    }
  );
}

module.exports =
  TestNotification;
