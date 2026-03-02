
import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { RouteService } from './route.service';
import { OptimizeRouteDto } from './dto/optimize-route-request.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiOkResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('Route')
@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) { }

  @Post('optimize/:id')
  @ApiOperation({ summary: 'Optimize route between nodes' })
  @ApiParam({ name: 'id', type: Number, description: 'Network ID' })
  @ApiBody({ type: OptimizeRouteDto })
  @ApiOkResponse({ description: 'Optimized route returned.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiNotFoundResponse({ description: 'Network or path not found.' })
  optimizeEdge(@Param('id', ParseIntPipe) id: number, @Body() optimizeRouteDto: OptimizeRouteDto) {
    return this.routeService.optimizeEdge(id, optimizeRouteDto);
  }
}
