import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import {Gender} from "../enums/gender.enum";
import {Subject} from "../../subjects/entities/subject.entity";
import {Stage} from "../enums/stage.enum";
@Entity({name: 'students'})
export class Student {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    age: number;
    @Column({
        type: 'enum',
        enum: Gender,
        default: Gender.MALE,
    })
    gender: Gender;
    @Column({
        type: 'enum',
        enum: Stage,
        default: Stage.FIRST,
    })
    stage: Stage;
    @Column()
    absents: number;
    @Column()
    isNerd: boolean;
    @ManyToMany(() => Subject, subject => subject.students)
    @JoinTable()
    subjects: Subject[];
}