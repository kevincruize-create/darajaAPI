const express = require('express');
//const app = express();

const process = (app) => {
app.use(express.json());
//const phone = 4556;
//const names = 'Joe Allan Joe'
//const whatsapp = 4455667

  const fetchData = async (phone, names, whatsapp) => {
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

  app.post("/create_account", async (req, res) => {
   const { names, phone, whatsapp } = req.body;
    if (!names || !phone || !whatsapp) {
       return console.log('missing credentials');
    }
    //const phone = 4556;
   //const names = 'Joe Allan Joe'
  //const whatsapp = 4455667
    const phone  = phone.toString();
    const names = names.toString();
    const whatsapp = whatsapp.toString();
    
    const data = await fetchData(phone, names, whatsapp);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;
