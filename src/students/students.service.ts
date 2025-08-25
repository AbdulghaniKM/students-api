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
      return this.studentRepository.find({ relations: ['subjects'], order: { id: 'ASC'} });
  }

  findOne(id: number) {
    return this.studentRepository.findOne({ where: { id }, relations: ['subjects'] });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
        const student = await this.studentRepository.findOne({
            where: { id },
            relations: ['subjects'],
        });

        if (!student) throw new Error('Student not found');

        const { subjects, ...rest } = updateStudentDto;
        Object.assign(student, rest); // assigns name, age, etc.

      if (subjects) {
          const subjectEntities = await this.subjectRepository.find({
              where: { id: In(subjects) }
          });
          student.subjects = subjectEntities;
      }

      return this.studentRepository.save(student);
    }

  remove(id: number) {
    return this.studentRepository.delete(id);
  }
}
