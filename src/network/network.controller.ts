
import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { NetworkService } from './network.service';
import { CreateGraphDto } from './dto/create-network-request.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Network')
@Controller('network')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) { }

  @Post()
  @ApiOperation({ summary: 'Upload a new network graph' })
  @ApiBody({ type: CreateGraphDto })
  @ApiCreatedResponse({ description: 'Graph created successfully.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  uploadGraph(@Body() createGraphDto: CreateGraphDto) {
    return this.networkService.createGraph(createGraphDto);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Find a network graph by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Graph ID' })
  @ApiOkResponse({ description: 'Graph found.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiNotFoundResponse({ description: 'Graph not found.' })
  findGraph(@Param('id', ParseIntPipe) id: number) {
    return this.networkService.findGraph(id);
  }
}
