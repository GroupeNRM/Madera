import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";


export enum Echelonnement {
    Etape_1 = "3%",
    Etape_2 = "10%",
    Etape_3 = "15%",
    Etape_4 = "25%",
    Etape_5 = "40%",
    Etape_6 = "75%",
    Etape_7 = "95%",
    Etape_8 = "100%",
}

@Entity({name: "devis"})

export class Devis {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length:45 })
    reference: string

    @Column({type: "double"})
    total_ht: number

    @Column({type: "double"})
    total_ttc: number

    @Column({type: "double"})
    remise: number


    @Column({
        type: "enum",
        enum: Echelonnement,
        default: Echelonnement.Etape_1
    })

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({ type: "varchar", length: 20 })
    projet: string


}