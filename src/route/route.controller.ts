import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { RouteService } from './route.service';
import { OptimizeRouteDto } from './dto/optimize-route.dto';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) { }

  @Post('optimize/:id')
  optimizeEdge(@Param('id', ParseIntPipe) id: number, @Body() optimizeRouteDto: OptimizeRouteDto) {
    return this.routeService.optimizeEdge(id, optimizeRouteDto);
  }
}
