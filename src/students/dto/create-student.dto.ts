import { IsString, IsNumber, IsEnum, IsBoolean, ArrayNotEmpty, ArrayUnique } from 'class-validator';
import { Gender } from '../enums/gender.enum';
import { Stage } from '../enums/stage.enum';

export class CreateStudentDto {
    @IsString()
    name: string;

    @IsNumber()
    age: number;

    @IsEnum(Gender)
    gender: Gender;

    @IsEnum(Stage)
    stage: Stage;

    @IsNumber()
    absents: number;

    @IsBoolean()
    isNerd: boolean;

    @ArrayNotEmpty()
    @ArrayUnique()
    @IsNumber({}, { each: true })
    subjects: number[];
}
