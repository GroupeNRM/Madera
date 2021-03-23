import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn, ManyToOne
} from "typeorm";
import {Project} from "./Project";

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

    @OneToOne(() => Project, {
        eager: true
    })
    @JoinColumn()
    projet: string

    @Column({
        default: true
    })
    isActive: boolean
}