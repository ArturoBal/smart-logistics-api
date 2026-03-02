
import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength, Min, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EdgeDto {

    @ApiProperty({
        description: 'Origin node ID',
        example: 'A'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(1)
    @Transform(({ value }) => value.toUpperCase())
    from: string;

    @ApiProperty({
        description: 'Destination node ID',
        example: 'B'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(1)
    @Transform(({ value }) => value.toUpperCase())
    to: string;

    @ApiProperty({
        description: 'Distance between nodes',
        example: 10
    })
    @IsPositive()
    @IsNotEmpty()
    distance: number;

    @ApiProperty({
        description: 'Travel time between nodes',
        example: 15
    })
    @IsPositive()
    @IsNotEmpty()
    time: number;

    @ApiPropertyOptional({
        description: 'Is this edge a highway?',
        example: false
    })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value === 'string') return value.toLowerCase() === 'true';
        return value;
    })
    isHighway?: boolean;
}
