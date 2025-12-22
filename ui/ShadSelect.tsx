import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectLabel } from '@radix-ui/react-select';

interface SelectItem {
  label: string;
  value: string;
}

interface ShadSelectProps {
  options: SelectItem[];
  handleChange: (value: string) => void;
  value: string;
  placeholder?: string;
  className?: string;
  selectLabel?: string;
}

export function ShadSelect({
  value,
  options,
  handleChange,
  placeholder,
  selectLabel,
}: ShadSelectProps) {
  return (
    <Select onValueChange={handleChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder || 'Select'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectLabel && (
            <SelectLabel className="p-2 text-xs">{selectLabel}</SelectLabel>
          )}
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
