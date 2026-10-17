
const registerAutoNotificationRoutes = (app, io) => {
  const BASE_URL = (
    process.env.PUBLIC_BASE_URL ||
    "https://darajaapi-2.onrender.com"
  ).replace(/\/+$/, "");

  const kenyanUsernames = [
    "Kevin 🚀", "Brian", "Wanjiku 🌸", "Akinyi 💕", "Kamau",
    "Njeri 🌷", "Otieno", "Wambui 💖", "Kiptoo", "Atieno 🦋",
    "Mwangi", "Chebet 💗", "Maina", "Nyambura 🌺", "Omondi",
    "Zawadi ✨", "Mutua", "Achieng 💕", "Kipchoge", "Wairimu 🌸",
    "Barasa", "Naliaka 💖", "Karanja", "Adhiambo 🌷", "Juma",
    "Moraa 💗", "Wafula", "Wangari 🌺", "Korir", "Shiko 🦋",
    "Moses", "Faith 💕", "Eliud", "Mercy 🌸", "Sammy", "Joy 💖",
    "Dennis", "Esther 🌷", "Victor", "Ann 💗", "Collins",
    "Brenda 🌺", "Ian", "Diana 🦋", "Mark", "Purity 💕",
    "Edwin", "Sheila 🌸", "Martin", "Linet 💖",
    "Brian Otieno", "Kevin Mwangi", "Wanjiku Kamau 🌸",
    "Akinyi Odhiambo 💕", "John Kiptoo", "Njeri Wambui 🌷",
    "Peter Maina", "Chebet Jepkosgei 💖", "Daniel Mutua",
    "Atieno Achieng 🦋", "Samuel Kiplagat", "Nyambura Wairimu 🌺",
    "David Omondi", "Zawadi Naliaka 💗", "Joseph Barasa",
    "Adhiambo Akoth 🌸", "Michael Karanja", "Moraa Nyaboke 💕",
    "Patrick Wafula", "Wangari Muthoni 🌷", "Dennis Kipkemoi",
    "Shiko Wanjiru 💖", "Allan Kimani", "Faith Chebet 🌺",
    "Eric Kipchoge", "Mercy Akinyi 💗", "Victor Ochieng",
    "Joy Wambui 🦋", "Collins Makori", "Esther Njeri 🌸",
    "Martin Kibet", "Brenda Atieno 💕", "Edwin Barasa",
    "Diana Wairimu 🌷", "Mark Odhiambo", "Purity Nyambura 💖",
    "Ian Kamau", "Sheila Achieng 🌺", "Moses Kiprono",
    "Linet Jepchirchir 💗", "George Mwangi", "Mary Wanjiku 🌸",
    "Alex Mutiso", "Ann Moraa 💕", "Clinton Otieno",
    "Grace Naliaka 🌷", "Hassan Juma", "Salma Abdalla 💖",
    "Abdi Noor", "Amina Hassan 🌺"
  ];

  // Opening this URL triggers a test notification.
  // GET /run-notification
  app.get("/run-notification", async (req, res) => {
    return sendNotification(res);
  });

  // cron-job.org can also use POST.
  // POST /run-notification
  app.post("/run-notification", async (req, res) => {
    return sendNotification(res);
  });

  async function sendNotification(res) {
    const randomName =
      kenyanUsernames[
        Math.floor(Math.random() * kenyanUsernames.length)
      ];

    const randomNumber = Math.floor(Math.random() * 9) + 1;

    const message =
      `Rocketie test notification! ${randomName} could win ` +
      `${randomNumber * 10}/- (${randomNumber} Rocketie Coins) ` +
      `by beating AI Ben!`;

    console.log("[TEST NOTIFICATION] Triggered.");
    console.log("[TEST NOTIFICATION] Message:", message);

    try {
      const response = await fetch(
        `${BASE_URL}/AI_ben_earner`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message })
        }
      );

      const responseText = await response.text();

      console.log(
        "[TEST NOTIFICATION] Target status:",
        response.status
      );

      console.log(
        "[TEST NOTIFICATION] Target response:",
        responseText
      );

      if (!response.ok) {
        return res.status(502).send(
          `Failed to send notification. AI Ben endpoint returned HTTP ${response.status}. Check Render logs.`
        );
      }

      return res.status(200).send(
        `Notification request sent to AI Ben endpoint. HTTP ${response.status}. Check your device and Render logs to confirm delivery.`
      );
    } catch (error) {
      console.error("[TEST NOTIFICATION] Error:", error);

      return res.status(500).send(
        `Notification request failed: ${error.message}`
      );
    }
  }
};

module.exports = registerAutoNotificationRoutes;
