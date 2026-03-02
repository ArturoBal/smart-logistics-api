import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { NetworkService } from './network.service';
import { CreateGraphDto } from './dto/create-network.dto';

@Controller('network')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) { }
  a
  @Post()
  uploadGraph(@Body() createGraphDto: CreateGraphDto) {
    return this.networkService.createGraph(createGraphDto);
  }

  @Get(':id')
  findGraph(@Param('id', ParseIntPipe) id: number) {
    return this.networkService.findGraph(id);
  }
}
