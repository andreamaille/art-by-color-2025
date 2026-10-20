import UnderlineField from "@/app/components/UnderlineField";

interface TextPanelProps {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  suggestions?: readonly string[];
  onChange: (value?: string) => void;
}

/** One underlined text field that applies on Enter or when focus leaves it. */
const TextPanel = ({
  id,
  label,
  placeholder,
  value,
  suggestions,
  onChange,
}: TextPanelProps) => {
  const commit = (input: string) => {
    const next = input.trim() || undefined;
    if (next !== value) onChange(next);
  };

  return (
    <div className="pb-5">
      <UnderlineField
        key={value}
        id={id}
        label={label}
        defaultValue={value ?? ""}
        placeholder={placeholder}
        list={suggestions ? `${id}-list` : undefined}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit(e.currentTarget.value);
        }}
      />
      {suggestions && (
        <datalist id={`${id}-list`}>
          {suggestions.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
      )}
    </div>
  );
};

export default TextPanel;
