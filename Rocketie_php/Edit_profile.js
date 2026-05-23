const express = require('express');
//const app = express();

const process = (app) => {
app.use(express.json());
//const name = 'Kevin Mukoya'
//const mpesa = 254726270922
//const myID = 38

  const fetchData = async (ID, names, mpesa_num, team) => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Log_in/Edit_profile.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          myID: ID,
          name: names,
          mpesa: mpesa_num,
          team,
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/Edit_profile", async (req, res) => {
    const { myID, name, mpesa, team } = req.body;
     if (!myID || !name || !mpesa || !team) {
       return res.status(400).json({
         error: "Missing credentials"
       });
     }

      console.log('name', name)
      console.log('myID', myID)
      console.log('mpesa', mpesa)

       const ID  = myID.toString();
       const names = name.toString();
       const mpesa_num = mpesa.toString();
       const team_name = team.toString();

    const data = await fetchData(ID, names, mpesa_num, team);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;


