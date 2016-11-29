# Botkit bCRM Middleware

This Botkit plugin enables support for [bCRM](https://bcrm.com?ref=botkit-middleware-bcrm), a customer
CRM tool that enables bot developers to send broadcast messages to users of their bot.

This plugin currently works with Slack and Facebook bots.

## Install it
```
npm install --save botkit-middleware-bcrm
```

## Enable Your Bot

1. [Create a bCRM account](https://bcrm.com?ref=botkit-middleware-bcrm) and get your bCRM `token` and bCRM `bot id`.

2. Add the following lines to your Botkit application:

```
require('botkit-middleware-bcrm')({
    bcrm_token: 'my_bcrm_token',
    bcrm_bot: 'my_bcrm_bot',
    controller: controller    
});
```

3. To register new users with bCRM:

If using Slack, register a new team with your bot's application via the oauth flow.

If using Facebook, click the "Get Started" or any other button that fires a postback or optin event.

## Security Note

In order to provide its service, this plugin sends information to bCRM that allows
the bCRM software to access information and send messages on behalf of your bot.
Before using this plugin, [read bCRM's privacy policy](https://bcrm.com/privacy),
and make sure your own policies reflect the fact that you share information with them.
