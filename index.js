const TelegramBot = require('node-telegram-bot-api')
const express = require('express')
const bodyParser = require('body-parser')
const fb = require('firebase')
require('firebase/firestore')


const PORT = process.env.PORT || 5000
const EMAIL = process.env.EMAIL
const PASS = process.env.PASS
const TOKEN = process.env.TOKEN

const config = {
    apiKey: "AIzaSyCOmVkbb3dMRN4kH-oJJfF0XoDXPkmTcxY",
    authDomain: "vue-faq-fb452.firebaseapp.com",
    databaseURL: "https://vue-faq-fb452.firebaseio.com",
    projectId: "vue-faq-fb452",
    storageBucket: "vue-faq-fb452.appspot.com",
    messagingSenderId: "372071045025",
}
fb.initializeApp(config)

fb.auth().signInWithEmailAndPassword(EMAIL, PASS)
const db = fb.firestore()


const bot = new TelegramBot(TOKEN)

bot.setWebHook('https://vuefaqbot.herokuapp.com/' + TOKEN)

const div = '###'

bot.onText(/\/addfaq(?:@vuefaqbot)?(.*)/, (msg, match) => {
    const resp = match[1]
    if (!resp.trim()) {
        bot.sendMessage(msg.chat.id, 'Что добавлять-то?')
        return
    }
    if (resp.indexOf(div) < 0) {
        bot.sendMessage(msg.chat.id, 'Три решётки обязательны!')
        return
    }
    const [question, answer] = resp.split(div)
    db.collection("questions").add({question, answer})
    bot.sendMessage(msg.chat.id, 'Добавлено!')
})


express()
    .use(bodyParser.json())
    .post('/' + TOKEN, (req, res) => {
        bot.processUpdate(req.body)
        res.sendStatus(200)
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))