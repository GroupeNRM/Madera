import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Unique} from "typeorm";
import {Project} from "./Project";

@Entity()
@Unique(['email'])
export class Client {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone_number: string;

    @Column()
    adress: string;

    @Column()
    zip_code: number;

    @Column()
    city: string;

    @Column()
    pro_status: string;

    @OneToMany(() => Project, project => project.client)
    projects: Project[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}