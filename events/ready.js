const chalk = require('chalk')
const moment = require('moment')
const kanal = '742043139430285454'
const log = message => {
  
    console.log(`${chalk.white(moment().format('YYYY-MM h:mm:ss'))} ${message}`)
}

module.exports = async client => {
    client.user.setPresence({activity:{name:`Levian`},status: 'online'})
  } 