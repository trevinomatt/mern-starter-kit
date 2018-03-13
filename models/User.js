const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
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

userSchema.pre('save', function( next ){
    let user = this;

    if (user.isModified('password')) {
        console.log('user isModified');
        // password bcrypt
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) {
                return next(err);
            } else {
                bcrypt.hash(user.password, salt, function(err, hash) {
                    if (err) {
                        return next(err);
                    } else {
                        user.password = hash;
                        next();
                    }
                })
            }
        });
    } else {
        next();
    }

})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        } else {
            return cb(null, isMatch);
        }
    })
}

userSchema.methods.generateToken = function(cb) {
    let user = this;
    // generate token with jsonwebtoken
    let token = jwt.sign(user._id.toHexString(), 'tokenMatthew');

    user.token = token;
    user.save(function(err, user) {
        if (err) {
            return cb(err);
        } else {
            cb(null, user);
        }
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }