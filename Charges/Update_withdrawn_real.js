const express = require('express');
//const app = express();

const process = (app) => {

const myID = 38


  const fetchData = async () => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Charges/update_withdrawn_real.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          myID,
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.get("/Update_withdrawn_real", async (req, res) => {

    const data = await fetchData();   // call your function

    res.json(data);                   // send to browser

  });


}

module.exports = process;