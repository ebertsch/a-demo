import { ApolloData } from "../core/apolloData";

export interface Farm extends ApolloData {
  name: string;
}

export const mapFarmsToOptions = (farms: Farm[],id: string) => {
  return farms.map(farm => ({
    value: farm.id.toString(),
    label: farm.name,
    selected: farm.id.toString() === id
  }));
}
