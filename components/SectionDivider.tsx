export default function SectionDivider() {
    return (
        <div
            aria-hidden
            className="relative h-10 w-full overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent" />
            <div className="absolute left-1/2 top-1/2 h-px w-[70%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-yellow-500/70 to-transparent blur-[0.2px]" />
        </div>
    );
}
``