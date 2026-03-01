import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class EdgeDto {
    @IsNotEmpty()
    @IsString()
    from: string;

    @IsNotEmpty()
    @IsString()
    to: string;

    @IsPositive()
    @IsNotEmpty()
    distance: number;

    @IsPositive()
    @IsNotEmpty()
    time: number;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value === 'string') return value.toLowerCase() === 'true';
        return value;
    })
    isHighway?: boolean;
}
