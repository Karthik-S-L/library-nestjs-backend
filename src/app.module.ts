import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Api/auth/auth.module';
import { UserModule } from './Api/user/user.module';
import { BookModule } from './Api/book/book.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env['MONGO-DB-URI']),
    BookModule,
    AuthModule,
    UserModule,
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
