import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Preference } from '../src/route/enums/preferences.enum';

const mockEdges = [
    { from: 'A', to: 'B', distance: 10, time: 5, isHighway: false },
    { from: 'B', to: 'C', distance: 20, time: 10, isHighway: true },
    { from: 'A', to: 'C', distance: 30, time: 15, isHighway: false },
];

describe('Smart Logistics API (e2e)', () => {
    let app: INestApplication;
    let networkId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should create a network graph', async () => {
        const res = await request(app.getHttpServer())
            .post('/network')
            .send({ edges: mockEdges });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        networkId = res.body.id;
    });

    it('should find the created network graph', async () => {
        const res = await request(app.getHttpServer())
            .get(`/network/${networkId}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('edges');
        expect(res.body.edges.length).toBe(mockEdges.length);
    });

    it('should optimize route (shortest)', async () => {
        const res = await request(app.getHttpServer())
            .post(`/route/optimize/${networkId}`)
            .send({
                originNodeId: 'A',
                destinationNodeId: 'C',
                preference: Preference.SHORTEST,
            });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('path');
        expect(res.body).toHaveProperty('cost');
        expect(res.body.preference).toBe(Preference.SHORTEST);
    });

    it('should optimize route (fastest)', async () => {
        const res = await request(app.getHttpServer())
            .post(`/route/optimize/${networkId}`)
            .send({
                originNodeId: 'A',
                destinationNodeId: 'C',
                preference: Preference.FASTEST,
            });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('path');
        expect(res.body).toHaveProperty('cost');
        expect(res.body.preference).toBe(Preference.FASTEST);
    });

    it('should optimize route avoiding highways', async () => {
        const res = await request(app.getHttpServer())
            .post(`/route/optimize/${networkId}`)
            .send({
                originNodeId: 'A',
                destinationNodeId: 'C',
                avoidHighways: true,
            });
        expect(res.status).toBe(201);
        expect(res.body.avoidHighways).toBe(true);
        expect(res.body.path).not.toContain('B');
    });

    it('should return 404 for non-existent network', async () => {
        const res = await request(app.getHttpServer())
            .post(`/route/optimize/999`)
            .send({
                originNodeId: 'A',
                destinationNodeId: 'C',
            });
        expect(res.status).toBe(404);
    });

    it('should return 404 for non-existent nodes', async () => {
        const res = await request(app.getHttpServer())
            .post(`/route/optimize/${networkId}`)
            .send({
                originNodeId: 'X',
                destinationNodeId: 'Y',
            });
        expect(res.status).toBe(404);
    });
});
