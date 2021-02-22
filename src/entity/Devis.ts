import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Echelonnement } from "./Echelonnement";

@Entity({name: "devis"})

export class Devis {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length:45 })
    reference: string

    @Column({type: "varchar", length: 45})
    etat: string

    @Column({type: "double"})
    total_ht: number

    @Column({type: "double"})
    total_ttc: number

    @Column({type: "double"})
    remise: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(type => Echelonnement)
    @JoinColumn()
    echelonnement: Echelonnement

}