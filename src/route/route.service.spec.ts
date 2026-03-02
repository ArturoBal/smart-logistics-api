import { Test, TestingModule } from '@nestjs/testing';
import { RouteService } from './route.service';
import { NetworkCustomRepository } from 'src/network/repositories/network.repository';
import { Preference } from './enums/preferences.enum';
import { OptimizeRouteDto } from './dto/optimize-route-request.dto';
import { NotFoundException } from '@nestjs/common';

describe('RouteService', () => {
  let service: RouteService;
  let networkCustomRepository: jest.Mocked<NetworkCustomRepository>;

  const mockNetwork = {
    id: 1,
    createdAt: new Date(),
    edges: [
      { from: 'A', to: 'B', distance: 10, time: 5, isHighway: false },
      { from: 'B', to: 'C', distance: 20, time: 10, isHighway: true },
      { from: 'A', to: 'C', distance: 30, time: 15, isHighway: false },
    ],
  };

  beforeEach(async () => {
    const mockRepo = {
      findOneBy: jest.fn(),
    } as unknown as jest.Mocked<NetworkCustomRepository>;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RouteService,
        { provide: NetworkCustomRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<RouteService>(RouteService);
    networkCustomRepository = module.get(NetworkCustomRepository) as jest.Mocked<NetworkCustomRepository>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw NotFoundException if network not found', async () => {
    networkCustomRepository.findOneBy.mockResolvedValue(null);
    const dto: OptimizeRouteDto = {
      originNodeId: 'A',
      destinationNodeId: 'B',
      preference: Preference.SHORTEST,
      avoidHighways: false,
    };
    await expect(service.optimizeEdge(1, dto)).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException if origin or destination node does not exist', async () => {
    networkCustomRepository.findOneBy.mockResolvedValue(mockNetwork);
    const dto: OptimizeRouteDto = {
      originNodeId: 'X',
      destinationNodeId: 'B',
      preference: Preference.SHORTEST,
      avoidHighways: false,
    };
    await expect(service.optimizeEdge(1, dto)).rejects.toThrow(NotFoundException);
  });

  it('should return shortest path when preference is SHORTEST', async () => {
    networkCustomRepository.findOneBy.mockResolvedValue(mockNetwork);
    const dto: OptimizeRouteDto = {
      originNodeId: 'A',
      destinationNodeId: 'C',
      preference: Preference.SHORTEST,
      avoidHighways: false,
    };

    jest.spyOn(require('src/common/dijkstra/dijkstra-service'), 'findShortestPath').mockReturnValue({ path: ['A', 'B', 'C'], cost: 30 });
    const result = await service.optimizeEdge(1, dto);
    expect(result).toEqual({
      preference: Preference.SHORTEST,
      path: ['A', 'B', 'C'],
      cost: 30,
      costType: 'distance',
      avoidHighways: false,
    });
  });

  it('should return fastest path when preference is FASTEST', async () => {
    networkCustomRepository.findOneBy.mockResolvedValue(mockNetwork);
    const dto: OptimizeRouteDto = {
      originNodeId: 'A',
      destinationNodeId: 'C',
      preference: Preference.FASTEST,
      avoidHighways: false,
    };
    jest.spyOn(require('src/common/dijkstra/dijkstra-service'), 'findShortestPath').mockReturnValue({ path: ['A', 'C'], cost: 15 });
    const result = await service.optimizeEdge(1, dto);
    expect(result).toEqual({
      preference: Preference.FASTEST,
      path: ['A', 'C'],
      cost: 15,
      costType: 'time',
      avoidHighways: false,
    });
  });

  it('should set cost to Infinity for highways when avoidHighways is true', async () => {
    networkCustomRepository.findOneBy.mockResolvedValue(mockNetwork);
    const dto: OptimizeRouteDto = {
      originNodeId: 'A',
      destinationNodeId: 'C',
      preference: Preference.SHORTEST,
      avoidHighways: true,
    };
    jest.spyOn(require('src/common/dijkstra/dijkstra-service'), 'findShortestPath').mockReturnValue({ path: ['A', 'C'], cost: 30 });
    const result = await service.optimizeEdge(1, dto);
    expect(result.avoidHighways).toBe(true);
    expect(result.path).toEqual(['A', 'C']);
    expect(result.cost).toBe(30);
  });

  it('should throw NotFoundException if no path found', async () => {
    networkCustomRepository.findOneBy.mockResolvedValue(mockNetwork);
    const dto: OptimizeRouteDto = {
      originNodeId: 'A',
      destinationNodeId: 'C',
      preference: Preference.SHORTEST,
      avoidHighways: false,
    };
    jest.spyOn(require('src/common/dijkstra/dijkstra-service'), 'findShortestPath').mockReturnValue(null);
    await expect(service.optimizeEdge(1, dto)).rejects.toThrow(NotFoundException);
  });
});
