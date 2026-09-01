const express = require('express');

const process = (app) => {
  app.use(express.json());

  const fetchData = async (phone, notf_data) => {
    try {
      const response = await fetch(
        "http://forexapi.atwebpages.com/Rocketie/Log_in/Log_in.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            phone: phone,
            notf: notf_data
          }),
        }
      );

      const result = await response.json();

      return result;

    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  app.post("/Log_in_rocketie", async (req, res) => {
    try {
      const { phone, notf } = req.body;

      if (!phone || !notf) {
        return res.status(400).json({
          success: false,
          message: "Missing phone or notification data"
        });
      }

      // Send BOTH phone and notification data in one request
      const data = await fetchData(phone, notf);

      // Send the PHP response back to your React Native app
      res.json(data);

    } catch (error) {
      console.error("Login error:", error);

      res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  });
};

module.exports = process;
