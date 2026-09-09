const express = require('express');
//const app = express();
//app.use(express.json());

const process = (app) => {
app.use(express.json());
//const name = 'Kevin Mukoya'
//const mpesa = 254726270922

//const phone = 254726270922

  const fetchData = async (phone, notf_data) => {
    try {
      const response = await fetch("http://forexapi.atwebpages.com/Log_in/Log_in.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone,
          notf: notf_data
         }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/Log_in", async (req, res) => {
  
   const { phone, notf } = req.body;
     if (!phone) {
      return console.log('missing credentials');
     }
    
      const data = await fetchData(phone, notf);

      // Send the PHP response back to your React Native app
      res.json(data);  

  });


}


module.exports = process;


