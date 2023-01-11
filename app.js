const chalk = require('chalk')
const express = require('express')
const fs = require('fs')
const { axiosClient } = require('./src/axiosHelpers')
const app = express()
app.use(express.urlencoded({ extended: true }))
const f = require('./config/config')
try {
    console.log('reading JSON')
    var jsonsp = require('./spec.json')
} catch (error) {
    console.log('no existing Access Token')
}


app.get('/token', async (req, res) => {
    console.log(req.query)

    try {

        var options = {
            url: "https://public-api.wordpress.com/oauth2/token",
            method: "post",
            json: true,
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                grant_type: "authorization_code",
                client_id: f.client_id,
                client_secret: f.client_secret,
                code: req.query.code,
                redirect_uri: f.redirect_uri
            }
        }

        let data = await axiosClient(options, true)

        require('fs').writeFileSync('spec.json', JSON.stringify(data))
        let msg = `details and token stored at spec.json 
        
        <br> You can close the Node app by using CTRL+C`

        console.log(chalk.green(msg))
        return res.send(msg)

    } catch (err) {
        return res.json(err)
    }

})

app.get('/*', (req, res) => {
    console.log('sign in')
    var uri = `https://public-api.wordpress.com/oauth2/authorize?client_id=${f.client_id}&redirect_uri=${f.redirect_uri}&response_type=code&blog=${f.blog}`
    console.log(uri)
    return res.redirect(uri)
})

app.listen(3000, () => {

    console.log(chalk.yellow(require('fs').readFileSync('./config/logo.txt').toString()))
    console.log(chalk.green('follow me to the http://localhost:3000 ? :)'))
})


