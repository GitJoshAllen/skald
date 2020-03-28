const All = (bot, channelID) => {
    bot.sendMessage({
        to: channelID,
        message: 'For prices type $ + price | stonks | stalks | stalnks | tendies'
    });
}

exports.All = All;