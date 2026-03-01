import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OptimizeRouteDto } from './dto/optimize-route.dto';
import { NetworkCustomRepository } from 'src/network/repositories/network.repository';
import { findShortestPath } from 'src/common/dijkstra/dijkstra-service';
import { Network } from 'src/network/entities/network.entity';
import { PathResult } from 'src/common/interfaces/dijkstra-path-result';

@Injectable()
export class RouteService {
  private readonly logger = new Logger('RouteService')
  constructor(
    private readonly networkCustomRepository: NetworkCustomRepository
  ) { }
  async optimizeEdge(id: string, optimizeRouteDto: OptimizeRouteDto) {
    const { originNodeId, destinationNodeId, preference, avoidHighways } = optimizeRouteDto;
    const network = await this.networkCustomRepository.findOneBy({ id });

    if (!network) {
      this.logger.error(`Failed to find graph with id ${id} not found`);
      throw new NotFoundException(`Network not found`);
    }

    const adjacencyMap = this.transformToAdjacencyMap(network);
    const result = findShortestPath(adjacencyMap, originNodeId, destinationNodeId);

    this.verifyGraph(result, originNodeId, destinationNodeId, id);

    return { body: result };
  }

  private transformToAdjacencyMap(network: Network): Record<string, Record<string, number>> {

    const adjacencyMap: Record<string, Record<string, number>> = {};
    for (const edge of network.edges) {

      if (!adjacencyMap[edge.from]) {
        adjacencyMap[edge.from] = {};
      }
      adjacencyMap[edge.from][edge.to] = edge.cost;
    }

    return adjacencyMap;
  }

  private verifyGraph(result: string[] | PathResult, originNodeId: string, destinationNodeId: string, id: string): boolean {
    if (
      !result ||
      (Array.isArray(result)
        ? result.length === 0
        : !result.path || result.path.length === 0)
    ) {
      this.logger.error(`No path found from ${originNodeId} to ${destinationNodeId} in network ${id}`);
      throw new NotFoundException(`No path found in network`);
    }

    return true;
  }
}