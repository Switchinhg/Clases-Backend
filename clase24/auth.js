const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = [
    {
        username: "swicho",
        password: "contra",
        role: "user"
    },
    {
        username: "admin",
        password: "123456",
        role: "admin"
    }
]
/* Strategies */
passport.use('login', new LocalStrategy({
    passReqToCallback: true,
  }, function(req, username, password, next) {
    const user = users.find((obj) => obj.username === username && obj.password === password)

    if( user){
        return next(null, user);
    } else {
        return next(null, false)
    }
  })
);

passport.use('register', new LocalStrategy({
    passReqToCallback: true,
  }, function(req, username, password, next) {
    const usuario = users.find((obj) => obj.username === username )

    if(usuario) {
      return(null, false);
    }else{
      const user = {username,password,role:'user'}
      users.push(user)
      return next(null, user);
    }
}));


passport.serializeUser(function(user, next) {
    next(null, user);
  });
