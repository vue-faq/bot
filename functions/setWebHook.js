const TelegramBot = require('node-telegram-bot-api')
const admin = require('firebase-admin')
const serviceAccount = require("/home/joe/work/serviceAccKey.json")

const config = {
    apiKey: "AIzaSyCOmVkbb3dMRN4kH-oJJfF0XoDXPkmTcxY",
    authDomain: "vue-faq-fb452.firebaseapp.com",
    databaseURL: "https://vue-faq-fb452.firebaseio.com",
    projectId: "vue-faq-fb452",
    storageBucket: "vue-faq-fb452.appspot.com",
    messagingSenderId: "372071045025",

    credential: admin.credential.cert(serviceAccount),
}

const TOKEN = process.env.TOKEN

const bot = new TelegramBot(TOKEN)

bot.setWebHook(`https://us-central1-${config.projectId}.cloudfunctions.net/bot/${TOKEN}`)

const uid = "bot"

admin.initializeApp(config)
admin.auth().createCustomToken(uid)
    .then(function(customToken) {
        console.log(customToken)
    })
    .catch(function(error) {
        console.log("Error creating custom token:", error);
    })