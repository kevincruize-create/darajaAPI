
const registerAutoNotificationRoutes = (app, io) => {
  const BASE_URL = (
    process.env.PUBLIC_BASE_URL ||
    "https://darajaapi-2.onrender.com"
  ).replace(/\/+$/, "");

  const CRON_SECRET = process.env.CRON_SECRET;

  // Simulated usernames for promotional messages.
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

  // Health-check route: opening this URL does NOT send a notification.
  app.get("/run-notification", (req, res) => {
    res.status(200).send(
      "Rocketie notification endpoint is online. Send an authenticated POST request to trigger it."
    );
  });

  // Cron-job.org must call this route using POST.
  app.post("/run-notification", async (req, res) => {
    console.log("[ROCKETIE CRON] Request received.");

    // Check server configuration.
    if (!CRON_SECRET) {
      console.error("[ROCKETIE CRON] CRON_SECRET is missing.");

      return res.status(500).json({
        success: false,
        message: "Server configuration error: CRON_SECRET is missing."
      });
    }

    // Authenticate the cron request.
    const authorization = req.get("authorization");
    const expectedAuthorization = `Bearer ${CRON_SECRET}`;

    if (authorization !== expectedAuthorization) {
      console.warn("[ROCKETIE CRON] Unauthorized request.");

      return res.status(401).json({
        success: false,
        message: "Unauthorized. Check the cron authorization header."
      });
    }

    // Choose a random username and a random promotional amount.
    const randomName =
      kenyanUsernames[
        Math.floor(Math.random() * kenyanUsernames.length)
      ];

    const randomNumber = Math.floor(Math.random() * 9) + 1;
    const simulatedWin = randomNumber * 10;

    // These are simulated promotional results, not verified game wins.
    const message =
      `Promotional demo: ${randomName} could win ` +
      `${simulatedWin}/- (${randomNumber} Rocketie Coins) ` +
      `by staking 10/- and beating AI Ben!`;

    console.log("[ROCKETIE CRON] Forwarding notification.");
    console.log("[ROCKETIE CRON] Target:", `${BASE_URL}/AI_ben_earner`);

    try {
      // Forward the message to your existing push-notification endpoint.
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
        "[ROCKETIE CRON] AI endpoint HTTP status:",
        response.status
      );

      console.log(
        "[ROCKETIE CRON] AI endpoint response:",
        responseText
      );

      // Detect HTTP errors.
      if (!response.ok) {
        return res.status(502).json({
          success: false,
          message: "The AI Ben notification endpoint returned an HTTP error.",
          targetStatus: response.status,
          details: responseText.slice(0, 500)
        });
      }

      // Also detect an application-level failure returned as HTTP 200.
      let targetResult = null;

      try {
        targetResult = JSON.parse(responseText);
      } catch {
        // The target may return plain text rather than JSON.
      }

      if (
        targetResult &&
        (
          targetResult.success === false ||
          targetResult.ok === false
        )
      ) {
        return res.status(502).json({
          success: false,
          message: "The AI Ben endpoint reported a failure.",
          targetStatus: response.status,
          details: responseText.slice(0, 500)
        });
      }

      console.log(
        "[ROCKETIE CRON] Forwarding request completed."
      );

      return res.status(200).json({
        success: true,
        message: "The message was forwarded to the AI Ben endpoint.",
        targetStatus: response.status
      });

    } catch (error) {
      console.error(
        "[ROCKETIE CRON] Forwarding failed:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message: "Could not contact the AI Ben notification endpoint.",
        error: error.message
      });
    }
  });
};

module.exports = registerAutoNotificationRoutes;
