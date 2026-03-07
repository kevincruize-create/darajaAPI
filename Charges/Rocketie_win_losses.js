const express = require('express');
//const app = express();

const process = (app) => {

const myID = 38
const odd = 2.44
const amount = 30

  const fetchData = async () => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Charges/Rocketie_win_losses.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          my_id: myID,
          odd,
          my_amount:amount
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.get("/Rocketie_win_losses", async (req, res) => {

    const data = await fetchData();   // call your function

    res.json(data);                   // send to browser

  });


}

module.exports = process;