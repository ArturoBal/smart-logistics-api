import { IsBoolean, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Preference } from "../enums/preferences.enum";
import { Transform, Type } from "class-transformer";

export class OptimizeRouteDto {

    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.toUpperCase())
    originNodeId: string;

    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.toUpperCase())
    destinationNodeId: string;

    @IsString()
    @MinLength(1)
    @IsEnum(Preference)
    @IsOptional()
    preference?: Preference;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value === 'string') return value.toLowerCase() === 'true';
        return value;
    })
    avoidHighways?: boolean;
}
