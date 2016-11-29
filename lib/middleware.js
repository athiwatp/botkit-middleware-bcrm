var request = require('request');

module.exports = function(config) {

    if (!config.bcrm_token) {
        throw new Error('Please specify bcrm_token in bcrm middleware');
    }

    if (!config.bcrm_bot) {
        throw new Error('Please specify bcrm_bot in bcrm middleware');
    }

    if (!config.controller) {
        throw new Error('Please pass in your Botkit controller');
    }

    var middleware = {};

    // handle event when a new Slack team joins
    config.controller.on('create_team', function(bot, team) {
        registerWithBCRM(bot, team);
    });

    // handle event when a Facebook user first opts in
    config.controller.on('facebook_optin', function(bot, message) {
        registerWithBCRM(bot, message);
    });

    // handle event when a Facebook user clicks a button
    config.controller.on('facebook_postback', function(bot, message) {
        registerWithBCRM(bot, message);
    });


    function registerWithBCRM(bot, account) {
        var options = {};
        if (bot.type == 'slack') {

            // this is a slack team without a bot integration
            if (!account.bot) {
                return;
            }
            var options = {
                url: "https://bcrm.com/register/slack/bot/" + config.bcrm_bot,
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": config.bcrm_token
                },
                body: JSON.stringify({
                    "id": account.bot.user_id,
                    "token": account.bot.token
                })
            };
        } else if (bot.type == 'fb') {
            var options = {
                url: "https://bcrm.com/register/messenger/bot/" + config.bcrm_bot,
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": config.bcrm_token
                },
                body: JSON.stringify({
                    "id": team.user,
                    "token": bot.botkit.config.access_token
                })
            };
        } else {
            return;
        }
        console.log('REGISTER WITH BCRM', options);

        request(options, function(error, response, body) {
            if (error) {
                console.error('ERROR in botkit-middleware-bcrm API call:', error);
            } else {
                console.log('REGISTERED WITH BCRM');
                console.log(body);
            }
        });
    }

}
