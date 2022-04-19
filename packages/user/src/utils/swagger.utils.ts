import { UserModule } from '../user/user.module';
import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

import { readJsonSync } from 'fs-extra';
import { writeOpenApiDoc } from '@letscollab/common';

const pkg = readJsonSync(resolve(process.cwd(), './package.json'));

export const setupUserApiDoc = (app: INestApplication) =>
  new Promise(async (resolve) => {
    try {
      const userOptions = new DocumentBuilder()
        .setTitle('User Api')
        .setDescription('用户接口')
        .setVersion(pkg.version)
        .build();

      const userDoc = SwaggerModule.createDocument(app, userOptions, {
        include: [UserModule],
      });
      SwaggerModule.setup('api/doc/user', app, userDoc);
      await writeOpenApiDoc({
        name: 'user',
        pkgName: pkg.name,
        pkgVersion: pkg.version,
        content: userDoc,
      });
    } catch (e) {
      console.log(e);
    } finally {
      resolve(null);
    }
  });