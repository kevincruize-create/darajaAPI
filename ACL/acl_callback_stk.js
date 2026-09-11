
const express = require("express");
const axios = require("axios");

const process = (app, fs) => {

  // Temporary payment storage
  const paymentStatus = {};

  // Start new payment
  app.post("/start-payment", express.json(), (req, res) => {

    const { number, id, amount } = req.body;

    if (!number) {
      return res.status(400).json({
        status: "error",
        message: "Phone number is required"
      });
    }

    // Remove previous payment status
    delete paymentStatus[number];

    // Create fresh pending transaction
    paymentStatus[number] = {
      status: "pending",
      number,
      id,
      amount
    };

    console.log(
      "New payment started:",
      paymentStatus[number]
    );

    return res.json({
      status: "pending",
      message: "Payment started"
    });
  });

  // Check payment status
  app.get("/payment-status", (req, res) => {

    const number = req.query.number;

    if (!number) {
      return res.status(400).json({
        status: "error",
        message: "Phone number is required"
      });
    }

    const payment = paymentStatus[number];

    if (!payment) {
      return res.json({
        status: "pending"
      });
    }

    console.log(
      "Sending payment status to React:",
      payment
    );

    return res.json(payment);
  });

  // M-Pesa callback
  app.post(
    "/callback_ACL",
    express.json(),
    async (req, res) => {

      const number = req.query.number;
      const id = req.query.id;
      const amount = req.query.amount;

      console.log(
        number,
        id,
        amount,
        "received"
      );

      console.log("STK PUSH CALLBACK RECEIVED");

      const stkCallback = req.body?.Body?.stkCallback;

      if (!stkCallback) {
        console.log("Invalid callback structure");
        return res.sendStatus(400);
      }

      const {
        CheckoutRequestID,
        ResultCode,
        ResultDesc
      } = stkCallback;

      // Payment successful
      if (ResultCode === 0) {

        console.log("Payment successful ACL");

        paymentStatus[number] = {
          status: "success",
          number,
          id,
          amount,
          CheckoutRequestID,
          ResultCode,
          message: "Payment successful"
        };

        // Send successful payment to PHP
        try {

          await axios.post(
            "http://forexapi.atwebpages.com/Rocketie/Mpesa/Deposited.php",
            {
              number,
              id,
              amount
            },
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          );

        } catch (error) {

          console.error(
            "Failed to send to PHP:",
            error.message
          );

        }
      }

      // User cancelled
      else if (ResultCode === 1032) {

        console.log(
          "User cancelled the STK request ACL"
        );

        paymentStatus[number] = {
          status: "cancelled",
          number,
          id,
          amount,
          CheckoutRequestID,
          ResultCode,
          message: "Payment request cancelled"
        };
      }

      // Other failure
      else {

        console.log(
          "STK failed:",
          ResultDesc,
          "Code:",
          ResultCode
        );

        paymentStatus[number] = {
          status: "failed",
          number,
          id,
          amount,
          CheckoutRequestID,
          ResultCode,
          message: ResultDesc
        };
      }

      // Save callback
      fs.writeFile(
        "stkcallback.json",
        JSON.stringify(req.body, null, 2),
        "utf8",
        err => {
          if (err) {
            console.log("File write error:", err);
          }
        }
      );

      // Respond to Safaricom once
      return res.sendStatus(200);
    }
  );
};

module.exports = process;

