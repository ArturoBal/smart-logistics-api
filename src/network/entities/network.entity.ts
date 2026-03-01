import { Column, CreateDateColumn, Entity } from "typeorm";
import { Edge } from "../types/edges.types";

@Entity()
export class Network {
    @Column('uuid', { primary: true, generated: 'uuid' })
    id: string;

    @Column({
        type: 'json',
    })
    edges: Edge[];

    @CreateDateColumn()
    createdAt: Date;
}
