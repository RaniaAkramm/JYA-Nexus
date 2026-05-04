// JYA Nexus Backend Proxy for Vercel
export default async function handler(req, res) {
    // جلب المفتاح السري من خزنة Vercel
    const apiKey = process.env.WEATHER_API_KEY; 
    const city = req.query.city || "Samawah";

    if (!apiKey) {
        return res.status(500).json({ error: "Missing API Key in Vercel. Please add WEATHER_API_KEY to Environment Variables." });
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            return res.status(data.cod).json({ error: data.message });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error: Could not connect to data nodes." });
    }
}
