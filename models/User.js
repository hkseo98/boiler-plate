const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 솔트의 글자 수 지정
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    name: {
        type: String, 
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 이메일 띄어쓰지 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        minLength: 5
    },
    lastname: {
        type:String, 
        maxlength:50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ) {  // 몽구스가 save를 하기 전에 어떠한 것을 수행하겠다!
    let user = this // 여기서 this는 userSchema를 지칭
    // 비밀번호 암호화

    if(user.isModified('password')) { // 비밀번호가 변경될 때만 암호화될 수 있게.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if (err) return next(err);
                user.password = hash // 암호화된 것으로 비밀번호 교체
                next(); // 할 일을 마치면 save 메소드로 이동 
            });
        });
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {  // 비밀번호 비교
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    // jsonwebtoken을 이용해서 토큰 생성
    let user = this
    let token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save((err, user) => {
        if(err) return cb(err)
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema)
module.exports = { User }