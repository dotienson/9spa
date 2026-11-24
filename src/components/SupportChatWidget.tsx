import { MessageCircle } from 'lucide-react';

export default function SupportChatWidget() {
  return (
    <a
      href="https://zalo.me/0374558669"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hỗ trợ tư vấn trực tiếp qua Zalo"
      className="fixed right-4 sm:right-6 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-6 z-40 inline-flex items-center gap-2 h-12 sm:h-[50px] px-4 sm:px-5 rounded-full bg-[#0068FF] hover:bg-[#0055D4] text-white shadow-[0_12px_28px_-6px_rgba(0,104,255,0.5)] ring-1 ring-white/25 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0068FF]/50 focus-visible:ring-offset-2"
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      <span className="text-sm font-semibold tracking-[-0.01em] whitespace-nowrap">
        Hỗ trợ
      </span>
    </a>
  );
}
