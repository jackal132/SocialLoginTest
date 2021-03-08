const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    // 로그인 성공시 호출
    // serializeUser에서 done을 호출하게 되면 session 사용자 정보다 저장되고,
    // 두번째 인자로 전달한 user가 deserializeUser로 전달된다.
    passport.serializeUser((user, done) =>{
        done(null, user);
    });

    // 서버에 요청이 있을 때마다 호출
    // 두번째 인자로 user를 전달하게되면 req.user로 user의 값을 접근할 수 있게 된다.
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    // Facebook Strategy
    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env['FACEBOOK_CLIENT_ID'],
                clientSecret: process.env['FACEBOOK_SECRET_ID'],
                callbackURL: process.env['FACEBOOK_CALLBACK']
            },
            function (accessToken, refreshToken, profile, done){
                // 여기서 done을 호출하게 되면 두번째 인자 profile이
                // serializeUser 로 전달된다.
                done(null, profile);
            }
        )
    );

    // Google Strategy
    passport.use(
      new GoogleStrategy(
          {
            clientID: process.env['GOOGLE_CLIENT_ID'],
            clientSecret: process.env['GOOGLE_SECRET_ID'],
            callbackURL: process.env['GOOGLE_CALLBACK']
          },
          function (accessToken, refreshToken, profile, done){
              done(null, profile);
          }
      )  
    );
}