import type { ReactNode } from "react";
import Eyebrow from "@/app/components/Eyebrow";

/** Artwork metadata set like a museum wall label. Rows without a value are skipped. */
const WallLabel = ({
  rows,
}: {
  rows: { label: string; value?: ReactNode }[];
}) => (
  <dl className="m-0 grid grid-cols-[112px_minmax(0,1fr)] gap-x-6 gap-y-3 border-t border-hairline pt-6 text-sm leading-normal">
    {rows
      .filter((row) => row.value)
      .map(({ label, value }) => (
        <div key={label} className="contents">
          <Eyebrow as="dt" className="pt-0.5">
            {label}
          </Eyebrow>
          <dd className="m-0">{value}</dd>
        </div>
      ))}
  </dl>
);

export default WallLabel;
