const All = (bot, channelID) => {
    bot.sendMessage({
        to: channelID,
        message: 'I\'d love to help! For prices type $ + price | stonks | stalks | stocks \n' +
        'To add your current purchase or sale price do the above command plus the price: $price 45'
    });
}

exports.All = All;