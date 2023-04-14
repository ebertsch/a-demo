export interface IOption  {
    label: string;
    subLabel?: string;
    disabled?: boolean;
    value: string;
    selected?: boolean;
    
}

interface MapToOptionsFilter {
  prop: string
  value: string
}

interface OptionData {
  id: string
  name: string
}


export const mapToOptions = (data: OptionData[], id: string, filter?: MapToOptionsFilter) => {
  console.log('mapToOptions', data, id, filter)
    const filtered = filter ? data.filter(item => ((item as any)[filter.prop] as string) === filter.value) : data;
    return filtered.map(item => ({
      value: item.id,
      label: item.name,
      selected: item.id === id
    }));
  }