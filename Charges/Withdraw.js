const express = require('express');
//const app = express();

const process = (app) => {

const myID = 38
const number = 254726270922
const amount = 200


  const fetchData = async () => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Charges/Withdraw.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: myID,
          number, 
          amount
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.get("/Withdraw", async (req, res) => {

    const data = await fetchData();   // call your function

    res.json(data);                   // send to browser

  });


}

module.exports = process;