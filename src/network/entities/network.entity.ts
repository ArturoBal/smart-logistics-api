import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Edge } from "../types/edges.types";

@Entity()
export class Network {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
    })
    id: number;

    @Column({
        type: 'json',
    })
    edges: Edge[];

    @CreateDateColumn()
    createdAt: Date;
}
