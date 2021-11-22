import { Provide } from '@midwayjs/decorator';
import { ExpressPassportMiddleware } from '@midwayjs/passport';

@Provide()
export class LocalPassportMiddleware extends ExpressPassportMiddleware {
  public strategy: string = 'local';

  public async auth(ctx, err, data) {
    return data;
  }
}