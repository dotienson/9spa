export default function Logo({ className = 'h-16' }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="9 p.m. SkinCare — personal magic"
      decoding="sync"
      fetchPriority="high"
      draggable={false}
      className={`object-contain select-none ${className}`}
    />
  );
}
