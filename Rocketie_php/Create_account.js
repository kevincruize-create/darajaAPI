const express = require('express');
//const app = express();

const process = (app) => {
app.use(express.json());
//const phone = 4556;
//const names = 'Joe Allan Joe'
//const whatsapp = 4455667

  const fetchData = async (phone_num, names_selected, whatsapp_num) => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Log_in/Regester_names.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone: phone_num,
          names: names_selected,
          whatsapp: whatsapp_num,
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/create_account", async (req, res) => {
   const { names, phone, whatsapp } = req.body;
    if (!names || !phone || !whatsapp) {
       return console.log('missing credentials');
    }
    //const phone = 4556;
   //const names = 'Joe Allan Joe'
  //const whatsapp = 4455667
    const phone_num  = phone.toString();
    const names_selected = names.toString();
    const whatsapp_num = whatsapp.toString();
    
    const data = await fetchData(phone_num, names_selected, whatsapp_num);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;


