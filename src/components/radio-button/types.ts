export interface RadioButtonProps {
  label: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
}
