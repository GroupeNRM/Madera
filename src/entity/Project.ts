import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Client} from "./Client";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Client, client => client.projects, {
        eager: true
    })
    client: string

    @Column()
    libelle: string

    @Column()
    dateCreation: Date

    @Column({
        default: true
    })
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}