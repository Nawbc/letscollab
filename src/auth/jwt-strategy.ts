import { BootStrategy } from '@deskbtm/midway-passport';
import { ExpressPassportStrategyAdapter } from '@deskbtm/midway-passport/express';
import { Strategy, ExtractJwt } from 'passport-jwt';

@BootStrategy({
  async useParams({ configuration }) {
    return {
      secretOrKey: configuration.jwt.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
  },
})
export class JwtStrategy extends ExpressPassportStrategyAdapter(Strategy, 'jwt') {
  async verify(payload) {
    return payload;
  }
}
