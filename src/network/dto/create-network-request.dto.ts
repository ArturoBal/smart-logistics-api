
import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { EdgeDto } from "./create-edge-request.dto";
import { ApiProperty } from '@nestjs/swagger';

export class CreateGraphDto {
    @ApiProperty({
        type: [EdgeDto],
        description: 'List of edges that make up the network',
        example: [
            { from: 'A', to: 'B', distance: 10, time: 15, isHighway: false },
            { from: 'B', to: 'C', distance: 5, time: 7, isHighway: true }
        ]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EdgeDto)
    @IsNotEmpty({ each: true })
    edges: EdgeDto[];
}
