import express from 'express'
import bodyparser from 'body-parser'
import routerIndexing from './routes/index'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(bodyparser.json())

app.use('/', routerIndexing)

app.listen(process.env.PORT || 8081, () => console.log("Server running on localhost:8081"))