import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Project} from "./Project";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    adresse: string;

    @Column()
    code_postal: number;

    @Column()
    ville: string;

    @Column()
    libelle: string;

    @Column()
    isParticulier: boolean;

    @OneToMany(() => Project, project => project.client)
    projects: Project[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}