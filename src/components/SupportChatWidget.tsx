import { MessageCircle } from 'lucide-react';

export default function SupportChatWidget() {
  return (
    <a
      href="https://zalo.me/0374558669"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hỗ trợ tư vấn trực tiếp qua Zalo"
      className="fixed right-4 sm:right-6 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-6 z-40 inline-flex items-center gap-2 h-11 sm:h-12 px-4 sm:px-4.5 rounded-full bg-[#0068FF] hover:bg-[#0055D4] text-white shadow-[0_6px_16px_-4px_rgba(0,104,255,0.35)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0068FF]/50 focus-visible:ring-offset-2"
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      <span className="text-sm font-semibold tracking-[-0.01em] whitespace-nowrap">
        Hỗ trợ
      </span>
    </a>
  );
}
