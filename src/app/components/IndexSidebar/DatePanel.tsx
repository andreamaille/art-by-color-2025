import UnderlineField from "@/app/components/UnderlineField";

interface DatePanelProps {
  from?: number;
  to?: number;
  onChange: (range: { from?: number; to?: number }) => void;
}

// Years only. Blank means no limit; a minus sign is BCE.
const DatePanel = ({ from, to, onChange }: DatePanelProps) => {
  const commit = (field: "from" | "to", input: string) => {
    const trimmed = input.trim();
    const year = trimmed === "" ? undefined : Number.parseInt(trimmed, 10);
    if (year !== undefined && Number.isNaN(year)) return;
    if (year === (field === "from" ? from : to)) return;
    onChange({ from, to, [field]: year });
  };

  const fieldProps = (field: "from" | "to", value?: number) => ({
    key: `${field}-${value}`,
    inputMode: "numeric" as const,
    defaultValue: value ?? "",
    onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
      commit(field, e.target.value),
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") commit(field, e.currentTarget.value);
    },
  });

  return (
    <div className="flex flex-col gap-1 pb-5">
      <UnderlineField
        id="date-from"
        label="From"
        placeholder="Any year"
        {...fieldProps("from", from)}
      />
      <UnderlineField
        id="date-to"
        label="To"
        placeholder="Any year"
        {...fieldProps("to", to)}
      />
    </div>
  );
};

export default DatePanel;
