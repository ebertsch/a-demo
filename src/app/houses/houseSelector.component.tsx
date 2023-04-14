import { UISelect } from "@apollo/apollo-ui-reactjs";
import { UISelectionStateWithOptions, mapToOptions } from "../core";
import { useState } from "react";
import { House } from "./house";

interface HouseSelectorProps {
  farmId: string;
  value: string;
  houses: House[];
  open: boolean;
  onChange: (house: House | null) => void;
}
export const HouseSelector = (props: HouseSelectorProps) => {
//   const [houseIsOpen, setHouseIsOpen] = useState(false);

  const [houseUIState, setHouseUIState] = useState<UISelectionStateWithOptions>({
    id: props.value,
    value: "Select House",
    options: [],
    open: props.open,
  });

  const handleHouseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const id = event.target.value;
    const house = props.houses.find((house) => house.id === id);
    console.log("handleHouseChange", props);
    setHouseUIState({
      ...houseUIState,
      open: false,
      value: house?.name || "Select House",
      id: house?.id || "0",
      options: [],
    });
    props.onChange(house || null);
  };

  const toggleHouseOpen = (open: boolean) => {
    setHouseUIState({
      ...houseUIState,
      open,
    });
  }

  return (
    <>
      {console.log("houseUIState ------> ", houseUIState)}
      <UISelect
        name="house"
        id="houseID"
        label="Houses"
        placeholder={houseUIState.value}
        open={houseUIState.open}
        onClose={() => toggleHouseOpen(false)}
        onOpen={() => toggleHouseOpen(true)}
        onChange={handleHouseChange}
        options={mapToOptions(props.houses, props.value, { prop: "farmId", value: props.farmId })}
      />
    </>
  );
};
