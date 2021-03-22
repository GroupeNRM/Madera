import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export class Activity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    libelle: string

    @Column()
    emitter: string

    @CreateDateColumn()
    createdAt: Date
}
