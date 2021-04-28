const express = require("express")
const app = express()
const port = 5000

const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://hkseo:1234@youtubeclone.th4nk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:false
}).then(()=> console.log('mongoDB Connected'))
.catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World'))

app.listen(port, () => console.log(`Example app listening in port ${port}`))