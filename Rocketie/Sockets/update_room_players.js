const express = require('express');
//const app = express();


const process = (app, room, type) => {
app.use(express.json());
//const myID = 38
//const user_ID = 0
//const amount = 0

  const fetchData = async () => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Rocketie/Offers/Update_room_num.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          room,
          type
        }),
      });

      const data = await response.json();
      console.log('update', data)

      return data;

    } catch (error) {
      console.error(error);
    }
  };




}


module.exports = process;
