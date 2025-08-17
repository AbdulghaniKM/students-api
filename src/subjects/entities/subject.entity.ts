import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import {Student} from "../../students/entities/student.entity";

@Entity({ name: 'subjects' })
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Student, student => student.subjects)
    students: Student[];
}
