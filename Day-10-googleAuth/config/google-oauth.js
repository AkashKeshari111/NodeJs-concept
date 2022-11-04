const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport");
const AuthModel = require('../Auth/auth.model');
const { v4: uuidv4 } = require('uuid');

passport.use(new GoogleStrategy({
    clientID: "813611519801-jrr5tt5398p5qalk0307qkejtc1id98j.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
 const email=profile._json.email;

 const user=new AuthModel({
  email,
  password:uuidv4()
 })
 await user.save()
 const {_id,password}=user
 const payload={
  email,
  password,
  _id,
  url:profile._json.picture
 }
    return cb(null, payload);
 
  }
))

module.exports=passport;