const express = require('express');
//const app = express();

const process = (app) => {
app.use(express.json());
//const myID = 38


  const fetchData = async (ID) => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Charges/Update_dep.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          myID:ID,
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/Update_dep", async (req, res) => {

        const { myID } = req.body;
        if (!myID) 
        {
           return console.log('missing credentials');
        }

  const ID  = myID.toString();
  
    const data = await fetchData(ID);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;

