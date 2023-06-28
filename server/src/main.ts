import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // https 옵션을 설정한다.
    // fs.readFileSync를 사용하여 로컬에 있는 localhost.key 파일과
    // localhost.crt 파일의 내용을 읽어온다.
    // 이를 https 서버 구성에 사용한다.
    // httpsOptions: {
    //   key: fs.readFileSync('localhost.key'),
    //   cert: fs.readFileSync('localhost.crt'),
    // },
  });
  app.useStaticAssets(join(__dirname, '../public'));

  await app.listen(3001);
}
bootstrap();
