import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { NetworkCustomRepository } from 'src/network/repositories/network.repository';

@Module({
  imports: [],
  controllers: [RouteController],
  providers: [RouteService, NetworkCustomRepository],
})
export class RouteModule { }
