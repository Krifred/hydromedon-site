interface ItemLabelProps {
  label: "Song Bundle" | "Lead Sheet";
}

export default function ItemLabel({ label }: ItemLabelProps) {
  return (
    <div className="absolute bottom-3 left-3 pointer-events-none">
      <span className="
        text-[10px]
        tracking-[0.25em]
        uppercase
        font-medium
        text-white/90
        bg-black/40
        backdrop-blur-sm
        px-2 py-1
        rounded-sm
      ">
        {label}
      </span>
    </div>
  );
}