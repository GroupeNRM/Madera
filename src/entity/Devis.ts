import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()

export class Devis {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    reference: string

    @Column()
    total_ht: string

    @Column()
    total_ttc: string

    @Column()
    remise: string

    @Column()
    echelonnement: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column()
    projet: string

    @Column()
    client: string

    @Column({
        default: true
    })
    isActive: boolean
}