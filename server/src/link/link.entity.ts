import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Link {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    link: string;

    @Column()
    generateLink: string;

    @Column()
    count: number;
}
