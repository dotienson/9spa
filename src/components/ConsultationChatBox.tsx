import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarClock,
  Check,
  Copy,
  MessageCircle,
  RotateCcw,
} from 'lucide-react';
import {
  type ConsultationAnswers,
  type ConsultationProfile,
  type ConsultationStepId,
  type GenderOption,
  GENDER_LABELS,
  STEP_OPTIONS,
  buildZaloSummaryText,
  evaluateConsultation,
  generateMinaVoucherCode,
  getAgeReferralInfo,
  getOptionLabels,
  getPronoun,
} from '../data/consultation';
import VoucherConfettiOverlay from './VoucherConfettiOverlay';

interface StepConfig {
  id: ConsultationStepId;
  stepNumber: number;
  getQuestion: (profile: ConsultationProfile) => string;
  notePlaceholder: string;
  submitLabel: string;
}

const QUESTION_STEPS: StepConfig[] = [
  {
    id: 'needs',
    stepNumber: 2,
    getQuestion: (profile) => {
      const { callCustomerWithName, selfCall } = getPronoun(profile);
      return `Rất vui được trò chuyện cùng ${callCustomerWithName} ạ! Đợt này mình đang muốn cải thiện điều gì nhất cho làn da để ${selfCall} gợi ý đúng hướng nhé?`;
    },
    notePlaceholder: 'Hoặc ghi thêm mong muốn riêng của mình (không bắt buộc)...',
    submitLabel: 'Tiếp tục',
  },
  {
    id: 'skinCondition',
    stepNumber: 3,
    getQuestion: (profile) => {
      const { callCustomerWithName } = getPronoun(profile);
      return `Để bác sĩ nắm sát hơn, nền da hiện tại của ${callCustomerWithName} đang gặp những biểu hiện nào ạ?`;
    },
    notePlaceholder: 'Mô tả thêm vùng da hoặc tình trạng cụ thể nếu có...',
    submitLabel: 'Tiếp tục',
  },
  {
    id: 'sensitivity',
    stepNumber: 4,
    getQuestion: (profile) => {
      const { callCustomer } = getPronoun(profile);
      return `Da ${callCustomer} có dễ nhạy cảm hay cần ưu tiên làm xong đi làm ngay, không nghỉ dưỡng không ạ?`;
    },
    notePlaceholder: 'Ghi chú thêm về lịch trình hoặc độ nhạy cảm da...',
    submitLabel: 'Tiếp tục',
  },
  {
    id: 'history',
    stepNumber: 5,
    getQuestion: (profile) => {
      const { callCustomerWithName, selfCall } = getPronoun(profile);
      return `Thêm một câu cuối thôi ạ: gần đây ${callCustomerWithName} đã từng làm công nghệ, tiêm dưỡng chất hay dùng hoạt chất mạnh (treatment) chưa để ${selfCall} lưu ý bác sĩ nhé?`;
    },
    notePlaceholder: 'Ví dụ: tên sản phẩm đang dùng hoặc lần làm da gần nhất...',
    submitLabel: 'Xem đề xuất',
  },
];

const INITIAL_PROFILE: ConsultationProfile = {
  name: '',
  age: '',
  gender: 'female',
};

const INITIAL_ANSWERS: ConsultationAnswers = {
  needs: [],
  needsNote: '',
  skinCondition: [],
  skinConditionNote: '',
  sensitivity: [],
  sensitivityNote: '',
  history: [],
  historyNote: '',
};

interface ConsultationChatBoxProps {
  onActiveChange?: (isActive: boolean) => void;
}

