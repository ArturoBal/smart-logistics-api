import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { NetworkService } from './network.service';
import { CreateGraphDto } from './dto/create-network.dto';

@Controller('network')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) { }
  a
  @Post()
  uploadGraph(@Body() CreateGraphDto: CreateGraphDto) {
    return this.networkService.createGraph(CreateGraphDto);
  }

  @Get(':id')
  findGraph(@Param('id', ParseUUIDPipe) id: string) {
    return this.networkService.findGraph(id);
  }
}
