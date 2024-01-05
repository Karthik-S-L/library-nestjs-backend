import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { BookModule } from './api/book/book.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt-auth.guard';
import { ChatgptModule } from './api/chatgpt/chatgpt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env['MONGO_DB_URI']),
    BookModule,
    AuthModule,
    UserModule,
    ChatgptModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD, //To declare jwt guard as global guard
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
