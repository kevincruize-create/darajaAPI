const express = require('express');
//const app = express();

const process = (app) => {



  const fetchData = async () => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Log_in/Google_approve.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
       
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.get("/Google_approve", async (req, res) => {

    const data = await fetchData();   // call your function

    res.json(data);                   // send to browser

  });


}

module.exports = process;