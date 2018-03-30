const functions = require('firebase-functions')
const TelegramBot = require('node-telegram-bot-api')
const express = require('express')
const bodyParser = require('body-parser')
const fb = require('firebase')
require('firebase/firestore')

const AUTH = functions.config().bot.auth
const TOKEN = functions.config().bot.token

const config = {
    apiKey: "AIzaSyCOmVkbb3dMRN4kH-oJJfF0XoDXPkmTcxY",
    authDomain: "vue-faq-fb452.firebaseapp.com",
    databaseURL: "https://vue-faq-fb452.firebaseio.com",
    projectId: "vue-faq-fb452",
    storageBucket: "vue-faq-fb452.appspot.com",
    messagingSenderId: "372071045025",
}
fb.initializeApp(config)

fb.auth().signInWithCustomToken(AUTH)
const db = fb.firestore()


const bot = new TelegramBot(TOKEN)

//bot.setWebHook('https://us-central1-vue-faq-fb452.cloudfunctions.net/bot/' + TOKEN)

const div = '###'

bot.onText(/\/faq (.+)/, (msg, match) => {
    const resp = match[1]
    if (resp.indexOf(div) < 0)
        return
    const [question, answer] = resp.split(div)
    db.collection("questions").add({question, answer})
})


const app = express()
app.use(bodyParser.json())
app.post('/' + TOKEN, (req, res) => {
    bot.processUpdate(req.body)
    res.sendStatus(200)
})
exports.bot = functions.https.onRequest(app)