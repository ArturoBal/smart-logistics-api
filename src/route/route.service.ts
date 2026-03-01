import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OptimizeRouteDto } from './dto/optimize-route.dto';
import { NetworkCustomRepository } from 'src/network/repositories/network.repository';
import { findShortestPath } from 'src/common/dijkstra/dijkstra-service';
import { Network } from 'src/network/entities/network.entity';
import { PathResult } from 'src/common/interfaces/dijkstra-path-result';
import { Preference } from './enums/preferences.enum';

@Injectable()
export class RouteService {
  private readonly logger = new Logger('RouteService')
  constructor(
    private readonly networkCustomRepository: NetworkCustomRepository
  ) { }
  async optimizeEdge(id: string, optimizeRouteDto: OptimizeRouteDto) {
    const { originNodeId, destinationNodeId, preference = Preference.SHORTEST, avoidHighways } = optimizeRouteDto;

    const network = await this.networkCustomRepository.findOneBy({ id });

    if (!network) {
      this.logger.error(`Failed to find graph with id ${id} not found`);
      throw new NotFoundException(`Network not found`);
    }

    const adjacencyMap = this.transformToAdjacencyMap(network, preference, avoidHighways);

    this.verifyNodesExist(adjacencyMap, originNodeId, destinationNodeId);

    const result = findShortestPath(adjacencyMap, originNodeId, destinationNodeId);

    if (!result) {
      this.logger.error(`No path found between nodes ${originNodeId} and ${destinationNodeId}`);
      throw new NotFoundException('No path found between nodes');
    }

    return {
      preference: preference,
      path: result.path,
      cost: result.cost,
      costType: preference === Preference.SHORTEST ? "distance" : "time",
      avoidHighways: avoidHighways ?? false
    }
  }

  private transformToAdjacencyMap(
    network: Network,
    preference: Preference,
    avoidHighways?: boolean
  ): Record<string, Record<string, number>> {
    const adjacencyMap: Record<string, Record<string, number>> = {};
    for (const edge of network.edges) {
      const from = edge.from.toUpperCase();
      const to = edge.to.toUpperCase();
      let cost: number;

      if (avoidHighways && edge.isHighway) {
        cost = Infinity;
      } else {
        cost = preference === Preference.FASTEST ? edge.time : edge.distance;
      }

      if (!adjacencyMap[from]) adjacencyMap[from] = {};
      adjacencyMap[from][to] = cost;

      if (!adjacencyMap[to]) adjacencyMap[to] = {};
      adjacencyMap[to][from] = cost;
    }
    return adjacencyMap;
  }

  private verifyNodesExist(adjacencyMap: Record<string, Record<string, number>>, originNodeId: string, destinationNodeId: string): boolean {
    if (!adjacencyMap[originNodeId] || !adjacencyMap[destinationNodeId]) {
      this.logger.error(`Origin or destination node does not exist in the network`);
      throw new NotFoundException('Origin or destination node does not exist in the network');
    }
    return true;
  }
}