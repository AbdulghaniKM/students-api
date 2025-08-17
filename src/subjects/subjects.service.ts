import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import {Subject} from "./entities/subject.entity";
import { Repository } from 'typeorm';

@Injectable()
export class SubjectsService {
    constructor(
        @InjectRepository(Subject)
        private readonly subjectRepository: Repository<Subject>
    )
    {
    }

  create(createSubjectDto: CreateSubjectDto) {
    return 'This action adds a new subject';
  }

  findAll() {
    return this.subjectRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`;
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
