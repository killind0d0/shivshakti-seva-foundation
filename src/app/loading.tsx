export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 space-y-3">
      <div className="w-10 h-10 border-4 border-brand-cream-300 border-t-brand-maroon-800 rounded-full animate-spin" />
      <p className="text-sm font-bold text-brand-maroon-900">
        लोड हो रहा है...
      </p>
    </div>
  );
}
