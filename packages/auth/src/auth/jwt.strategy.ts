import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { NacosConfigService } from '@letscollab/nestjs-nacos';
import { NacosUtils } from '@letscollab/utils';
import { NACOS_AUTH_DATA_ID } from '@/app.constants';

export interface JwtPayload {
  roles: string[];

  account: string;
  /**
   * jac token
   */
  a_t: string;

  r_t: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly nacosConfigService: NacosConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: async (
        _requestType,
        _tokenOrPayload,
        _verifyOrSignOrOptions,
      ) => {
        const options = await NacosUtils.getConfig(
          nacosConfigService,
          NACOS_AUTH_DATA_ID,
        );
        console.log(options?.jwt.secret);
        return options?.jwt.secret;
      },
    });
  }

  async validate(payload: JwtPayload) {
    console.log(payload);

    return payload;
  }
}
