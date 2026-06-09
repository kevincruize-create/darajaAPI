const express = require('express');
//const app = express();

const process = (app) => {
app.use(express.json());
//const name = 'Kevin Mukoya'
//const mpesa = 254726270922
//const myID = 38

  const fetchData = async (ID, mpesa_num, team_name) => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Log_in/Edit_profile.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          myID: ID,
          mpesa: mpesa_num,
          team: team_name,
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/Edit_profile", async (req, res) => {
    const { myID, mpesa, team } = req.body;
     if (!myID || !mpesa || !team) {
       return res.status(400).json({
         error: "Missing credentials"
       });
     }



       const ID  = myID.toString();

       const mpesa_num = mpesa.toString();
       const team_name = team.toString();

    const data = await fetchData(ID,  mpesa_num, team_name);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;


