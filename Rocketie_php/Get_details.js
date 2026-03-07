const express = require('express');
//const app = express();

const process = (app) => {

//const name = 'Kevin Mukoya'
//const mpesa = 254726270922
const user_ID = 38

  const fetchData = async () => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Log_in/Get_details.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_ID,
         
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.get("/get_details", async (req, res) => {

    const data = await fetchData();   // call your function

    res.json(data);                   // send to browser

  });


}

module.exports = process;