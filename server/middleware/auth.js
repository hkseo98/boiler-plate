const { User } = require('../models/User')
const fs = require('fs')
// 미들웨어 만들기 - 여기서도 req, res, next 사용 가능!
let auth = (req, res, next) => {
    // 인증 처리를 하는 곳

    // 토큰을 가져온다.
    let token = fs.readFileSync('cookies.txt', 'utf8');
    console.log(token)


    // 토큰을 복호화하여 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err
        // 유저가 없으면 인증 실패
        if(!user) return res.json({ isAuth: false, error: true })

        // 유저가 있으면 인증 성공
        req.token = token;
        req.user = user; // 미들웨어 다음에 오는 콜백함수에서 해당 유저의 정보를 사용할 수 있도록.
        next() // 미들웨어에서 벗어날 수 있도록
    })
}

module.exports = { auth };