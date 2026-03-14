export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-400">
      <div className="animate-pulse w-64 h-64 rounded-xl bg-yellow-900/20 mb-6" />
      <div className="h-6 w-48 bg-yellow-900/30 rounded mb-2 animate-pulse" />
      <div className="h-4 w-32 bg-yellow-900/20 rounded mb-2 animate-pulse" />
      <div className="h-4 w-24 bg-yellow-900/10 rounded mb-4 animate-pulse" />
      <div className="h-10 w-64 bg-yellow-900/20 rounded mb-8 animate-pulse" />
      <div className="h-4 w-40 bg-yellow-900/10 rounded mb-2 animate-pulse" />
      <div className="h-4 w-32 bg-yellow-900/10 rounded mb-2 animate-pulse" />
    </div>
  );
}
