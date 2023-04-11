export interface ApolloData {
  id: string;
}

export interface Collapsed {
  collapsed: boolean;
}

type CollapseableFarm = Farm & Collapsed;

export interface Farm extends ApolloData {
  name: string;
}


const data: CollapseableFarm[] = []

export const FARMS: Farm[] = [
  { id: '1', name: 'Farm 1' },
  { id: '2', name: 'Farm 2' },
  { id: '3', name: 'Farm 3' },
  { id: '4', name: 'Farm 4' },
  { id: '5', name: 'Farm 5' },
  { id: '6', name: 'Farm 6' },
  { id: '7', name: 'Farm 7' },
];


