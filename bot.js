const {Client, Intents} = require('discord.js')
const logger = require('winston')
const auth = require('./auth.json')
const fplApi = require('fpl-api')
const sleep = require('atomic-sleep')

logger.remove(logger.transports.Console)
logger.add(new logger.transports.Console, {colorize: true})
logger.level = 'debug'

// init bot
const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});

bot.on('ready', () => {
    console.log(`Bot ${bot.user.tag} is logged in!`)
});

bot.login(auth.token)

var sleepLength = 86400000 //1 day in ms
var gameWeek = 12 //set gameweek cause no endpoint for current gameweek
var x = true

while (X) {
    fixtureChecker()
}

bot.on('messageCreate', (message) => {
    if(message.content.toLowerCase().includes('!#setchannel')){
        var channel = message.channel.id
        message.channel.send(channel)
    }
});

function fixtureChecker(gameWeek){
    var today = new Date()
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    console.log("Checking fixtures for date - " + date + ".")
    
    fplApi.fetchFixtures(gameWeek)
    .then((fixtures) => {
        for (let i = 0; i < fixtures.length; i++){ //loop through all Premier League fixtures
            var obj = fixtures[i]
            var kickoffTime = obj.kickoff_time.substring(0, 10)
            console.log(kickoffTime + " - " + date)
            if( (obj.team_a || obj.team_b === 5) && (kickoffTime === date)){ // check if chelsea is playing - 5 = chelsea team ID
                console.log("Fixture is today today, posting ngolo to channel - " + channel + ".")
                ngoloPoster() //post ngolo in channel
                gameWeek++ //prepare for next gameweek
                console.log("Sleeping for: " + sleepLength + " ms.")
                sleep(sleepLength)
            }
        }
    })

}

function ngoloPoster() {
    bot.sendMessage({
        to: channel,
        message: 'https://cdn.discordapp.com/attachments/888565452526211125/918473822263476284/redditsave.com_ladies_and_gentlemen_its_matchday-16xgfzj9k9481.mp4'
    });
}





