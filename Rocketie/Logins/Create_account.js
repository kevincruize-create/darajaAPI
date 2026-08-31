const express = require('express');
//const app = express();

const process = (app) => {
app.use(express.json());
//const phone = 4556;
//const names = 'Joe Allan Joe'
//const whatsapp = 4455667

  const fetchData = async (phone_num, names_selected, notf_data) => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Rocketie/Log_in/create_acc.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone: phone_num,
          names: names_selected,
          notf: notf_data
         }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/create_account_rocketie", async (req, res) => {
   const { names, phone, notf } = req.body;
    if (!names || !phone || !notf ) {
       return console.log('missing credentials');
    }
    //const phone = 4556;
   //const names = 'Joe Allan Joe'
  //const whatsapp = 4455667
    const phone_num  = phone.toString();
    const names_selected = names.toString();
    const notf_data = notf.toString();

    
    const data = await fetchData(phone_num, names_selected, notf_data);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;

