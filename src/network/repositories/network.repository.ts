import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Network } from "../entities/network.entity";
import { EdgeDto } from "../dto/create-edge.dto";

@Injectable()
export class NetworkCustomRepository extends Repository<Network> {
    constructor(
        private dataSource: DataSource
    ) {
        super(Network, dataSource.createEntityManager());
    }

    async createGraph(edges: EdgeDto[]): Promise<Network> {
        const network = this.create({
            edges,
        });
        return this.save(network);
    }

}
