import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FiltroSelectProps<T> {
  label: string;
  value?: T;
  options: { id: number; nome: string }[];
  placeholder?: string;
  onChange: (id?: number) => void;
}

const FiltroSelect = ({ label, value, options, placeholder, onChange }: FiltroSelectProps<number>) => (
  <div>
    <Label className="text-sm font-semibold mb-3 block">{label}</Label>
    <Select
      value={value?.toString()}
      onValueChange={(v) => onChange(v ? Number(v) : undefined)}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder || "Selecione"} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.id} value={o.id.toString()}>
            {o.nome}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default FiltroSelect;
