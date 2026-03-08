const express = require('express');
//const app = express();

const process = (app) => {
app.use(express.json());
  //const marketer_ID = 823427;

  const fetchData = async (ID) => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Charges/Payment_list.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          offer_ID: ID
        })
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/Marketer_list", async (req, res) => {

    const { offer_ID } = req.body;
        if (!offer_ID) 
    {
       return console.log('missing credentials');
    }

    const ID  = offer_ID.toString();
    const data = await fetchData(ID);   // call your function

    res.json(data);                   // send to browser

  });

}


module.exports = process;
