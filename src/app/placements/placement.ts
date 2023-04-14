 import { ApolloData } from '../core';
  export interface Placement extends ApolloData {
    farmId: string;
    curveId: string;
    houseId: string;
    placementDate: Date;
  }
  
  export const defaultPlacement: Placement = {
    id: '0',
    farmId: '0',
    houseId: '0',
    curveId: '0',
    placementDate: new Date(),
  }

  