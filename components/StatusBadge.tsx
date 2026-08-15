import clsx from "clsx";

const styles = {
  Established: "border-[#3d7d72] bg-[#17302c] text-[#9ee3d8]",
  "Strong Evidence": "border-[#52733d] bg-[#1e2d1b] text-[#b7db94]",
  "Active Research": "border-[#805f2e] bg-[#302414] text-[#f3cb82]",
  Hypothesis: "border-[#844f3c] bg-[#321d17] text-[#f3a78c]",
  Unknown: "border-[#66547c] bg-[#251d2d] text-[#cbb2e5]",
};

export function StatusBadge({ status }: { status: keyof typeof styles }) {
  return <span className={clsx("inline-flex border px-2 py-1 text-[11px] font-semibold", styles[status])}>{status}</span>;
}
