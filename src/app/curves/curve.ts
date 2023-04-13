
import { ApolloData } from '../core';

export interface Point {
    Day: number;
    value: number;
}
export type Points = Point[];


export interface Curve extends ApolloData {
    name: string;
    points: Points
}