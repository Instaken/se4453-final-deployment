const express = require('express');
const { Client } = require('pg');
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const app = express();
const port = process.env.PORT || 2222;

// Azure Key Vault Bilgileri
const kvUrl = "https://keyv-project-kemalozan.vault.azure.net/";
const credential = new DefaultAzureCredential();
const secretClient = new SecretClient(kvUrl, credential);

// Health check endpoint for Azure Web App
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});


app.get('/hello', async (req, res) => {
    try {
        // Şifreyi Key Vault'tan çekiyoruz 
        const dbPasswordSecret = await secretClient.getSecret("db-password");
        const dbPassword = dbPasswordSecret.value;

        // PostgreSQL Bağlantısı
        const client = new Client({
            host: 'project-sql.postgres.database.azure.com',
            user: 'kemalozan',
            password: dbPassword,
            database: 'postgres',
            port: 5432,
            ssl: true
        });

        await client.connect();
        res.send("Merhaba Grup 12! Node.js ile Veritabanına ve Key Vault'a başarıyla bağlandık. Test1");
        await client.end();
    } catch (err) {
        res.status(500).send("Hata: " + err.message);
    }
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`);
});