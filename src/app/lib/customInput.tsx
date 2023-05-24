import React from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";

interface CustomProps {
  onChange: (event: { target: { value: string } }) => void; // eslint-disable-line no-unused-vars
  format: string;
}

export const CustomInputNumber = React.forwardRef<PatternFormatProps, CustomProps>(function CustomInput(props, ref) {
  const { onChange, ...other } = props;
  return (
    <PatternFormat
      {...other}
      getInputRef={ref}
      format="%%/%%"
      patternChar="%"
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
    />
  );
});
