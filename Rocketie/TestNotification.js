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

        const result =
          await sendRoomNotification();


        console.log(
          "Notification result:",
          result
        );


        res.status(200).json({

          success: true,

          message:
            "Notifications sent successfully",

          result: result

        });


      } catch (error) {

        console.error(
          "TEST NOTIFICATION ERROR:"
        );

        console.error(
          error
        );


        res.status(500).json({

          success: false,

          message:
            "Failed to send notifications",

          error:
            error.message,

          details:
            error.response?.data ||
            null

        });

      }

    }
  );

}


module.exports =
  TestNotification;
