import { PartialType } from '@nestjs/mapped-types';
import { OptimizeRouteDto } from './optimize-route.dto';

export class UpdateRouteDto extends PartialType(OptimizeRouteDto) { }
