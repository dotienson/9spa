export default function Logo({ className = "h-16" }: { className?: string }) {
  return (
    <img src="/logo.png" alt="9PM Skincare Logo" className={`object-contain ${className}`} />
  );
}
