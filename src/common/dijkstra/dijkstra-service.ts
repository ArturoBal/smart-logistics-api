import dijkstra from 'node-dijkstra';
import { PathResult } from '../interfaces/dijkstra-path-result';

export function findShortestPath(graph: any, start: string, goal: string,): string[] | PathResult {
    const route = new dijkstra(graph);
    return route.path(start, goal, { cost: true });
}