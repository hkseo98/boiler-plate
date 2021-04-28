const express = require("express")
const app = express()
const port = 5000
const { User } = require("./models/User")
const bodyParser = require("body-parser")
const config = require('./config/key')
const cookieParser = require('cookie-parser')

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
    const user = new User(req.body) // bodyparser가 있기에 req.body로 모든 데이터가 넘어올 수 있는 것.
    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success:true})
    }) // 
})

app.post('/login', (req, res) => {
    // 요청한 이메일을 데이터베이스에서 찾음
    User.findOne({ email: req.body.email }, (err, userInfo) => { // 해당 이메일이 db에 없다면 userInfo는 텅 비게 됨.
        if(!userInfo) {
            return res.json({
                loginSuccess: false,
                message: "can't find user"
            })
        }
        // 요청한 이메일이 db에 있다면 비밀번호 확인
        userInfo.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: "wrong password"})
            // 비밀번호까지 같다면 토큰 생성
            userInfo.generateToken((err, user) => {
                if (err) return res.status(400).send(err)
                //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지. 
                res.cookie("x_auth", user.token) // cookie-parser를 통한 쿠키 저장
                .status(200)
                .json({ loginSuccess: true, userId: user._id})
            })
        })
    })
   
    
})

app.listen(port, () => console.log(`Example app listening in port ${port}`))