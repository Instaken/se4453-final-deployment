const express = require('express');
const app = express();
const port = process.env.PORT || 2222;


app.get('/health', (req, res) => {
    res.status(200).send('OK');
});


app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`);
});