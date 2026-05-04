// JYA Nexus Global Backend - Vercel Serverless Function
export default async function handler(req, res) {
    const apiKey = process.env.WEATHER_API_KEY; 
    // الآن نستقبل اسم المدينة من المتصفح، وإذا لم توجد نستخدم 'London' كافتراضي عالمي
    const city = req.query.city || "London";

    if (!apiKey) {
        return res.status(500).json({ error: "API Key missing in Vercel settings" });
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
        res.status(500).json({ error: "Connection to global nodes failed" });
    }
}
