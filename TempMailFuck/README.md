![logo](https://github.com/prohetamine/temp-mail-fuck/blob/main/media/logo.png)

##### README is available in the following languages: [Russian](https://github.com/prohetamine/temp-mail-fuck/blob/main/README/russian.md) | [English](https://github.com/prohetamine/temp-mail-fuck/blob/main/README.md)


# Temp Mail Fuck

> temp-mail-fuck - Your best friend in the world of email.

### Why ?
I am a very poor person, there are 14 people in my family and they are also poor can you imagine ? And my grandmother is generally 88 years old. We just can't afford to pay$ 19 for a fucking 1000 requests per month for some one-time mail. And what if really want to ? we accidentally noticed that, the most fashionable [Cloudflare](/media/Cloudflare.jpg) skips all the main api requests and decided to [use it](https://github.com/prohetamine/temp-mail-fuck#readme), [thank you](https://temp-mail.org/) for this opportunity, now my [family](https://www.npmjs.com/package/temp-mail-fuck) eats mailboxes! I hope my contribution will make it easier for someone [life](https://www.patreon.com/prohetamine).

### Get started

Install the npm module ```temp-mail-fuck```

```sh
$ npm install temp-mail-fuck
```

or

```sh
$ yarn add temp-mail-fuck
```

or

```sh
$ npm install https://github.com/prohetamine/temp-mail-fuck
```

### Examples and description

Connecting the module

```javascript
const TempMailFuck = require('temp-mail-fuck')
```

#### <a name="entempmailfuck">TempMailFuck</a>

The function [TempMailFuck](#entempmailfuck) initializes the connection to Puppeteer takes two optional parameters, two objects and returns an object with the functions: [kill](#enkill), [createMailbox](#encreatemailbox), [getMailboxByMail](#engetmailboxbymail), [getMailboxByToken](#engetmailboxbytoken). Don't forget to kill the Puppeteer process if you don't use the module with [kill](#kill).

##### object

| key | value | default value | mandatory | information |
| ------ | ------ | ------ | ------ | ------ |
| savePath | string | global.SPDCTMF | none | is used as a path for saving the post token |

##### object2

| key | value | default value | required | information|
| ------ | ------ | ------ | ------ | ------ |
| any available Puppeteer | none-type | global.PDCTMF | none | is used to configure the Puppeteer launcher |

```javascript
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  // await TempMailFuck() or

  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  }, {
    headless: true,
    ignoreHTTPSErrors: true,
    executablePath: '/usr/bin/chromium-browser', // your way to puppeteer
    args: ['--disable-web-security', '--no-sandbox', '--disable-setuid-sandbox'],
  })

  console.log(tmf)

  /* {
    kill: [Function: kill],
    createMailbox: [AsyncFunction: createMailbox],
    getMailboxByMail: [Function: getMailboxByMail],
    getMailboxByToken: [Function: getMailboxByToken]
  } */

  setTimeout(() => {
    tmf.kill() // Kills the puppeteer process
  }, 60000 * 10)
})()
```

#### <a name="encreatemailbox">createMailbox</a>

The [createMailbox](#encreatemailbox) function creates a new mailbox, you can interact with it through the functions [getMessages](#engetmessages), [getMessagesInterval](#engetmessagesinterval), [findMessage](#enfindmessage), [findMessageInterval](#enfindmessageinterval), [killMessagesInterval](#enkillmessagesinterval).

```javascript
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  const mailbox = await tmf.createMailbox()

  console.log(mailbox)

  /* {
    token: 'eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU',
    mailbox: 'mesixa5696@obxstorm.com',
    isOk: true,
    getMessages: [AsyncFunction (anonymous)],
    getMessagesInterval: [AsyncFunction: getMessagesInterval],
    killMessagesInterval: [Function: killMessagesInterval],
    findMessage: [AsyncFunction: findMessage],
    findMessageInterval: [AsyncFunction: findMessageInterval]
  } */

  if (mailbox.isOk) {
    // the mailbox was created successfully, so it can be used
    const id = await mailbox.findMessageInterval(
      ({ from, subject, bodyPreview }) => from.match(/prohetamine/gi),
      message => {
        if (message.isFind) {
          console.log(message)

        }
      },
      5000
    )

    return setTimeout(() => {
      mailbox.killMessagesInterval(id)
      tmf.kill()
    }, 60000)
  } else {
    // something went wrong...
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="engetmailboxbymail">getMailboxByMail</a>

The function [getMailboxByMail](#engetmailboxbymail) searches for a mailbox by mail passed by the first parameter, you can interact with it through the functions [getMessages](#engetmessages), [getMessagesInterval](#engetmessagesinterval), [findMessage](#enfindmessage), [findMessageInterval](#enfindmessageinterval), [killMessagesInterval](#enkillmessagesinterval).

> getMailboxByMail - available only when there is a savePath.

| parameters | default value | information|
| ------ | ------ | ------ |
| string | null | message search key |

```javascript
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  const mailbox = await tmf.getMailboxByMail('mesixa5696@obxstorm.com')

  console.log(mailbox)

  /* {
    token: null,
    mailbox: null,
    isOk: false,
    getMessages: [AsyncFunction (anonymous)],
    getMessagesInterval: [AsyncFunction: getMessagesInterval],
    killMessagesInterval: [Function: killMessagesInterval],
    findMessage: [AsyncFunction: findMessage],
    findMessageInterval: [AsyncFunction: findMessageInterval]
  } */

  if (mailbox.isOk) {
    // the mailbox was created successfully, so it can be used
    const messages = await mailbox.getMessages()
    console.log(await messages[0].getFullMessage())
  } else {
    // something went wrong...
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="engetmailboxbytoken">getMailboxByToken</a>

The function [getMailboxByToken](#engetmailboxbytoken) searches for a mailbox by the token passed by the first parameter, you can interact with it through the functions [getMessages](#engetmessages), [getMessagesInterval](#engetmessagesinterval), [findMessage](#enfindmessage), [findMessageInterval](#enfindmessageinterval), [killMessagesInterval](#enkillmessagesinterval).

> getMailboxByMail - available only when there is a savePath.

| parameters | default value | information|
| ------ | ------ | ------ |
| string | null | message search key |

```javascript
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU')

  console.log(mailbox)

  /* {
    token: null,
    mailbox: null,
    isOk: false,
    getMessages: [AsyncFunction (anonymous)],
    getMessagesInterval: [AsyncFunction: getMessagesInterval],
    killMessagesInterval: [Function: killMessagesInterval],
    findMessage: [AsyncFunction: findMessage],
    findMessageInterval: [AsyncFunction: findMessageInterval]
  } */

  if (mailbox.isOk) {
    // the mailbox was created successfully, so it can be used
    const messages = await mailbox.getMessages()
    console.log(await messages[0].getFullMessage())
  } else {
    // something went wrong...
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="enkill">kill</a>

The [kill](#kill) function kills the Puppeteer process and finishes [TempMailFuck](#entempmailfuck).

```javascript
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck()

  // your actions

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="engetmessages">getMessages</a>

The [getMessage](#engetmessages) function returns an array of emails, each of which contains only a preliminary message and the getFullMessage function that can be used to get the full message. It does not accept anything as parameters.

```javascript
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  //const mailbox = await tmf.createMailbox()
  const mailbox = await tmf.getMailboxByMail('rokanod348@biohorta.com')
  //const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU')

  console.log(mailbox.mailbox) // rokanod348@biohorta.com

  if (mailbox.isOk) {
    const messages = await mailbox.getMessages()

    console.log(messages)

  /* [
      {
        _id: '6104961ed1a97500a1c32d52',
        receivedAt: 1627690527,
        from: 'Stas Prohetamine <prohetamine@gmail.com>',
        subject: null,
        bodyPreview: ' Привет бедный человек ',
        attachmentsCount: 0,
        getFullMessage: [AsyncFunction (anonymous)]
      }
    ] */

    if (messages.length > 0) {
      console.log(await messages[0].getFullMessage())

    /* {
        _id: '6104961ed1a97500a1c32d52',
        receivedAt: 1627690527,
        user: '46df74731e18464c89d55b2972669556',
        mailbox: 'rokanod348@biohorta.com',
        from: 'Stas Prohetamine <prohetamine@gmail.com>',
        subject: null,
        bodyPreview: ' Привет бедный человек ',
        bodyHtml: '<div dir="ltr">Привет бедный человек</div>\n',
        attachmentsCount: 0,
        attachments: [],
        createdAt: '2021-07-31T00:15:26.712Z'
      } */
    }
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="engetmessagesinterval">getMessagesInterval</a>

The [getMessagesInterval](#engetmessagesinterval) function returns an array of messages via callback with an interval of _N milliseconds, each of which contains only a preliminary message and the getFullMessage function that can be used to get the full message. As parameters, it takes callback as the first and only parameter to which it transmits messages, and takes the interval time in milliseconds as the second parameter.

| parameters | default value | information|
| ------ | ------ | ------ |
| function | global.TMFFCB | callback function with an argument in the form of an array of letters |
| number | 30000 | interval time in milliseconds |

```javascript
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  //const mailbox = await tmf.createMailbox()
  const mailbox = await tmf.getMailboxByMail('rokanod348@biohorta.com')
  //const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU')

  console.log(mailbox.mailbox) // rokanod348@biohorta.com

  if (mailbox.isOk) {
    const id = await mailbox.getMessagesInterval(async messages => {
      console.log(messages)

      /* [
        {
          _id: '6104961ed1a97500a1c32d52',
          receivedAt: 1627690527,
          from: 'Stas Prohetamine <prohetamine@gmail.com>',
          subject: null,
          bodyPreview: ' Привет бедный человек ',
          attachmentsCount: 0,
          getFullMessage: [AsyncFunction (anonymous)]
        }
      ] */

      if (messages.length > 0) {
        console.log(await messages[0].getFullMessage())

      /* {
          _id: '6104961ed1a97500a1c32d52',
          receivedAt: 1627690527,
          user: '46df74731e18464c89d55b2972669556',
          mailbox: 'rokanod348@biohorta.com',
          from: 'Stas Prohetamine <prohetamine@gmail.com>',
          subject: null,
          bodyPreview: ' Привет бедный человек ',
          bodyHtml: '<div dir="ltr">Привет бедный человек</div>\n',
          attachmentsCount: 0,
          attachments: [],
          createdAt: '2021-07-31T00:15:26.712Z'
        } */
      }
    }, 5000)
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="enfindmessage">findMessage</a>

The [findMessage](#enfindmessage) function returns the found message using the built-in callback filter of matches. In a successfully found email, there is only a preliminary message and the getFullMessage function that can be used to get the full message. It takes the callback function of the filter as parameters and passes the object of the preliminary message as the first and only parameter.

| parameters | default value | information|
| ------ | ------ | ------ |
| function | global.TMFFCB | callback function with arguments in the form of keys of the preliminary letter object |

```javascript
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  //const mailbox = await tmf.createMailbox()
  const mailbox = await tmf.getMailboxByMail('rokanod348@biohorta.com')
  //const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU')

  console.log(mailbox.mailbox) // rokanod348@biohorta.com

  if (mailbox.isOk) {
    const prohetamine = await mailbox.findMessage(({ from, subject, bodyPreview }) => from.match(/prohetamine/gi))

    console.log(prohetamine)

    /* {
      isFind: true,
      message: {
        _id: '6104961ed1a97500a1c32d52',
        receivedAt: 1627690527,
        from: 'Stas Prohetamine <prohetamine@gmail.com>',
        subject: null,
        bodyPreview: ' Привет бедный человек ',
        attachmentsCount: 0,
        getFullMessage: [AsyncFunction (anonymous)]
      }
    } */

    if (prohetamine.isFind) {
      console.log(await prohetamine.message.getFullMessage())

      /* {
        _id: '6104961ed1a97500a1c32d52',
        receivedAt: 1627690527,
        user: '46df74731e18464c89d55b2972669556',
        mailbox: 'rokanod348@biohorta.com',
        from: 'Stas Prohetamine <prohetamine@gmail.com>',
        subject: null,
        bodyPreview: ' Привет бедный человек ',
        bodyHtml: '<div dir="ltr">Привет бедный человек</div>\n',
        attachmentsCount: 0,
        attachments: [],
        createdAt: '2021-07-31T00:15:26.712Z'
      } */
    }
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="enfindmessageinterval">findMessageInterval</a>

The [findMessageInterval](#enfindmessageinterval) function returns the found message to callback2 using the built-in callback1 match filter with an interval of _N milliseconds. In a successfully found email, there is only a preliminary message and the getFullMessage function that can be used to get the full message. It takes the callback function of the filter as parameters and passes the object of the preliminary message as the first and only parameter.

| parameters | default value | information|
| ------ | ------ | ------ |
| function | global.TMFFCB | callback function with arguments in the form of keys of the preliminary letter object |
| function | global.TMFFCB | callback function with an argument in the form of an array of letters |
| number | 30000 | interval time in milliseconds |

```javascript
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  //const mailbox = await tmf.createMailbox()
  const mailbox = await tmf.getMailboxByMail('rokanod348@biohorta.com')
  //const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU')

  console.log(mailbox.mailbox) // rokanod348@biohorta.com

  if (mailbox.isOk) {
    const id = await mailbox.findMessageInterval(
      ({ from, subject, bodyPreview }) => from.match(/prohetamine/gi),
      async _message => {
        console.log(_message)

        /* {
          isFind: true,
          message: {
            _id: '6104961ed1a97500a1c32d52',
            receivedAt: 1627690527,
            from: 'Stas Prohetamine <prohetamine@gmail.com>',
            subject: null,
            bodyPreview: ' Привет бедный человек ',
            attachmentsCount: 0,
            getFullMessage: [AsyncFunction (anonymous)]
          }
        } */

        const { message, isFind } = _message

        if (isFind) {
          console.log(await message.getFullMessage())

          /* {
            _id: '6104961ed1a97500a1c32d52',
            receivedAt: 1627690527,
            user: '46df74731e18464c89d55b2972669556',
            mailbox: 'rokanod348@biohorta.com',
            from: 'Stas Prohetamine <prohetamine@gmail.com>',
            subject: null,
            bodyPreview: ' Привет бедный человек ',
            bodyHtml: '<div dir="ltr">Привет бедный человек</div>\n',
            attachmentsCount: 0,
            attachments: [],
            createdAt: '2021-07-31T00:15:26.712Z'
          } */
        }
      },
      5000
    )

    // mailbox.killMessagesInterval(id) // kills the interval
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="enfindmessageinterval">clearMessagesInterval</a>

The function [clearMessagesInterval](#enkillmessagesinterval) kills either of the intervals [findMessageInterval](#enfindmessageinterval) or [getMessagesInterval](#engetmessagesinterval). Accepts the interval ID as parameters.

| parameters | default value | information|
| ------ | ------ | ------ |
| id | null | interval id |

```javascript
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  const mailbox = await tmf.createMailbox()

  if (mailbox.isOk) {
    const id = await mailbox.getMessagesInterval(async messages => {
      console.log(messages)
    }, 5000)

    setTimeout(() => {
      mailbox.killMessagesInterval(id) // kills the interval
    }, 30000)
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

### Contacts

My Telegram: [@prohetamine](https://t.me/prohetamine), [channel](https://t.me/prohetamines)

Email: prohetamine@gmail.com

Donat money: [patreon](https://www.patreon.com/prohetamine)

If you have any questions and/or suggestions, please email me in telegram, if you find any bugs also let me know, I will be very grateful.
