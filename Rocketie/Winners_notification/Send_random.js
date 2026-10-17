const express = require('express');
//const app = express();


const process = (app, io) => {
app.use(express.json());
//const myID = 38
//const user_ID = 0
//const amount = 0

  const fetchData = async () => {
    try {
           const kenyanUsernames = [
  "Kevin 🚀",
  "Brian",
  "Wanjiku 🌸",
  "Akinyi 💕",
  "Kamau",
  "Njeri 🌷",
  "Otieno",
  "Wambui 💖",
  "Kiptoo",
  "Atieno 🦋",
  "Mwangi",
  "Chebet 💗",
  "Maina",
  "Nyambura 🌺",
  "Omondi",
  "Zawadi ✨",
  "Mutua",
  "Achieng 💕",
  "Kipchoge",
  "Wairimu 🌸",
  "Barasa",
  "Naliaka 💖",
  "Karanja",
  "Adhiambo 🌷",
  "Juma",
  "Moraa 💗",
  "Wafula",
  "Wangari 🌺",
  "Korir",
  "Shiko 🦋",
  "Moses",
  "Faith 💕",
  "Eliud",
  "Mercy 🌸",
  "Sammy",
  "Joy 💖",
  "Dennis",
  "Esther 🌷",
  "Victor",
  "Ann 💗",
  "Collins",
  "Brenda 🌺",
  "Ian",
  "Diana 🦋",
  "Mark",
  "Purity 💕",
  "Edwin",
  "Sheila 🌸",
  "Martin",
  "Linet 💖",
  "Brian Otieno",
  "Kevin Mwangi",
  "Wanjiku Kamau 🌸",
  "Akinyi Odhiambo 💕",
  "John Kiptoo",
  "Njeri Wambui 🌷",
  "Peter Maina",
  "Chebet Jepkosgei 💖",
  "Daniel Mutua",
  "Atieno Achieng 🦋",
  "Samuel Kiplagat",
  "Nyambura Wairimu 🌺",
  "David Omondi",
  "Zawadi Naliaka 💗",
  "Joseph Barasa",
  "Adhiambo Akoth 🌸",
  "Michael Karanja",
  "Moraa Nyaboke 💕",
  "Patrick Wafula",
  "Wangari Muthoni 🌷",
  "Dennis Kipkemoi",
  "Shiko Wanjiru 💖",
  "Allan Kimani",
  "Faith Chebet 🌺",
  "Eric Kipchoge",
  "Mercy Akinyi 💗",
  "Victor Ochieng",
  "Joy Wambui 🦋",
  "Collins Makori",
  "Esther Njeri 🌸",
  "Martin Kibet",
  "Brenda Atieno 💕",
  "Edwin Barasa",
  "Diana Wairimu 🌷",
  "Mark Odhiambo",
  "Purity Nyambura 💖",
  "Ian Kamau",
  "Sheila Achieng 🌺",
  "Moses Kiprono",
  "Linet Jepchirchir 💗",
  "George Mwangi",
  "Mary Wanjiku 🌸",
  "Alex Mutiso",
  "Ann Moraa 💕",
  "Clinton Otieno",
  "Grace Naliaka 🌷",
  "Hassan Juma",
  "Salma Abdalla 💖",
  "Abdi Noor",
  "Amina Hassan 🌺"
];

       sendNotification();



    async function sendNotification() {
     // const message = document.getElementById("message").value.trim();

     const randomName = kenyanUsernames[
         Math.floor(Math.random() * kenyanUsernames.length)
     ];

    //console.log(randomName);

     const randomNumber = Math.floor(Math.random() * 9) + 1;

     console.log(randomNumber);

      const message = `A player named ${randomName} just won ${randomNumber * 10}/- (${randomNumber} Rocketie Coins) after stakeing 10/- (1 Rocketie Coin) and beating AI Ben`

      const status = document.getElementById("status");

      const button = document.getElementById("sendButton");

      if (!message) {
        status.textContent = "Please enter a message.";
        return;
      }

      button.disabled = true;
      status.textContent = "Sending notification...";

      try {
        const response = await fetch(
          "https://darajaapi-2.onrender.com/AI_ben_earner",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
              message: message
            })
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Request failed"
          );
        }

        status.textContent =
          "Success: " + data.message;

        console.log("Backend response:", data);

      } catch (error) {
        console.error("Notification error:", error);

        status.textContent =
          "Failed: " + error.message;

      } finally {
        button.disabled = false;
      }
    }
      };

  app.get("/run-notification", async (req, res) => {



    res.json(data);                   // send to browser

  });


}


module.exports = process;
