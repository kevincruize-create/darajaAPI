
const process = (app, room, type) => {

    const fetchData = async () => {
        try {

            const response = await fetch(
                "http://forexapi.atwebpages.com/Rocketie/Offers/Update_room_num.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        room,
                        type
                    })
                }
            );

            const data = await response.json();

            console.log("Room player update:", data);

            return data;

        } catch (error) {
            console.error("Update room players error:", error);
        }
    };

    return fetchData();
};

module.exports = process;
