const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const dotenv = require('dotenv');
// 환경변수 설정
dotenv.config();

const PORT = process.env['PORT'];

// 세션설정
const configureSession = require('./config/session');
configureSession(app);

// passport 설정
const configurePassport = require('./config/passport');
configurePassport(app);

// 라우팅
const authRouter = require('./routes/auth');
app.use('/auth',authRouter);

app.get('/', (req, res) => {
    // req.user 가 있는경우 ( 소셜 로그인에 성공 )
    if(req.user) {
        res.send(`
        <h3>Login Success</h3>
        <a href="/auth/logout">Logout</a>
        <p>
            ${JSON.stringify(req.user, null, 2)}
        </p>
        `);
    } else {
        res.send(`
        <h3>Node Passport Sosial Login</h3>
        <a href="/auth/login/facebook">Login with Facebook</a>
        <a href="/auth/login/google">Login with Google</a>
        `);
    }
});

app.get('/google/callback', (req, res) => {
    res.send(`Nope`);
});

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
