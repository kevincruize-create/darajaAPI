const express = require('express');
//const app = express();

const process = (app) => {

  const marketer_ID = 823427;

  const fetchData = async () => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Charges/Payment_list.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          offer_ID: marketer_ID
        })
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.get("/Marketer_list", async (req, res) => {

    const data = await fetchData();   // call your function

    res.json(data);                   // send to browser

  });

}

module.exports = process;