const session = require('express-session');

module.exports = (app) => {
    app.use(
        session({
            secret: process.env['SESSION_SECRET'],
            cookie: { maxAge : 60 * 60 * 100}, // 세션 만료 기간
            resave : false, // 세션을 언제나 저장할지 정하는 값
            saveUninitialized : true // 세션이 저장되기 전에 uninitialzed 상태로 미리 만들어서 저장
        })
    )
}