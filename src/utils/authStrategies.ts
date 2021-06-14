import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';
import { Admin } from '../models/admin';
import { SECRET_JWT } from './env';
import { JwtPayload } from '../types';

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
        role: user.role,
      };

      return done(null, userData);
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_JWT,
    },
    async (jwtPayload: JwtPayload, done) => {
      const role = jwtPayload.role;

      try {
        const user =
          role === 'user'
            ? await User.findOne({ email: jwtPayload.email })
            : await Admin.findOne({ email: jwtPayload.email });

        if (!user) return done(null, false);

        return done(null, user);
      } catch (reason) {
        done(reason);
      }
    }
  )
);
