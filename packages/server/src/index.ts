import { config as loadDotEnv } from 'dotenv'

loadDotEnv({ path: './.env.development' })
const vetrybotToken = process.env.VETRYBOT_TOKEN;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/vetrybot', (req, res) => {
    if(vetrybotToken == req.body['token']){
        
        // Restart bot with new config: JSON.parse(req.body['config'])
    }
    res.sendStatus(200);
});

app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));
