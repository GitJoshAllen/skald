const All = (bot, channelID) => {
    bot.sendMessage({
        to: channelID,
        message: 'I\'d love to help! For prices type $ + price | stonks | stalks | stocks \n' +
        'To add your current purchase or sale price do the above command plus the price: $price 45 \n' +
        'To rename your island use this command: $island Cherry (this would rename your island to Cherry!) \n' +
        'To add your dodo code just use: $dodo bacon (this would make your dodo code bacon! Please do eat bacon :cry: \n' +
        'To Open or Close your port just do this: $port open (this will open your port :airplane:) \n' +
        'To Set your TimeZone use: $timezone America/Chicago'
    });
}

exports.All = All;