export default function ConsultationChatBox({ onActiveChange }: ConsultationChatBoxProps) {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<ConsultationProfile>(INITIAL_PROFILE);
  const [answers, setAnswers] = useState<ConsultationAnswers>(INITIAL_ANSWERS);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'fallback'>('idle');
  const [showTextPreview, setShowTextPreview] = useState<boolean>(false);

  const [isDirectReferral, setIsDirectReferral] = useState<boolean>(false);
  const [voucherCode, setVoucherCode] = useState<string>(() => generateMinaVoucherCode());
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const isChatExpanded = step >= 2 || isDirectReferral;
  const chatRootRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const step6StartRef = useRef<HTMLDivElement | null>(null);
  const typingTimerRef = useRef<number | null>(null);
  const copyTimerRef = useRef<number | null>(null);
  const confettiTimerRef = useRef<number | null>(null);
  const fallbackTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    onActiveChange?.(isChatExpanded);
  }, [isChatExpanded, onActiveChange]);

  useEffect(() => {
    let settleTimer: number | null = null;
    let raf1: number | null = null;
    let raf2: number | null = null;

    const scrollToMina = (withSettleRetry: boolean) => {
      if (window.location.hash.toLowerCase() !== '#mina') return;

      const performScroll = () => {
        chatRootRef.current?.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      };

      if (raf1) window.cancelAnimationFrame(raf1);
      if (raf2) window.cancelAnimationFrame(raf2);
      if (settleTimer) window.clearTimeout(settleTimer);

      raf1 = window.requestAnimationFrame(() => {
        raf2 = window.requestAnimationFrame(() => {
          performScroll();
        });
      });

      if (withSettleRetry) {
        settleTimer = window.setTimeout(performScroll, 240);
      }
    };

    scrollToMina(true);

    const handleHashChange = () => scrollToMina(false);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      if (raf1) window.cancelAnimationFrame(raf1);
      if (raf2) window.cancelAnimationFrame(raf2);
      if (settleTimer) window.clearTimeout(settleTimer);
    };
  }, [prefersReducedMotion]);

  const ageReferral = useMemo(() => getAgeReferralInfo(profile), [profile]);

  const result = useMemo(() => {
    if (step < 6 || isDirectReferral) return null;
    return evaluateConsultation(profile, answers);
  }, [step, isDirectReferral, profile, answers]);

  const zaloSummaryText = useMemo(() => {
    if (!result) return '';
    return buildZaloSummaryText(profile, answers, result, voucherCode);
  }, [profile, answers, result, voucherCode]);

  const isFinalRewardVisible =
    !isTyping && ((step === 6 && Boolean(result)) || isDirectReferral);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) window.clearTimeout(typingTimerRef.current);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      if (confettiTimerRef.current) window.clearTimeout(confettiTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isFinalRewardVisible || prefersReducedMotion) {
      setShowConfetti(false);
      return;
    }

    setShowConfetti(true);
    if (confettiTimerRef.current) window.clearTimeout(confettiTimerRef.current);
    confettiTimerRef.current = window.setTimeout(() => {
      setShowConfetti(false);
    }, 2500);
  }, [isFinalRewardVisible, voucherCode, prefersReducedMotion]);

  useEffect(() => {
    if (!isChatExpanded) return;
    const container = messagesContainerRef.current;
    if (!container) return;

    let raf1: number | null = null;
    let raf2: number | null = null;

    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        if (step === 6 && !isTyping && !isDirectReferral && step6StartRef.current) {
          const containerRect = container.getBoundingClientRect();
          const targetRect = step6StartRef.current.getBoundingClientRect();
          const targetTop = Math.max(
            0,
            container.scrollTop + (targetRect.top - containerRect.top) - 12
          );
          container.scrollTo({
            top: targetTop,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
          return;
        }

        container.scrollTo({
          top: container.scrollHeight,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      });
    });

    return () => {
      if (raf1) window.cancelAnimationFrame(raf1);
      if (raf2) window.cancelAnimationFrame(raf2);
    };
  }, [step, isDirectReferral, isTyping, isChatExpanded, prefersReducedMotion]);

  // Ensure the entire chat box stays comfortably inside the user's screen viewport when expanding or changing steps
  useEffect(() => {
    if (!isChatExpanded) return;
    const timer = window.setTimeout(() => {
      const box = chatRootRef.current;
      if (!box) return;
      const rect = box.getBoundingClientRect();
      const stickyOffset = 68;
      const viewportHeight = window.innerHeight;

      if (rect.bottom > viewportHeight - 12 || rect.top < stickyOffset) {
        const targetScrollY =
          rect.height > viewportHeight - stickyOffset - 16
            ? window.scrollY + rect.top - stickyOffset
            : window.scrollY + rect.bottom - viewportHeight + 20;

        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    }, 120);

    return () => window.clearTimeout(timer);
  }, [isChatExpanded, step, isDirectReferral, prefersReducedMotion]);

  useEffect(() => {
    if (!showTextPreview || !isChatExpanded) return;
    const container = messagesContainerRef.current;
    if (!container) return;
    const raf = window.requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });
    return () => window.cancelAnimationFrame(raf);
  }, [showTextPreview, isChatExpanded, prefersReducedMotion]);

  const triggerMinaTyping = (delayMs: number) => {
    if (prefersReducedMotion) return;
    setIsTyping(true);
    if (typingTimerRef.current) window.clearTimeout(typingTimerRef.current);
    typingTimerRef.current = window.setTimeout(() => {
      setIsTyping(false);
    }, delayMs);
  };

  const advanceToStep = (nextStep: number) => {
    setErrorMsg('');
    if (nextStep === 6) {
      setVoucherCode(generateMinaVoucherCode());
    }
    setStep(nextStep);
    triggerMinaTyping(nextStep === 6 ? 1450 : 1120);
  };

  const handleStartConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = profile.name.trim();
    const parsedAge = Number(profile.age.trim());

    if (!trimmedName) {
      setErrorMsg('Cho em xin tên để tiện xưng hô nhé ạ.');
      return;
    }
    if (
      !profile.age.trim() ||
      Number.isNaN(parsedAge) ||
      !Number.isInteger(parsedAge) ||
      parsedAge < 1 ||
      parsedAge > 200
    ) {
      setErrorMsg('Vui lòng nhập số tuổi hợp lệ ạ.');
      return;
    }

    if (profile.gender === 'male') {
      setAnswers((prev) => ({
        ...prev,
        history: prev.history.filter((id) => id !== 'pregnant'),
      }));
    }

    const referralCheck = getAgeReferralInfo(profile);
    if (referralCheck.isDirectReferral) {
      setErrorMsg('');
      setVoucherCode(generateMinaVoucherCode());
      setIsDirectReferral(true);
      setStep(2);
      triggerMinaTyping(1080);
      return;
    }

    setIsDirectReferral(false);
    advanceToStep(2);
  };

  const toggleOption = (stepId: ConsultationStepId, optionId: string) => {
    setErrorMsg('');
    setAnswers((prev) => {
      const currentList = prev[stepId];
      const exists = currentList.includes(optionId);
      let nextList = exists
        ? currentList.filter((item) => item !== optionId)
        : [...currentList, optionId];

      // Mutually exclusive convenience pairs for clean UX
      if (!exists && stepId === 'sensitivity') {
        if (optionId === 'sensitive') {
          nextList = nextList.filter((i) => i !== 'resilient');
        } else if (optionId === 'resilient') {
          nextList = nextList.filter((i) => i !== 'sensitive');
        } else if (optionId === 'no_downtime') {
          nextList = nextList.filter((i) => i !== 'ok_downtime');
        } else if (optionId === 'ok_downtime') {
          nextList = nextList.filter((i) => i !== 'no_downtime');
        }
      }

      if (!exists && stepId === 'history') {
        if (optionId === 'first_time') {
          nextList = nextList.filter(
            (i) => i !== 'facial_peel' && i !== 'laser_light' && i !== 'injectable'
          );
        } else if (
          optionId === 'facial_peel' ||
          optionId === 'laser_light' ||
          optionId === 'injectable'
        ) {
          nextList = nextList.filter((i) => i !== 'first_time');
        }
      }

      return { ...prev, [stepId]: nextList };
    });
  };

  const handleNoteChange = (stepId: ConsultationStepId, value: string) => {
    setErrorMsg('');
    const noteKey = `${stepId}Note` as keyof ConsultationAnswers;
    setAnswers((prev) => ({ ...prev, [noteKey]: value }));
  };

  const handleContinueQuestionStep = (config: StepConfig) => {
    const selected = answers[config.id];
    const note = answers[`${config.id}Note` as keyof ConsultationAnswers] as string;
    if (selected.length === 0 && !note.trim()) {
      setErrorMsg('Chọn nhanh ít nhất 1 mục hoặc ghi vài dòng để em gợi ý sát nhất nhé ạ.');
      return;
    }
    advanceToStep(config.stepNumber + 1);
  };

  const handleGoBack = () => {
    if (typingTimerRef.current) window.clearTimeout(typingTimerRef.current);
    if (confettiTimerRef.current) window.clearTimeout(confettiTimerRef.current);
    setIsTyping(false);
    setShowConfetti(false);
    setErrorMsg('');
    setCopyStatus('idle');
    if (isDirectReferral) {
      setIsDirectReferral(false);
      setStep(1);
      return;
    }
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleReset = () => {
    if (typingTimerRef.current) window.clearTimeout(typingTimerRef.current);
    if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    if (confettiTimerRef.current) window.clearTimeout(confettiTimerRef.current);
    setIsTyping(false);
    setShowConfetti(false);
    setIsDirectReferral(false);
    setVoucherCode(generateMinaVoucherCode());
    setErrorMsg('');
    setCopyStatus('idle');
    setShowTextPreview(false);
    setProfile(INITIAL_PROFILE);
    setAnswers(INITIAL_ANSWERS);
    setStep(1);
  };

  const handleCopySummary = async () => {
    if (!zaloSummaryText) return;

    let copied = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(zaloSummaryText);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) {
      try {
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = zaloSummaryText;
        tempTextarea.setAttribute('readonly', '');
        tempTextarea.style.position = 'fixed';
        tempTextarea.style.opacity = '0';
        document.body.appendChild(tempTextarea);
        tempTextarea.focus();
        tempTextarea.select();
        copied = document.execCommand('copy');
        document.body.removeChild(tempTextarea);
      } catch {
        copied = false;
      }
    }

    if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);

    if (copied) {
      setCopyStatus('copied');
      copyTimerRef.current = window.setTimeout(() => {
        setCopyStatus('idle');
      }, 2600);
    } else {
      setCopyStatus('fallback');
      setShowTextPreview(true);
      window.setTimeout(() => {
        fallbackTextareaRef.current?.focus();
        fallbackTextareaRef.current?.select();
      }, 60);
    }
  };

  const formatUserBubble = (stepId: ConsultationStepId) => {
    const labels = getOptionLabels(stepId, answers[stepId]);
    const note = (answers[`${stepId}Note` as keyof ConsultationAnswers] as string).trim();
    const parts = [...labels];
    if (note) parts.push(`Ghi chú: ${note}`);
    return parts.join(' · ');
  };

  const currentQuestionConfig =
    !isDirectReferral && step >= 2 && step <= 5 ? QUESTION_STEPS[step - 2] : null;
  const visibleStepOptions = currentQuestionConfig
    ? STEP_OPTIONS[currentQuestionConfig.id].filter(
        (opt) => !(profile.gender === 'male' && opt.id === 'pregnant')
      )
    : [];
  const { callCustomer, callCustomerWithName, selfCall } = getPronoun(profile);

  return (
    <motion.div
      id="mina"
      ref={chatRootRef}
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        layout: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
      }}
      className={`chat-aura-frame scroll-mt-20 sm:scroll-mt-24 w-full ${
        isChatExpanded
          ? 'shadow-[0_14px_38px_-22px_rgba(140,103,48,0.22)]'
          : ''
      }`}
      aria-label="Hộp thoại tư vấn da cùng Mina tại 9 p.m. SkinCare"
    >
      <div className="relative z-10 flex flex-col max-h-[calc(100dvh-5rem)] sm:max-h-[min(560px,calc(100dvh-5.75rem))] bg-white/88 backdrop-blur-xl rounded-[20px] sm:rounded-[24px] overflow-hidden text-left">
        {showConfetti && <VoucherConfettiOverlay />}

        {/* Minimal Header (Zero pulsing dots / Zero pill clutter) */}
        <div className="shrink-0 flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5 sm:py-3 border-b border-black/[0.06] bg-white/55">
          <div className="flex items-center gap-2 min-w-0 text-xs">
            <span className="font-semibold text-[#8C6730] whitespace-nowrap">
              Mina · Lễ tân 9pm
            </span>
            <span className="text-[#86868B]" aria-hidden="true">
              ·
            </span>
            <span className="text-[#6E6E73] tabular-nums whitespace-nowrap">
              {isDirectReferral ? 'Kết nối bác sĩ' : `Bước ${step}/6`}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {step > 1 && step < 6 && (
              <button
                type="button"
                onClick={handleGoBack}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer py-1 px-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6730]/35"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Quay lại</span>
              </button>
            )}
            {step > 1 && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#6E6E73] hover:text-[#8C6730] transition-colors cursor-pointer py-1 px-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6730]/35"
                title="Bắt đầu lại từ đầu"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Làm lại</span>
              </button>
            )}
          </div>
        </div>

        {/* Hairline Animated Step Progress Bar */}
        <div className="shrink-0 h-[2px] w-full bg-black/[0.04] overflow-hidden" aria-hidden="true">
          <motion.div
            className="h-full w-full bg-gradient-to-r from-[#C6A876] to-[#8C6730] origin-left"
            initial={false}
            animate={{ scaleX: isDirectReferral ? 1 : step / 6 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.42,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>

        {/* Scrollable Chat History Viewport — Moderate Expansion That Always Fits Screen */}
        <div
          ref={messagesContainerRef}
          className={`flex-1 min-h-0 overflow-y-auto overscroll-contain transition-[min-height,max-height,padding] duration-300 ${
            isChatExpanded
              ? isDirectReferral
                ? 'px-4 sm:px-5 py-3.5 sm:py-4 space-y-3 min-h-[145px] sm:min-h-[165px] max-h-[32dvh] sm:max-h-[240px]'
                : step === 6
                ? 'px-4 sm:px-5 py-3.5 sm:py-4 space-y-3 min-h-[200px] sm:min-h-[230px] max-h-[38dvh] sm:max-h-[320px]'
                : 'px-4 sm:px-5 py-3.5 sm:py-4 space-y-3 min-h-[165px] sm:min-h-[195px] max-h-[28dvh] sm:max-h-[250px]'
              : 'px-4 sm:px-5 py-3.5 space-y-2.5'
          }`}
        >
          {/* Step 1 Mina Greeting Bubble (Always visible from the start) */}
          <div className="flex justify-start">
            <div className="max-w-[95%] bg-[#F7F4EE] text-[#1D1D1F] rounded-2xl rounded-tl-md px-3.5 py-2.5 text-[13.5px] sm:text-sm leading-[1.6] text-justify space-y-1.5">
              <p className="font-semibold text-[#1D1D1F]">Chào anh/chị ạ!</p>
              <p>
                Em là Mina, trực lễ tân của 9pm. Em không phải AI, em được chị Dương dạy cho 6 câu hỏi ngắn để 9pm có thể thấu hiểu và hỗ trợ mình tiếp cận với những dịch vụ bên em dễ dàng hơn ạ.
              </p>
              <p>
                Đầu tiên, cho em xin tên, tuổi và giới để em tiện xưng hô và gợi ý phù hợp nhất ạ.
              </p>
            </div>
          </div>

          {/* User Profile Answer Bubble (visible from Step 2+) */}
          {step >= 2 && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-end"
            >
              <div className="max-w-[85%] bg-[#F3E8D6] text-[#5C3F17] rounded-2xl rounded-tr-md px-3.5 py-2 text-[13px] sm:text-[13.5px] font-medium leading-snug">
                {profile.name.trim()} · {profile.age.trim()} tuổi · {GENDER_LABELS[profile.gender]}
              </div>
            </motion.div>
          )}

          {/* Direct Referral Bubble for Under 18 or Over 60 / 80 / 100 */}
          {isDirectReferral && !isTyping && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-start"
            >
              <div className="max-w-[95%] bg-[#F7F4EE] text-[#1D1D1F] rounded-2xl rounded-tl-md px-4 py-3 text-[13.5px] sm:text-sm leading-[1.65] text-justify space-y-2">
                <p className="font-semibold text-[#8C6730]">{ageReferral.greetingTitle}</p>
                <p>{ageReferral.referralMessage}</p>
                <p className="pt-1 border-t border-black/[0.06] text-[13px] sm:text-[13.5px] text-[#3A3A3C]">
                  Nếu {ageReferral.honorific} hài lòng với đoạn chat này và đến 9pm để làm đẹp, {ageReferral.selfCall} xin gửi tặng riêng voucher 5%{' '}
                  <span className="voucher-code-shimmer tabular-nums">
                    <span className="voucher-code-text">{voucherCode}</span>
                  </span>{' '}
                  cho {ageReferral.honorific} giảm giá trên tổng bill, và sếp {ageReferral.selfCall} (bác Sơn) sẽ được bác Dương khen. Vậy là ai cũng vui, {ageReferral.selfCall} vui!
                </p>
              </div>
            </motion.div>
          )}

          {/* Steps 2–5 Transcript History (only for standard 18–60 flow) */}
          {!isDirectReferral &&
            QUESTION_STEPS.map((qStep) => {
              if (step < qStep.stepNumber) return null;
              const isCurrent = step === qStep.stepNumber;
              const isAnswered = step > qStep.stepNumber;

              return (
                <React.Fragment key={qStep.id}>
                  {(!isCurrent || !isTyping) && (
                    <motion.div
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[92%] bg-[#F7F4EE] text-[#1D1D1F] rounded-2xl rounded-tl-md px-3.5 py-2.5 text-[13.5px] sm:text-sm leading-[1.6] text-justify">
                        {qStep.getQuestion(profile)}
                      </div>
                    </motion.div>
                  )}

                  {isAnswered && (
                    <motion.div
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[88%] bg-[#F3E8D6] text-[#5C3F17] rounded-2xl rounded-tr-md px-3.5 py-2 text-[13px] sm:text-[13.5px] font-medium leading-relaxed text-justify">
                        {formatUserBubble(qStep.id)}
                      </div>
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}

          {/* Lively Elastic "..." Typing Indicator Bubble for Mina */}
          {isTyping && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-start"
              aria-live="polite"
              aria-label="Mina đang soạn tin nhắn"
            >
              <div className="typing-bubble inline-flex items-center gap-2 bg-[#F7F4EE] rounded-2xl rounded-tl-md px-3.5 py-2.5">
                <span className="relative z-10 text-xs font-medium text-[#7A6A53]">
                  Mina đang gõ
                </span>
                <span className="typing-dots relative z-10" aria-hidden="true">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </span>
              </div>
            </motion.div>
          )}

        {/* Step 6 Recommendations Output */}
        {step === 6 && !isTyping && result && (
          <motion.div
            ref={step6StartRef}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <div className="flex justify-start">
              <div className="max-w-[95%] bg-[#F7F4EE] text-[#1D1D1F] rounded-2xl rounded-tl-md px-3.5 py-2.5 text-[13.5px] sm:text-sm leading-[1.6] text-justify">
                Cảm ơn {callCustomerWithName} đã chia sẻ kỹ nhé! Dựa trên tình trạng da mình vừa gửi, {selfCall} gợi ý ưu tiên {result.recommendations.length} hướng liệu trình phù hợp nhất tại 9 p.m. SkinCare ạ:
              </div>
            </div>

            {/* Recommended Service Cards (Mapped strictly from existing 6 SERVICES) */}
            <div className="space-y-2">
              {result.recommendations.map(({ service, reason }, idx) => (
                <motion.div
                  key={service.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.28,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-white/95 rounded-xl p-3 border border-black/[0.07] flex items-start gap-3"
                >
                  <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#F2F0EC] shrink-0 mt-0.5">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#8C6730]">
                      <span className="tabular-nums font-semibold">Đề xuất {idx + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#6E6E73] truncate">{service.category}</span>
                    </div>
                    <h4 className="text-[13.5px] sm:text-sm font-semibold text-[#1D1D1F] leading-snug mt-0.5">
                      {service.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-[12.5px] text-[#424245] leading-[1.58] text-justify">
                      {reason}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Clinical Safety Notes if triggered */}
            {result.safetyNotes.length > 0 && (
              <div className="bg-[#FAF4EA] rounded-xl px-3.5 py-2.5 border border-[#8C6730]/20 space-y-1.5 text-xs text-[#5C3F17] leading-[1.6] text-justify">
                {result.safetyNotes.map((note, idx) => (
                  <p key={idx}>{note}</p>
                ))}
              </div>
            )}

            <div className="flex justify-start">
              <div className="max-w-[95%] bg-[#F7F4EE] text-[#1D1D1F] rounded-2xl rounded-tl-md px-3.5 py-2.5 text-[13px] sm:text-[13.5px] leading-[1.6] text-justify space-y-2">
                <p>
                  {callCustomerWithName.charAt(0).toUpperCase() + callCustomerWithName.slice(1)} có thể bấm <strong>Copy gửi Zalo</strong> để {selfCall} gửi thông tin cho chị Dương tư vấn kỹ hơn nhé.
                </p>
                <p>
                  Nếu đã sắp xếp được thời gian, {callCustomerWithName} cũng có thể <strong>đặt lịch ghé 9pm trực tiếp</strong> ngay bên dưới (chọn <strong>Cơ bản</strong> cho thăm khám/chăm sóc gọn hoặc <strong>Chuyên sâu</strong> cho liệu trình kỹ hơn) để {selfCall} giữ khung giờ riêng cho mình ạ!
                </p>
                <p className="pt-1.5 border-t border-black/[0.06] text-[#3A3A3C]">
                  Nếu {callCustomer} hài lòng với đoạn chat này và đến 9pm để làm đẹp, {selfCall} xin gửi tặng riêng voucher 5%{' '}
                  <span className="voucher-code-shimmer tabular-nums">
                    <span className="voucher-code-text">{voucherCode}</span>
                  </span>{' '}
                  cho {callCustomer} giảm giá trên tổng bill, và sếp {selfCall} (bác Sơn) sẽ được bác Dương khen. Vậy là ai cũng vui, {selfCall} vui!
                </p>
              </div>
            </div>

            {/* Optional Text Preview / Fallback Manual Copy Box */}
            <div>
              <button
                type="button"
                onClick={() => setShowTextPreview((prev) => !prev)}
                className="text-xs font-medium text-[#8C6730] hover:text-[#725224] transition-colors cursor-pointer py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6730]/35 rounded"
              >
                {showTextPreview ? 'Ẩn nội dung tin nhắn mẫu' : 'Xem trước nội dung sẽ copy gửi Zalo'}
              </button>

              {showTextPreview && (
                <div className="mt-2">
                  <textarea
                    ref={fallbackTextareaRef}
                    readOnly
                    value={zaloSummaryText}
                    rows={7}
                    aria-label="Nội dung tóm tắt tư vấn gửi Zalo"
                    className="w-full rounded-xl bg-white border border-black/[0.08] px-3 py-2 text-xs text-[#1D1D1F] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#8C6730]/30 resize-none"
                  />
                  {copyStatus === 'fallback' && (
                    <p className="mt-1 text-[11.5px] text-[#8C6730]">
                      Trình duyệt đang giới hạn copy tự động — bạn chạm giữ vào khung chữ trên để Sao chép rồi dán sang Zalo nhé.
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Interactive Input Dock (adapts cleanly to current step) */}
      <div className="shrink-0 px-3.5 sm:px-5 py-3 border-t border-black/[0.06] bg-white/55">
        {/* Step 1: Compact Name + Age + Gender Form */}
        {step === 1 && (
          <form onSubmit={handleStartConsultation} className="space-y-2.5" noValidate>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-8">
                <label htmlFor="consult-name" className="sr-only">
                  Tên của bạn
                </label>
                <input
                  id="consult-name"
                  type="text"
                  value={profile.name}
                  onChange={(e) => {
                    setErrorMsg('');
                    setProfile((prev) => ({ ...prev, name: e.target.value }));
                  }}
                  placeholder="Tên của chị/anh..."
                  autoComplete="given-name"
                  className="w-full h-10 rounded-xl bg-white border border-black/[0.09] px-3 text-[13.5px] text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:border-[#8C6730] focus:ring-2 focus:ring-[#8C6730]/20 transition-colors"
                />
              </div>
              <div className="col-span-4">
                <label htmlFor="consult-age" className="sr-only">
                  Tuổi
                </label>
                <input
                  id="consult-age"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={200}
                  value={profile.age}
                  onChange={(e) => {
                    setErrorMsg('');
                    setProfile((prev) => ({ ...prev, age: e.target.value }));
                  }}
                  placeholder="Tuổi"
                  className="w-full h-10 rounded-xl bg-white border border-black/[0.09] px-3 text-[13.5px] text-[#1D1D1F] placeholder:text-[#86868B] tabular-nums focus:outline-none focus:border-[#8C6730] focus:ring-2 focus:ring-[#8C6730]/20 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
              <div
                className="flex items-center gap-1.5 flex-1 min-w-0"
                role="radiogroup"
                aria-label="Giới tính"
              >
                {(['female', 'male', 'other'] as GenderOption[]).map((g) => {
                  const isSelected = profile.gender === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => {
                        setProfile((prev) => ({ ...prev, gender: g }));
                        if (g === 'male') {
                          setAnswers((prev) => ({
                            ...prev,
                            history: prev.history.filter((id) => id !== 'pregnant'),
                          }));
                        }
                      }}
                      className={`flex-1 h-10 px-2.5 rounded-xl text-xs font-semibold border transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6730]/35 ${
                        isSelected
                          ? 'bg-[#F6EFE4] border-[#8C6730]/50 text-[#5C3F17]'
                          : 'bg-white border-black/[0.08] text-[#525F7F] hover:border-black/[0.18] hover:text-[#1D1D1F]'
                      }`}
                    >
                      {GENDER_LABELS[g]}
                    </button>
                  );
                })}
              </div>

              <button
                type="submit"
                className="btn-sheen-sweep w-full sm:w-auto inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl bg-[#966D31] hover:bg-[#7E5924] active:scale-[0.98] text-white text-xs sm:text-[13px] font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#966D31]/40"
              >
                <span>Bắt đầu tư vấn</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs text-[#B45309]" role="alert">
                {errorMsg}
              </p>
            )}
          </form>
        )}

        {/* Steps 2–5: Multi-Select Options + Optional Note + Continue */}
        {currentQuestionConfig && !isTyping && (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5 max-h-[26dvh] sm:max-h-none overflow-y-auto overscroll-contain pr-0.5">
              {visibleStepOptions.map((option) => {
                const isSelected = answers[currentQuestionConfig.id].includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleOption(currentQuestionConfig.id, option.id)}
                    className={`inline-flex items-center gap-1.5 min-h-[34px] sm:min-h-[36px] px-2.5 sm:px-3 py-1 rounded-xl text-xs font-medium border text-left transition-all duration-150 active:scale-[0.97] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6730]/35 ${
                      isSelected
                        ? 'bg-[#F6EFE4] border-[#8C6730]/55 text-[#5C3F17] font-semibold'
                        : 'bg-white border-black/[0.08] text-[#1D1D1F] hover:border-black/[0.18]'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#8C6730] shrink-0" />}
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                value={
                  answers[`${currentQuestionConfig.id}Note` as keyof ConsultationAnswers] as string
                }
                onChange={(e) => handleNoteChange(currentQuestionConfig.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleContinueQuestionStep(currentQuestionConfig);
                  }
                }}
                placeholder={currentQuestionConfig.notePlaceholder}
                aria-label="Ghi chú thêm"
                className="flex-1 h-10 rounded-xl bg-white border border-black/[0.09] px-3 text-xs sm:text-[13px] text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:border-[#8C6730] focus:ring-2 focus:ring-[#8C6730]/20 transition-colors"
              />
              <button
                type="button"
                onClick={() => handleContinueQuestionStep(currentQuestionConfig)}
                className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl bg-[#966D31] hover:bg-[#7E5924] text-white text-xs sm:text-[13px] font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#966D31]/40"
              >
                <span>{currentQuestionConfig.submitLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs text-[#B45309]" role="alert">
                {errorMsg}
              </p>
            )}
          </div>
        )}

        {/* Direct Doctor Referral Dock (<18 or >60 / >80 / >100) */}
        {isDirectReferral && !isTyping && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <a
              href="https://zalo.me/0374558669"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#0068FF] hover:bg-[#0055D4] text-white text-[13px] sm:text-sm font-semibold transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0068FF]/40"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Mở Zalo gặp trực tiếp bác sĩ</span>
            </a>
          </div>
        )}

        {/* Step 6: Copy + Open Zalo + Direct Booking Buttons */}
        {!isDirectReferral && step === 6 && !isTyping && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className={`inline-flex items-center justify-center gap-1.5 min-h-[42px] sm:min-h-[44px] px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-[13px] font-semibold text-white transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
                  copyStatus === 'copied'
                    ? 'bg-[#096B46] focus-visible:ring-[#0C7F54]/40'
                    : 'bg-[#0C7F54] hover:bg-[#096B46] focus-visible:ring-[#0C7F54]/40'
                }`}
              >
                {copyStatus === 'copied' ? (
                  <>
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>Đã copy nội dung</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 shrink-0" />
                    <span>Copy gửi Zalo</span>
                  </>
                )}
              </button>

              <a
                href="https://zalo.me/0374558669"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 min-h-[42px] sm:min-h-[44px] px-2.5 sm:px-3 py-2 rounded-xl bg-[#0068FF] hover:bg-[#0055D4] text-white text-xs sm:text-[13px] font-semibold transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0068FF]/40"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Mở Zalo ngay</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Desktop Cal.com Popup Triggers */}
              <button
                type="button"
                data-cal-link="9pmskincare/basic"
                data-cal-namespace="basic"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="hidden md:inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2 rounded-xl bg-[#F6EFE4] hover:bg-[#EDE0CC] text-[#5C3F17] border border-[#8C6730]/22 text-[13px] font-semibold transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6730]/40"
              >
                <Calendar className="w-3.5 h-3.5 text-[#8C6730] shrink-0" />
                <span>Đặt lịch cơ bản</span>
              </button>

              <button
                type="button"
                data-cal-link="9pmskincare/120min"
                data-cal-namespace="120min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="hidden md:inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2 rounded-xl bg-[#966D31] hover:bg-[#7E5924] text-white text-[13px] font-semibold transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#966D31]/40"
              >
                <CalendarClock className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <span>Đặt lịch chuyên sâu</span>
              </button>

              {/* Mobile Direct Booking Links */}
              <a
                href="https://cal.com/9pmskincare/basic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex md:hidden items-center justify-center gap-1.5 min-h-[42px] px-2.5 py-2 rounded-xl bg-[#F6EFE4] hover:bg-[#EDE0CC] text-[#5C3F17] border border-[#8C6730]/22 text-xs font-semibold transition-colors duration-150 whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 text-[#8C6730] shrink-0" />
                <span>Đặt lịch cơ bản</span>
              </a>

              <a
                href="https://cal.com/9pmskincare/120min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex md:hidden items-center justify-center gap-1.5 min-h-[42px] px-2.5 py-2 rounded-xl bg-[#966D31] hover:bg-[#7E5924] text-white text-xs font-semibold transition-colors duration-150 whitespace-nowrap"
              >
                <CalendarClock className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <span>Đặt lịch chuyên sâu</span>
              </a>
            </div>
          </div>
        )}
      </div>
      </div>
    </motion.div>
  );
}
