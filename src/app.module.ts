import { Module } from '@nestjs/common';
import { NetworkModule } from './network/network.module';
import { RouteModule } from './route/route.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config/envs';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';

@Module({
  imports:
    [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: envs.dbHost,
        port: envs.dbPort,
        database: envs.dbName,
        username: envs.dbUsername,
        password: envs.dbPassword,
        autoLoadEntities: true,
        synchronize: true,
      }),
      NetworkModule,
      RouteModule,
      CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
