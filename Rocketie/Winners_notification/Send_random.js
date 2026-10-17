
const crypto = require("crypto");

const registerAutoNotificationRoutes = (app, io) => {
  const BASE_URL = (
    process.env.PUBLIC_BASE_URL ||
    "https://darajaapi-2.onrender.com"
  ).replace(/\/+$/, "");

  const CRON_SECRET = process.env.CRON_SECRET;

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

  // Compare secrets without a simple string comparison.
  function secretMatches(providedSecret) {
    if (
      typeof CRON_SECRET !== "string" ||
      !CRON_SECRET ||
      typeof providedSecret !== "string"
    ) {
      return false;
    }

    const expected = Buffer.from(CRON_SECRET);
    const provided = Buffer.from(providedSecret);

    return (
      expected.length === provided.length &&
      crypto.timingSafeEqual(expected, provided)
    );
  }

  // Shared notification-forwarding function.
  async function sendAutomaticNotification(res) {
    if (!CRON_SECRET) {
      console.error("[ROCKETIE] CRON_SECRET is not configured.");

      return res.status(500).json({
        success: false,
        message: "CRON_SECRET is missing from Render environment variables."
      });
    }

    const randomName =
      kenyanUsernames[
        Math.floor(Math.random() * kenyanUsernames.length)
      ];

    const randomNumber = Math.floor(Math.random() * 9) + 1;
    const possibleWin = randomNumber * 10;

    // This is promotional/demo copy, not a verified real win.
    const message =
      `Rocketie demo: ${randomName} could win ${possibleWin}/- ` +
      `(${randomNumber} Rocketie Coins) by staking 10/- ` +
      `and beating AI Ben!`;

    console.log("[ROCKETIE] Sending notification request.");
    console.log("[ROCKETIE] Message:", message);

    try {
      const response = await fetch(
        `${BASE_URL}/AI_ben_earner`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message }),
          signal: AbortSignal.timeout(20000)
        }
      );

      const responseText = await response.text();

      console.log(
        "[ROCKETIE] AI endpoint HTTP status:",
        response.status
      );

      console.log(
        "[ROCKETIE] AI endpoint response:",
        responseText
      );

      if (!response.ok) {
        return res.status(502).json({
          success: false,
          message: "The AI Ben notification endpoint failed.",
          targetStatus: response.status,
          details: responseText.slice(0, 500)
        });
      }

      let result;

      try {
        result = JSON.parse(responseText);
      } catch {
        result = null;
      }

      if (
        result &&
        (result.success === false || result.ok === false)
      ) {
        return res.status(502).json({
          success: false,
          message: "The AI Ben endpoint reported a failure.",
          details: responseText.slice(0, 500)
        });
      }

      return res.status(200).json({
        success: true,
        message: "Notification request forwarded to AI Ben endpoint.",
        targetStatus: response.status,
        targetResponse: responseText.slice(0, 300)
      });
    } catch (error) {
      console.error(
        "[ROCKETIE] Notification forwarding error:",
        error.message
      );

      return res.status(502).json({
        success: false,
        message: "Could not contact the AI Ben endpoint.",
        error: error.message
      });
    }
  }

  // Browser test:
  // /run-notification?secret=YOUR_CRON_SECRET
  app.get("/run-notification", async (req, res) => {
    if (!secretMatches(req.query.secret)) {
      return res.status(401).send(
        "Unauthorized. Provide the correct test secret."
      );
    }

    console.log("[ROCKETIE] Authenticated browser test.");

    return sendAutomaticNotification(res);
  });

  // cron-job.org:
  // POST /run-notification
  // Authorization: Bearer YOUR_CRON_SECRET
  app.post("/run-notification", async (req, res) => {
    const authorization = req.get("authorization") || "";
    const match = authorization.match(/^Bearer\s+(.+)$/i);

    if (!match || !secretMatches(match[1])) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized cron request."
      });
    }

    console.log("[ROCKETIE] Authenticated cron request.");

    return sendAutomaticNotification(res);
  });
};

module.exports = registerAutoNotificationRoutes;
