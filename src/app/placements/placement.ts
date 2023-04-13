 import { ApolloData } from '../core';
  export interface Placement extends ApolloData {
    farmId: number;
    curveId: number;
    houseId: number;
    placementDate: Date;
  }
  
  export const defaultPlacement: Placement = {
    id: 0,
    farmId: 0,
    houseId: 0,
    curveId: 0,
    placementDate: new Date(),
  }