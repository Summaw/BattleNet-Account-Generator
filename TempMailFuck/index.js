const puppeteer = require('puppeteer')
    , fs = require('fs')

global.TMFFCB = () => {}

global.PDCTMF = ({
  args: ['--no-sandbox', '--disable-web-security'],
  headless: true,
  ignoreHTTPSErrors: true
})

global.SPDCTMF = ({ savePath: false })

const getFullMessage = (page, token, id) => async () => {
  const message = await page.evaluate(
    (token, id) => fetch(`https://web2.temp-mail.org/messages/${id}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'authorization': `Bearer ${token}`,
        'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36',
      }
    }).then(e => e.json())
  , token, id)

  return message
}

const getMessages = (page, token) => async () => {
  const { messages } = await page.evaluate(
    token => fetch('https://web2.temp-mail.org/messages', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'authorization': `Bearer ${token}`,
        'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36',
      }
    }).then(e => e.json())
  , token)



  return messages.map(message => ({
    ...message,
    getFullMessage: getFullMessage(page, token, message._id)
  }))
}

const messageController = (page, mailbox) => {
  const findMessage = async (callback = global.TMFFCB) => {
    const messages = await getMessages(page, mailbox.token)()

    const message = messages.find(message => callback(message))

    return {
      isFind: !!message,
      message
    }
  }

  return ({
    ...mailbox,
    isOk: !!(() => mailbox.token && mailbox.mailbox)(),
    getMessages: getMessages(page, mailbox.token),
    getMessagesInterval: async (callback = global.TMFFCB, ms = 30000) => {
      callback(await (getMessages(page, mailbox.token)()))
      return setInterval(async () => callback(await (getMessages(page, mailbox.token)())), ms)
    },
    killMessagesInterval: id => clearInterval(id),
    findMessage,
    findMessageInterval: async (callback1 = global.TMFFCB, callback2 = global.TMFFCB, ms = 30000) => {
      callback2(await findMessage(callback1))
      return setInterval(async () => callback2(await findMessage(callback1)), ms)
    },
  })
}

const TempMailFuck = async (saveConfig, puppeteerConfig) => {
  let _puppeteerConfig = puppeteerConfig
                          ? puppeteerConfig
                          : global.PDCTMF
    , _saveConfig = saveConfig.savePath ? saveConfig : global.SPDCTMF

  const browser = await puppeteer.launch(_puppeteerConfig)
      , page = await browser.newPage()

  await page.setRequestInterception(true)

  page.on('request', (request) => {
    const headers = request.headers();
    headers['sec-ch-ua'] = "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\"";
    headers['user-agent'] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4512.0 Safari/537.36"

    request.continue({ headers })
  });

  return {
    kill: () => browser.close(),
    createMailbox: async () => {
      const mailbox = await page.evaluate(
          () => fetch('https://web2.temp-mail.org/mailbox', {
            method: 'POST',
            headers: {
              'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36'
            }
          }).then(e => e.json())
      )

      if (_saveConfig.savePath) {
        let mailboxs = []
        try {
            mailboxs = JSON.parse(fs.readFileSync(_saveConfig.savePath, 'utf8'))
        } catch (e) {console.log(e)}
        //console.log(mailbox)
        mailboxs.push(mailbox)

        fs.writeFileSync(_saveConfig.savePath, JSON.stringify(mailboxs))
      }

      return messageController(page, mailbox)
    },
    getMailboxByMail: (mail = null) => {
      if (_saveConfig.savePath) {
        let mailboxs = []
        try {
            mailboxs = JSON.parse(fs.readFileSync(_saveConfig.savePath, 'utf8'))
        } catch (e) {}

        const mailbox = mailboxs.find(({ mailbox }) => mailbox === mail) || ({ token: null, mailbox: null })

        return messageController(page, mailbox)
      }

      return '/* not save path, read doc. */'
    },
    getMailboxByToken: (_token = null) => {
      if (_saveConfig.savePath) {
        let mailboxs = []
        try {
            mailboxs = JSON.parse(fs.readFileSync(_saveConfig.savePath, 'utf8'))
        } catch (e) {}

        const mailbox = mailboxs.find(({ token }) => token === _token) || ({ token: null, mailbox: null })

        return messageController(page, mailbox)
      }

      return '/* not save path, read doc. */'
    }
  }
}

module.exports = TempMailFuck
