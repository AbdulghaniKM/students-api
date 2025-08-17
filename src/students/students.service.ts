import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {Student} from "./entities/student.entity";
import {Subject} from "../subjects/entities/subject.entity";
@Injectable()
export class StudentsService {

    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @InjectRepository(Subject)
        private readonly subjectRepository: Repository<Subject>,
    )
    {
    }

    async create(createStudentDto: CreateStudentDto) {
        const subjects = await this.subjectRepository.find({
            where: {id: In(createStudentDto.subjects)}
        });

        const student = this.studentRepository.create({
            ...createStudentDto,
            subjects,
        });

        return this.studentRepository.save(student);
    }


  findAll() {
      return this.studentRepository.find({ relations: ['subjects'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
