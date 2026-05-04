// JYA Nexus Backend Proxy - Supports City Search & Coordinates
export default async function handler(req, res) {
    const apiKey = process.env.WEATHER_API_KEY; 
    const { city, lat, lon } = req.query;

    if (!apiKey) {
        return res.status(500).json({ error: "Missing API Key" });
    }

    try {
        let url;
        // التحقق مما إذا كان الطلب بالإحداثيات (الضغط على الخريطة) أو بالاسم (البحث)
        if (lat && lon) {
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        } else {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city || "Samawah")}&units=metric&appid=${apiKey}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            return res.status(data.cod).json({ error: data.message });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Node Connection Failed" });
    }
}
