import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Range {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    reference: string

    @Column()
    libelle: string

    @Column()
    typeFinition: string

    @Column()
    typeCouverture: string

    @Column()
    typeAngle: string

    @Column()
    typeIsolant: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}