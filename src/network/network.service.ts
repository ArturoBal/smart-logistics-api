import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateGraphDto } from './dto/create-network-request.dto';
import { NetworkCustomRepository } from './repositories/network.repository';

@Injectable()
export class NetworkService {
  private readonly logger = new Logger('NetworkService')
  constructor(private readonly networkRepository: NetworkCustomRepository) { }

  async createGraph(createGraphDto: CreateGraphDto) {
    const { edges } = createGraphDto;
    try {
      return await this.networkRepository.createGraph(edges);
    } catch (error) {
      this.logger.error('Failed to create graph', error.message);
      throw new InternalServerErrorException('Failed to create graph');
    }
  }

  async findGraph(id: number) {
    const graph = await this.networkRepository.findOne({ where: { id } });
    if (!graph) {
      this.logger.error(`Failed to find graph with id ${id} not found`);
      throw new NotFoundException(`Graph not found`);
    }
    return graph;
  }
}
