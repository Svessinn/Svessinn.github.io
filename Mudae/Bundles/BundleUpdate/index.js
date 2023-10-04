const { Client } = require('discord.js-selfbot-v13');
const { self, mudae } = require('./config.json');
const bot = new Client({ checkUpdate: false });
const prefix = self.prefix[0]
const token = process.env.token;
const bot_master = process.env.ID;
const fs = require('fs')
// Keeping the program running
const keep_alive = require('./keep_alive.js');

function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

// Creating a logger
const winston = require("winston");
const logger = winston.createLogger({
  transports: [new winston.transports.Console(), new winston.transports.File({
    filename: 'log'
  }),],
  format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`)
});

// Function to pause all activity for a set amount of time
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
let dat = []
bot.on(`messageCreate`, async msg => {
  if (!self.channel_ids.includes(msg.channel.id)) { return; };

  if (msg.author.id == bot_master) {
    if (msg.content.startsWith(prefix)) {
      cmd = msg.content.slice(prefix.length, msg.content.length).trim()
      if (cmd == 'send') {
        data = fs.readFileSync("msgToSend.txt", "UTF-8")

        const lines = data.split(/\r?\n/)

        for (let line = 0; line < lines.length; line++) {
          await msg.channel.send(lines[line]);
          await sleep(3500);
        }
      }
    }
  }

  if (msg.author.id == mudae.id) {
    if (msg.embeds[0].author.name.includes('\n(bundle)')) {
      let emDat = msg.embeds[0];
      let siz = Number(emDat.author.name.split('\n')[0].split('/')[1])
      let types = []
      for (let i=0; i<4; i++) {
        types[i] = Number(types[i].slice(0, -4).trim())
      };
      let ali = []
      if (emDat.description.split('\n\n').length == 3){
        ali = emDat.description.split('\n\n')[0].split('\n')
        types = emDat.description.split('\n\n')[-2].slice(1, -1).split(', ')
      } else {
        types = emDat.description.split('\n\n')[0].slice(1, -1).split(', ')
      }
      dat.push({
        "Bundle": emDat.author.name.split('   ')[0].trim(),
        "Aliases": ali,
        "Size": siz,
        "wa": types[0],
        "ha": types[1],
        "wg": types[2],
        "hg": types[3],
        "wap": padDigits((100*(types[0])/siz).toFixed(2),6),
        "hap": padDigits((100*(types[1])/siz).toFixed(2),6),
        "wgp": padDigits((100*(types[2])/siz).toFixed(2),6),
        "hgp": padDigits((100*(types[3])/siz).toFixed(2),6)
      })
      fs.writeFile('out.json', JSON.stringify(dat), function(err) {
        if (err) throw err;
      })
    }
  }
});

// On startup
bot.on('ready', async () => {
  bot.user.setPresence({ status: 'invisible' });
  logger.log('info', 'The bot is online!')
  console.log(`[USER]: ${bot.user.tag}\n[PREFIX]: ${prefix}\n`);
});

// discord.js error logging
bot.on('debug', m => logger.log('debug', m));
bot.on('warn', m => logger.log('warn', m));
bot.on('error', m => logger.log('error', m));

// Logging into the bot / Turning the bot on
bot.login(token);
