const express = require('express')
const request = require('request')

const target = 'https://build.aosip.dev'

const app = express()
const updater = express()
const port = 3019

updater.get('*', (req, res) => {
    const me = 'https://' + req.get('Host') + req.baseUrl
    const path = req.path
    const targetUrl = target + path
    if (path.endsWith('.json')) {
        request(targetUrl, (error, response, body) => {
            res.send(body.replace(target, me))
        });
    } else {
        request(targetUrl).pipe(res)
    }
})

app.use('/aosip/updater', updater)

app.listen(port, () => console.log(`Mirroring ${target} on port ${port}!`))
