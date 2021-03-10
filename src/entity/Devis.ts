import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { IsNotEmpty } from "class-validator";


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

export enum Projet {
    Projet_1 = "Projet Grenoble",
    Projet_2 = "Projet Lyon",
    Projet_3 = "Projet Annecy",
    Projet_4 = "Projet Alpes d'Huez",
}

export enum Client {
    Client_1 = "M. John",
    Client_2 = "Mme. Jane",
    Client_3 = "M. Toto",
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
    @IsNotEmpty()
    echelonnement: Echelonnement;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({
        type: "enum",
        enum: Projet,
        default: ""
    })
    @IsNotEmpty()
    projet: Projet;

    @Column({
        type: "enum",
        enum: Client,
        default: ""
    })
    @IsNotEmpty()
    client: Client;

    @Column({
        default: true
    })
    isActive: boolean


}