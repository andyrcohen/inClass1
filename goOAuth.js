const express = require('express')
const app = express()
const port = 3000
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;


const {signToken} = require('./gojwt')

passport.use(new GoogleStrategy({
    clientID: process.env.WEB_GOOGLE_CLIENT_ID,
    clientSecret: process.env.WEB_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
    }, function(accessToken, refreshToken, profile, cb) {
    // set a breakpoint here and look at profile! This is info
    // from google login.
    // most workflows store user info here! Not us – RESTFUL
    var user = {id:profile.id,name:profile.displayName}
       
    var userJWT = signToken(user,process.env.MY_SECRET)
    user.JWT = userJWT
    cb(null,user)
    }
));

// user navigates here – sends user to google for login
app.get('/auth/google',
passport.authenticate('google', { scope:
[ 'profile' ]}
));

app.get('/loginFailed', (req,res) => {
    console.log('google no like you')
})

// called by google after succesful login
app.get('/auth/google/callback', passport.authenticate('google',
    {failureRedirect: '/loginFailed', session: false}), (req, res) => {
    // Fetch JWT from req.user
    // Successful authentication, redirect home
    // set a breakpoint here and confirm user info…
    // this is what we’ll put in our JWT
    res.user = req.user
    res.sendfile('index.html');
}
)

// Serve static files from the 'public' directory
app.use(express.static('client'));

app.get('/', (req,res) => {
    res.sendfile('index.html')
})

app.listen(3000, () => {    
    console.log(`Example app listening on port ${port}`)
});