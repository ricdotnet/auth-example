const Express = require('express')
const app = Express()

const PORT = 3000;

app.use(Express.json())

const api = require('./api')
app.use(api)



app.listen(3000, () => {
  console.log('server on and listening on port ' + PORT)
})