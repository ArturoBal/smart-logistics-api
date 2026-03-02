import { IsBoolean, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Preference } from "../enums/preferences.enum";
import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OptimizeRouteDto {

    @ApiProperty({
        description: 'Origin node ID',
        example: 'A'
    })
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.toUpperCase())
    originNodeId: string;

    @ApiProperty({
        description: 'Destination node ID',
        example: 'B'
    })
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.toUpperCase())
    destinationNodeId: string;

    @ApiPropertyOptional({
        enum: Preference,
        description: 'Route optimization preference',
        example: Preference.SHORTEST
    })
    @IsString()
    @MinLength(1)
    @IsEnum(Preference)
    @IsOptional()
    preference?: Preference;

    @ApiPropertyOptional({
        description: 'Whether to avoid highways',
        example: false
    })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value === 'string') return value.toLowerCase() === 'true';
        return value;
    })
    avoidHighways?: boolean;
}
