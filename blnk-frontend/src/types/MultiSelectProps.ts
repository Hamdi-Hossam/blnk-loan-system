type Option = {
  value: string;
  label: string;
};

export type MultiSelectProps = {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
};
