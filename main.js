const puppeteer = require('puppeteer-extra');
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const clc = require("cli-color");
const fs = require('fs');
const TempMailFuck = require('temp-mail-fuck');
const passwords = require('secure-random-password');
const gradient = require('gradient-string');
const setTitle = require('node-bash-title');
const config = require('./config.json')
const randomname = require('random-name')
puppeteer.use(StealthPlugin());

generated = 0;
errorss = 0;
captchas = 0;
totalreq = 0;

function sleep(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function getmail() {
    const tmf = await TempMailFuck({
        savePath: __dirname + '/myMailBox.json'
    })

  const mailbox = await tmf.createMailbox()
    setTimeout(() => {
      tmf.kill()
     }, 60000 * 10)
    return mailbox['mailbox']
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function logo() {
  console.log(gradient.retro(`
  ▄▄▄▄·  ▄▄▄·▄▄▄▄▄▄▄▄▄▄▄▌  ▄▄▄ . ▐ ▄ ▄▄▄ .▄▄▄▄▄     ▄▄ • ▄▄▄ . ▐ ▄ 
  ▐█ ▀█▪▐█ ▀█•██ •██  ██•  ▀▄.▀·•█▌▐█▀▄.▀·•██      ▐█ ▀ ▪▀▄.▀·•█▌▐█
  ▐█▀▀█▄▄█▀▀█ ▐█.▪▐█.▪██▪  ▐▀▀▪▄▐█▐▐▌▐▀▀▪▄ ▐█.▪    ▄█ ▀█▄▐▀▀▪▄▐█▐▐▌
  ██▄▪▐█▐█ ▪▐▌▐█▌·▐█▌·▐█▌▐▌▐█▄▄▌██▐█▌▐█▄▄▌ ▐█▌·    ▐█▄▪▐█▐█▄▄▌██▐█▌
  ·▀▀▀▀  ▀  ▀ ▀▀▀ ▀▀▀ .▀▀▀  ▀▀▀ ▀▀ █▪ ▀▀▀  ▀▀▀     ·▀▀▀▀  ▀▀▀ ▀▀ █▪
                        Made By Summaw
  `))
}

async function logocli() {
  console.log(clc.greenBright(`[+] Generated: ${generated}`))
  console.log(clc.yellowBright(`[+] Captchas Solved: ${captchas}`))
  console.log(clc.cyanBright(`[+] Total Requests: ${totalreq}`))
  console.log(clc.redBright(`[+] Errors: ${errorss}`))
}


async function main() {
    setTitle(`Battle.net Account Generator | Generated: ${generated} | Solved Captchas: ${captchas} | Total Req: ${totalreq} | Errors: ${errorss}`)
    logo();
    logocli();
    await puppeteer
    .launch({
      headless: false,
      ignoreHTTPSErrors: true,
      args: [
        `--proxy-server=${config['proxyurl']}`,
        `--load-extension=${__dirname + "/better"}`,
      ],
      executablePath:
        "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    })
    .then(async (browser) => {
      const email = await getmail();
      const password = passwords.randomPassword({ characters: passwords.lower + passwords.upper + passwords.digits })
      const proxysum = getRandomInt(6);
      const firstname = randomname.first();
      const lastname = randomname.last();
      try{
      var page = await browser.newPage()
      await page.authenticate({ username: config['proxy_user'], password: config['proxy_pass']})
      await sleep(3000)
      await page.goto('chrome-extension://dknlfmjaanfblgfdfebhijalfmhmjjjo/popup.html')
      await page.type('#key', config['solver_key'])
      await page.goto('https://account.battle.net/creation/flow/creation-full', {timeout: 60 * 1000}) //waitUntil: "networkidle0",
      await page.waitForSelector('#dob-field-inactive > input.step__input', {timeout: 10 * 1000})
      await page.type('#dob-field-inactive > input.step__input', '05031999')
      await page.click('#flow-form-submit-btn')
      await page.waitForSelector('#capture-first-name', {timeout: 300 * 1000})
      await page.type('#capture-first-name', firstname)
      await page.type('#capture-last-name', lastname)
      await page.click('#flow-form-submit-btn')
      await page.waitForSelector('#capture-email', {timeout: 300 * 1000})
      await page.type('#capture-email', email)
      await page.click('#flow-form-submit-btn')
      await page.waitForSelector('#legal-checkboxes > label > input.step__checkbox', {timeout: 5 * 1000})
      await page.evaluate(() => {
          return document.querySelector('#legal-checkboxes > label').click();
        })
      await page.click('#flow-form-submit-btn')
      await page.waitForSelector('#capture-password', {timeout: 5 * 1000})
      await page.type('#capture-password', password)
      await page.click('#flow-form-submit-btn')
      // const page3 = (await browser.pages())[0];
      // await page3.bringToFront();
      // await page3.waitForSelector('body > div > div.content > table > tbody > tr:nth-child(1) > td:nth-child(2) > input[type=text]', {timeout: 5 * 1000})
      // await page3.type('body > div > div.content > table > tbody > tr:nth-child(1) > td:nth-child(2) > input[type=text]', config['2captcha_key'])
      // await page3.click('#connect')
      // page3.on('dialog', async dialog => {
      //   await dialog.dismiss()
      //  })
      // await page3.click('#autoSubmitForms')
      // await page3.evaluate(() => {
      //   return document.querySelector('#config-form > div:nth-child(2) > table > tbody > tr:nth-child(3) > td > div:nth-child(2) > div.custom-select-label').click();
      // })
      // await page3.evaluate(() => {
      //   return document.querySelector('#config-form > div:nth-child(2) > table > tbody > tr:nth-child(3) > td > div.custom-select.open > div.custom-select-dropdown > div > div:nth-child(3)').click();
      // })
      // await page3.click('#autoSolveNormal')
      // await page3.click('#enabledForRecaptchaV2')
      // await page3.click('#enabledForInvisibleRecaptchaV2')
      // await page3.click('#enabledForRecaptchaV3')
      // await page3.click('#enabledForHCaptcha')
      // await page3.click('#enabledForGeetest')
      // await page3.click('#enabledForKeycaptcha')
      // await page3.click('#autoSolveArkoselabs')
      // await page3.close();
      await sleep(2000)
      await page.waitForSelector('#capture-battletag', {timeout: 5 * 1000})
      await page.click('#flow-form-submit-btn')
      try {
        //await page.waitForSelector('input[name="fc-token"]', {timeout: 10 * 1000})
        await page.evaluate(() => {
          return document.querySelector("input[name='fc-token']");
        })
          captchas += 1;
          console.log(clc.yellowBright('[!] Captcha Detected'))
          console.log(clc.greenBright('[+] Captcha is being solved'))
      } catch (error) {}
      try{
        await page.waitForSelector('#content-root > p.step__banner--account-identifier.step__block', {timeout: 80 * 1000})
        let successmessage = await page.evaluate(() => {
            return document.querySelector('#content-root > p.step__banner--account-identifier.step__block').innerText;
        })
        if (successmessage == email) {
        console.log(clc.greenBright(`[+] Created: ${email}:${password}`))
        generated += 1;
        totalreq += 1;
        const content = `${email}:${password}\n`;
        fs.appendFile('created.txt', content, err => {
          if (err) {
            console.log(clc.red("[!] Error saving good account to file."))
            main();
            return
          }
        })
        await browser.close();
        console.clear();
        main();
      }
      } catch (error) {
        console.log('[!] Error:'+ error)
        errorss += 1;
        totalreq += 1;
        await browser.close();
        console.clear();
        main();
      }
    } catch (e) {
        console.clear();
        totalreq += 1;
        errorss += 1;
        await browser.close();
        main();
    }
    })
}

for (i = 0; i < config['threads']; i++) {
  main();
}