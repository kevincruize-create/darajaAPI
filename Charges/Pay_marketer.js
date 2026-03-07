const express = require('express');
//const app = express();

const process = (app) => {

const myID = 38
const user_ID = 0
const amount = 0

  const fetchData = async () => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Charges/Pay_markter.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          myID,
          user_ID,
          amount
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.get("/Pay_markter", async (req, res) => {

    const data = await fetchData();   // call your function

    res.json(data);                   // send to browser

  });


}

module.exports = process;