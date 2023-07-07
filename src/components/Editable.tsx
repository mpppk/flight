import { TextInput } from "./TextInput";
import { ReactNode } from "react";

export const EditableText = (props: {
  text: string;
  editing: boolean;
  children: ReactNode;
  onChange: (text: string, editing: boolean) => void;
}) => {
  const handleBlur = (text: string) => {
    props.onChange(text, false);
  };
  const handleClickCheck = (text: string) => {
    props.onChange(text, false);
  };
  const handleChange = (text: string) => {
    props.onChange(text, true);
  };
  if (!props.editing) {
    return <>{props.children}</>;
  }
  return (
    <TextInput
      text={props.text}
      onBlur={handleBlur}
      onClickCheck={handleClickCheck}
      onChange={handleChange}
    />
  );
};
