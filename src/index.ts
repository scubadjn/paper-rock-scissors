import * as express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  /* tslint:disable */
  console.log(`App listening on port ${port}!`)
  /* tslint:enable */
})
