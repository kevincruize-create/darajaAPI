
const registerAutoNotificationRoutes = (app, io) => {
  const BASE_URL = (
    process.env.PUBLIC_BASE_URL ||
    "https://darajaapi-2.onrender.com"
  ).replace(/\/$/, "");

  const CRON_SECRET = process.env.CRON_SECRET;

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

  app.post("/run-notification", async (req, res) => {
    // Verify the cron secret.
    if (
      !CRON_SECRET ||
      req.get("authorization") !== `Bearer ${CRON_SECRET}`
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    // Select a random username and number.
    const randomName =
      kenyanUsernames[
        Math.floor(Math.random() * kenyanUsernames.length)
      ];

    const randomNumber = Math.floor(Math.random() * 9) + 1;

    const message =
      `A player named ${randomName} just won ` +
      `${randomNumber * 10}/- (${randomNumber} Rocketie Coins) ` +
      `after staking 10/- (1 Rocketie Coin) and beating AI Ben!`;

    try {
      console.log("Automatic Rocketie notification triggered.");
      console.log("Generated message:", message);

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

      console.log("AI Ben endpoint status:", response.status);
      console.log("AI Ben endpoint response:", responseText);

      if (!response.ok) {
        return res.status(502).json({
          success: false,
          message: "Notification endpoint failed",
          targetStatus: response.status,
          details: responseText.slice(0, 500)
        });
      }

      return res.status(200).json({
        success: true,
        message: "Notification request forwarded",
        targetStatus: response.status
      });
    } catch (error) {
      console.error("Automatic notification error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to forward notification"
      });
    }
  });
};

module.exports = registerAutoNotificationRoutes;
