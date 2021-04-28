const express = require("express")
const app = express()
const port = 5000
const { User } = require("./models/User")
const bodyParser = require("body-parser")
const config = require('./config/key')

app.use(bodyParser.urlencoded({extended: true})) // url 분석하게 해줌
app.use(bodyParser.json()) // json 파일을 분석하게 해줌

const mongoose = require("mongoose")
mongoose.connect(config.mongoURI, {
  useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:false
}).then(()=> console.log('mongoDB Connected'))
.catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!!!!'))

app.post('/register', (req, res) => {
    // 회원가입 정보를 클라이언트에서 가져오면 그것들을 데이터 베이스에 넣어줌
    const user = new User(req.body) // bodyparser가 있기에 req.bod로 모든 데이터가 넘어올 수 있는 것.
    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success:true})
    }) // 
})

app.listen(port, () => console.log(`Example app listening in port ${port}`))