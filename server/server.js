import express from 'express'
import schema from './schema'

import { graphql } from 'graphql'
import bodyParser from 'body-parser'

let app = express()
const PORT = 3000

app.use(bodyParser.text({ type: 'application/graphql' }))

app.post('/graphql', (req, res) => {
  graphql(schema, req.body)
    .then((result) => {
      res.send(JSON.stringify(result, null, 2));
    })
})

app.listen(PORT)
