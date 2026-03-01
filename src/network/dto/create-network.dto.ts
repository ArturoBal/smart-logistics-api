import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { EdgeDto } from "./create-edge.dto";

export class CreateGraphDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EdgeDto)
    @IsNotEmpty({ each: true })
    edges: EdgeDto[];
}
