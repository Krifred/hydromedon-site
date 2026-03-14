/* ==========================================================
   PriceTag — displays a price string
   ========================================================== */

interface PriceTagProps {
    price: string;
}

export default function PriceTag({ price }: PriceTagProps) {
    return (
        <span className="text-sm text-yellow-400/80 font-light tracking-wide">
            {price}
        </span>
    );
}
