import { Module } from '@nestjs/common';
import { NetworkService } from './network.service';
import { NetworkController } from './network.controller';
import { Network } from './entities/network.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { NetworkCustomRepository } from './repositories/network.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Network])
  ],
  controllers: [NetworkController],
  providers: [NetworkService, NetworkCustomRepository],
  exports: [NetworkCustomRepository]
})
export class NetworkModule { }
