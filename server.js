require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
const VALID_CODE = 'ab0103n';
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.get('/api/weather', async (req, res) => {
  const { code, lat, lon } = req.query;

  if (code !== VALID_CODE) {
    return res.status(403).json({ error: '❌ 無効なコードです' });
  }

  if (!lat || !lon) {
    return res.status(400).json({ error: '緯度・経度が必要です' });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=ja`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: '天気データの取得に失敗しました' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
