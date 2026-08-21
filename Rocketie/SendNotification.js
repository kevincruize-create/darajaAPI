const sendNotification = require("./Rocketie/SendNotification");

app.post("/test-notification", async (req, res) => {
  try {
    const result = await sendNotification(
      "ExponentPushToken[rPV5ohJD-g3iVoLqV3uJZ1]",
      "🚀 Rocketie",
      "This notification was sent from the React button!",
      {
        type: "TEST_NOTIFICATION",
      }
    );

    res.status(200).json({
      success: true,
      message: "Notification sent",
      result,
    });

  } catch (error) {
    console.error("Notification error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send notification",
      error: error.message,
    });
  }
});
