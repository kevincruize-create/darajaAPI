const express = require('express');
//const app = express();

const process = (app) => {

const phone = 4556;
const names = 'Joe Allan Joe'
const whatsapp = 4455667

  const fetchData = async () => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Log_in/Regester_names.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone,
          names,
          whatsapp,
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.get("/create_account", async (req, res) => {

    const data = await fetchData();   // call your function

    res.json(data);                   // send to browser

  });


}

module.exports = process;