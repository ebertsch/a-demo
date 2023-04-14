export interface IOption  {
    label: string;
    subLabel?: string;
    disabled?: boolean;
    value: string;
    selected?: boolean;
    
}

export const mapToOptions = (data: {id: string, name: string}[],id: string) => {
    return data.map(item => ({
      value: item.id,
      label: item.name,
      selected: item.id === id
    }));
  }