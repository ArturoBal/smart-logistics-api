import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RouteService } from './route.service';
import { UpdateRouteDto } from './dto/update-route.dto';
import { OptimizeRouteDto } from './dto/optimize-route.dto';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) { }

  @Post('optimize/:id')
  optimizeEdge(@Param('id', ParseUUIDPipe) id: string, @Body() optimizeRouteDto: OptimizeRouteDto) {
    return this.routeService.optimizeEdge(id, optimizeRouteDto);
  }
}
