const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const TOKEN = `8612631410:AAFRV1PXbgLbSHd--QLGluUkNSN3Wwiko88`;
const CHAT_ID = '493566464';

app.post('/api/send', async (req,res)=>{
  const {name,phone,service,message} = req.body;

  const text = `
    📩 Новая заявка

    👤 Имя: ${name}
    📱 Телефон: ${phone}
    🛠 Услуга: ${service}
    💬 Сообщение: ${message}
  `;

  await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text: text
  });

  res.send({ok:true});
});

app.listen(3000);