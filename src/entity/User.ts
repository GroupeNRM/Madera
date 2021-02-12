import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";
import {IsEmail, IsNotEmpty} from "class-validator";

@Entity()
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    password: string

    @Column()
    @IsEmail()
    email: string

    @Column()
    @IsNotEmpty()
    role: string;
}
