import { UISelect } from "@apollo/apollo-ui-reactjs";
import { UISelectionStateWithOptions, mapToOptions } from "../core";
import { useState } from "react";
import { Curve } from "./curve";

interface CurveSelectorProps {
  value: string;
  curves: Curve[];
  open: boolean;
  onChange: (curve: Curve | null) => void;
}
export const CurveSelector = (props: CurveSelectorProps) => {
//   const [curveIsOpen, setCurveIsOpen] = useState(false);
  const [curveUIState, setCurveUIState] = useState<UISelectionStateWithOptions>({
    id: props.value,
    value: "Select Curve",
    options: mapToOptions(props.curves, props.value),
    open: props.open,
  });

  const handleCurveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const id = event.target.value;
    const curve = props.curves.find((curve) => curve.id === id);

    setCurveUIState({
      ...curveUIState,
      open: false,
      value: curve?.name || "Select Curve",
      id: curve?.id || "0",
      options: mapToOptions(props.curves, id),
    });
    props.onChange(curve || null);
  };

  const toggleCurveOpen = (open: boolean) => {
    setCurveUIState({
      ...curveUIState,
      open,
    });
  }

  return (
    <UISelect
      name="curve"
      id="curveID"
      label="Curves"
      placeholder={curveUIState.value}
      open={curveUIState.open}
      onClose={() => toggleCurveOpen(false)}
      onOpen={() => toggleCurveOpen(true)}
      onChange={handleCurveChange}
      options={curveUIState.options || []}
    />
  );
};
