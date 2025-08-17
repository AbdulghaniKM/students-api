import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Student} from "./entities/student.entity";
import {Subject} from "../subjects/entities/subject.entity";
@Module({
    imports: [TypeOrmModule.forFeature([Student,Subject])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
