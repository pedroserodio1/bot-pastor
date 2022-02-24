const { Client, Intents } = require('discord.js')
const CronJob = require('cron').CronJob
const axios = require('axios')
const { token } = require('../options.json')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.once('ready', ()=>{
    client.user.setPresence({
        activities:[{
            name: "Amém🙏",
            type: "PLAYING"
        }],
        status: "online"
    })

    console.log("Bot On");
})

var job = new CronJob('* */30 * * * *', async ()=>{
    
    const channel = client.channels.cache.get('917545574004301877')

    const verse = await verseRandom()

    console.log(verse.text);

    channel.send(`"*${verse.text}*"
    
            **${verse.book.abbrev.pt} ${verse.number}:${verse.chapter}**   `)
}, null, true, 'America/Sao_Paulo')

async function verseRandom(){

    const verse = await axios.get('https://www.abibliadigital.com.br/api/verses/nvi/random ')

    return verse.data;

}
   

client.login(token)