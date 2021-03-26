import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';

passport.use(
  new BasicStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });

      if (!user) return done(null, false);
      if (!(await bcrypt.compare(password, user.password)))
        return done(null, false);

      const userData = {
        username: user.username,
        email: user.email,
        _id: user._id,
      };

      return done(null, userData);
    } catch (err) {
      done(err);
    }
  })
);
