import { Test, TestingModule } from '@nestjs/testing';
import { NetworkService } from './network.service';
import { NetworkCustomRepository } from './repositories/network.repository';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('NetworkService', () => {
  let service: NetworkService;
  let networkRepository: {
    createGraph: jest.Mock;
    findOne: jest.Mock;
  };

  const mockNetworkRepository = {
    createGraph: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NetworkService,
        {
          provide: NetworkCustomRepository,
          useValue: mockNetworkRepository,
        },
      ],
    }).compile();

    service = module.get<NetworkService>(NetworkService);
    networkRepository = module.get(NetworkCustomRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createGraph', () => {
    it('should call repository and return result', async () => {
      const dto = { edges: [{ from: 'A', to: 'B', distance: 10, time: 5, isHighway: true }] };
      const result = { id: 1, edges: dto.edges };
      networkRepository.createGraph.mockResolvedValue(result);
      await expect(service.createGraph(dto)).resolves.toEqual(result);
      expect(networkRepository.createGraph).toHaveBeenCalledWith(dto.edges);
    });

    it('should throw InternalServerErrorException on error', async () => {
      const dto = { edges: [] };
      networkRepository.createGraph.mockImplementation(() => { throw new Error('fail'); });
      await expect(service.createGraph(dto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findGraph', () => {
    it('should return graph if found', async () => {
      const graph = { id: 1, edges: [] };
      networkRepository.findOne.mockResolvedValue(graph);
      await expect(service.findGraph(1)).resolves.toBe(graph);
      expect(networkRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if graph not found', async () => {
      networkRepository.findOne.mockResolvedValue(undefined);
      await expect(service.findGraph(2)).rejects.toThrow(NotFoundException);
    });
  });
});
