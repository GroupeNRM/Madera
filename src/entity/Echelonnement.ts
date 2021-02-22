import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "echelonnement"})

export class Echelonnement {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length:45 })
    libelle: string
}