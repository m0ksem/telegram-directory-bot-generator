import { config as loadDotEnv } from 'dotenv'
import { Bot } from 'bot'

loadDotEnv({ path: './.env.development' })
const vetrybotToken = process.env.VETRYBOT_TOKEN;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const configMessages = require('./config/messages.json');
const configSettings = require('./config/settings.json');

const bot = new Bot(process.env.BOT_TOKEN as string, { messages: configMessages, settings: configSettings })

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/vetrybot', (req, res) => {
    if(vetrybotToken == req.body['token']){
        
        bot.updateConfig({ messages: [], settings: bot.config.settings })
        // Restart bot with new config: JSON.parse(req.body['config'])
    }
    res.sendStatus(200);
});

app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));
