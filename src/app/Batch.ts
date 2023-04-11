 import { ApolloData } from './Farm';
  export interface Batch extends ApolloData {
    farmId: number;
    curveId: number;
    houseId: number;
    placementDate: Date;
  }
  