import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    client: string

    @Column()
    devis: string

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