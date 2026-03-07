const express = require('express');
//const app = express();

const process = (app) => {

//const name = 'Kevin Mukoya'
//const mpesa = 254726270922
const phone = 254726270922

  const fetchData = async () => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Log_in/Log_in.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone,
         }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.get("/Log_in", async (req, res) => {

    const data = await fetchData();   // call your function

    res.json(data);                   // send to browser

  });


}

module.exports = process;