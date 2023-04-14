import { UISelect } from "@apollo/apollo-ui-reactjs";
import { UISelectionStateWithOptions, mapToOptions } from "../core";
import { useState } from "react";
import { Farm } from "./farm";

interface FarmSelectorProps {
  value: string;
  farms: Farm[];
  open: boolean;
  onChange: (farm: Farm | null) => void;
}
export const FarmSelector = (props: FarmSelectorProps) => {
//   const [farmIsOpen, setFarmIsOpen] = useState(false);
  const [farmUIState, setFarmUIState] = useState<UISelectionStateWithOptions>({
    id: props.value,
    value: "Select Farm",
    options: mapToOptions(props.farms, props.value),
    open: props.open,
  });

  const handleFarmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const id = event.target.value;
    const farm = props.farms.find((farm) => farm.id === id);

    setFarmUIState({
      ...farmUIState,
      open: false,
      value: farm?.name || "Select Farm",
      id: farm?.id || "0",
      options: mapToOptions(props.farms, id),
    });
    props.onChange(farm || null);
  };

  const toggleFarmOpen = (open: boolean) => {
    setFarmUIState({
      ...farmUIState,
      open,
    });
  }

  return (
    <UISelect
      name="farm"
      id="farmID"
      label="Farms"
      placeholder={farmUIState.value}
      open={farmUIState.open}
      onClose={() => toggleFarmOpen(false)}
      onOpen={() => toggleFarmOpen(true)}
    //   onClickOutside={() => toggleFarmOpen(false)}
      onChange={handleFarmChange}
      options={farmUIState.options || []}
    />
  );
};
