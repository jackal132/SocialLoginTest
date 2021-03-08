const express = require('express');
const passport = require('passport');
const router = express.Router();

// facebook router
router.get(
    '/login/facebook', 
    passport.authenticate('facebook', {scope : ['public_profile']}));
router.get(
    '/login/facebook/callback', 
    passport.authenticate('facebook', {failureRedirect:'/auth/login'}),
    (req, res) => {
        res.redirect('/');
    }
);


// google router
router.get(
    '/login/google', 
    passport.authenticate('google', {scope : ['profile']}));
router.get(
    '/login/google/callback', 
    passport.authenticate('google', {failureRedirect:'/auth/login'}),
    (req, res) => {
        res.redirect('/');
    }
);   

router.get('/logout', (req, res) => {
    //req.logOut();
    //종종 세션이 제대로 지워지지 않는다는 문제가 발생할경우 아래 코드 실행
    req.session.destroy((err) => {
        req.logout();
        res.redirect('/');
    })
});

module.exports = router;