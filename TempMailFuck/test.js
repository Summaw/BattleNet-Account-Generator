const TempMailFuck = require('./index.js')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  //console.log(tmf)

  //const mailbox = await tmf.createMailbox()
  const mailbox = await tmf.getMailboxByMail('rokanod348@biohorta.com')
  //const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjk5ZjZiZjRiZjViNGE5NTlkYTY3Mjc4ZjU0ZTFjODQiLCJtYWlsYm94Ijoid29sZXkyOTAwNkBzcGlud2luZHMuY29tIiwiaWF0IjoxNjI3NjQ0NDc1fQ.KYs-e0V5znjOwmD4Yoq0ysDz_u1N24-t5oI8HFxLhz8')

  console.log(mailbox)

  //console.log(mailbox.isOk)

  if (mailbox.isOk) {
    //console.log(await messages[0].getFullMessage())

    /*const id = await mailbox.getMessagesInterval(async messages => {
      console.log(await messages[0].getFullMessage())
    }, 5000)*/

    //mailbox.killMessagesInterval(id)

    /*const prohetamine = await mailbox.findMessage(({ from, subject, bodyPreview }) => from.match(/prohetamine/gi))

    console.log(prohetamine)

    if (prohetamine.isFind) {
      console.log(await prohetamine.message.getFullMessage())
    }*/

    const id = await mailbox.findMessageInterval(
      ({ from, subject, bodyPreview }) => from.match(/prohetamine/gi),
      async _message => {
        console.log(_message)

        const { message, isFind } = _message

        if (isFind) {
          console.log(await message.getFullMessage())
        }
      },
      5000
    )

    //mailbox.killMessagesInterval(id)
  }

  //tmf.kill()
})()
