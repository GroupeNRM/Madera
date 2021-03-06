import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {IsEmail, IsNotEmpty} from "class-validator";

export enum UserRole {
    ADMIN = "ROLE_ADMIN",
    CLIENT = "ROLE_CLIENT",
    BASIC = "ROLE_BASIC"
}

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
    password: string

    @Column()
    @IsEmail()
    email: string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.BASIC
    })

    @IsNotEmpty()
    role: UserRole;

    @Column({default: false})
    isActive: boolean

    @Column()
    randomHash: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
