import { SERVICES, type ServiceItem } from './services';

export type GenderOption = 'female' | 'male' | 'other';

export type ConsultationStepId =
  | 'needs'
  | 'skinCondition'
  | 'sensitivity'
  | 'history';

export interface SelectOption {
  id: string;
  label: string;
  weights?: Partial<Record<string, number>>;
}

export interface ConsultationProfile {
  name: string;
  age: string;
  gender: GenderOption;
}

export interface ConsultationAnswers {
  needs: string[];
  needsNote: string;
  skinCondition: string[];
  skinConditionNote: string;
  sensitivity: string[];
  sensitivityNote: string;
  history: string[];
  historyNote: string;
}

export interface RecommendedService {
  service: ServiceItem;
  reason: string;
}

export interface ConsultationResult {
  recommendations: RecommendedService[];
  safetyNotes: string[];
}

export const GENDER_LABELS: Record<GenderOption, string> = {
  female: 'Nữ',
  male: 'Nam',
  other: 'Khác',
};

export interface AgeReferralInfo {
  isDirectReferral: boolean;
  greetingTitle: string;
  referralMessage: string;
  honorific: string;
  selfCall: string;
}

const VALID_VOUCHER_NUMBERS = [15, 30, 45, 60, 75, 90].filter(
  (n) => n % 3 === 0 && n % 5 === 0
);

export function generateMinaVoucherCode(): string {
  const picked =
    VALID_VOUCHER_NUMBERS[Math.floor(Math.random() * VALID_VOUCHER_NUMBERS.length)];
  return `MINA-${String(picked).padStart(2, '0')}`;
}

export function getAgeReferralInfo(profile: ConsultationProfile): AgeReferralInfo {
  const age = Number(profile.age.trim());
  const trimmedName = profile.name.trim();
  const nameSuffix = trimmedName ? ` ${trimmedName}` : '';

  if (!Number.isNaN(age) && age < 18) {
    return {
      isDirectReferral: true,
      greetingTitle: `Chào em${nameSuffix} nha!`,
      referralMessage:
        'Riêng với em thì chị sẽ chuyển tiếp mình đến gặp trực tiếp bác sĩ để tư vấn nha!',
      honorific: 'em',
      selfCall: 'chị',
    };
  }

  if (!Number.isNaN(age) && age > 100) {
    const title = profile.gender === 'male' ? 'thần tiên đại huynh' : 'thần tiên tỉ tỉ';
    return {
      isDirectReferral: true,
      greetingTitle: `Chào ${title}${nameSuffix} ạ!`,
      referralMessage: `Riêng với ${title} thì em sẽ chuyển tiếp mình đến gặp trực tiếp bác sĩ để tư vấn ạ!`,
      honorific: title,
      selfCall: 'em',
    };
  }

  if (!Number.isNaN(age) && age > 80) {
    return {
      isDirectReferral: true,
      greetingTitle: `Chào cụ${nameSuffix} ạ!`,
      referralMessage:
        'Riêng với cụ thì em sẽ chuyển tiếp mình đến gặp trực tiếp bác sĩ để tư vấn ạ!',
      honorific: 'cụ',
      selfCall: 'em',
    };
  }

  if (!Number.isNaN(age) && age > 60) {
    return {
      isDirectReferral: true,
      greetingTitle: `Chào bác${nameSuffix} ạ!`,
      referralMessage:
        'Riêng với bác thì em sẽ chuyển tiếp mình đến gặp trực tiếp bác sĩ để tư vấn ạ!',
      honorific: 'bác',
      selfCall: 'em',
    };
  }

  return {
    isDirectReferral: false,
    greetingTitle: '',
    referralMessage: '',
    honorific: '',
    selfCall: 'em',
  };
}

export function getPronoun(profile: ConsultationProfile): {
  callCustomer: string;
  callCustomerWithName: string;
  selfCall: string;
  customerSelf: string;
} {
  const trimmedName = profile.name.trim();
  if (profile.gender === 'female') {
    return {
      callCustomer: 'chị',
      callCustomerWithName: trimmedName ? `chị ${trimmedName}` : 'chị',
      selfCall: 'em',
      customerSelf: 'chị',
    };
  }
  if (profile.gender === 'male') {
    return {
      callCustomer: 'anh',
      callCustomerWithName: trimmedName ? `anh ${trimmedName}` : 'anh',
      selfCall: 'em',
      customerSelf: 'anh',
    };
  }
  return {
    callCustomer: 'mình',
    callCustomerWithName: trimmedName ? `bạn ${trimmedName}` : 'bạn',
    selfCall: 'em',
    customerSelf: 'mình',
  };
}

export const STEP_OPTIONS: Record<ConsultationStepId, SelectOption[]> = {
  needs: [
    {
      id: 'acne_clean',
      label: 'Trị mụn & làm sạch sâu',
      weights: { 'acne-care': 4, dpl: 2 },
    },
    {
      id: 'glow_hydrate',
      label: 'Căng bóng, cấp ẩm, phục hồi da',
      weights: { 'skin-booster': 4 },
    },
    {
      id: 'rejuvenate_scar',
      label: 'Trẻ hoá, mờ sẹo / xử lý nốt nổi',
      weights: { laser: 4, 'skin-booster': 1 },
    },
    {
      id: 'calm_redness',
      label: 'Giảm đỏ, dịu da & đều màu nền da',
      weights: { dpl: 4, 'skin-booster': 1 },
    },
    {
      id: 'relax_wrinkle',
      label: 'Thư giãn cơ mặt, mờ nhăn cau mày',
      weights: { 'muscle-relaxation': 5 },
    },
    {
      id: 'hair_free',
      label: 'Triệt lông êm dịu (tay, chân, từng vùng)',
      weights: { 'hair-removal': 5 },
    },
  ],
  skinCondition: [
    {
      id: 'clogged_acne',
      label: 'Mụn ẩn, mụn viêm, bí lỗ chân lông',
      weights: { 'acne-care': 4, dpl: 2 },
    },
    {
      id: 'dry_dull',
      label: 'Da khô, thiếu ẩm, kém rạng rỡ',
      weights: { 'skin-booster': 3 },
    },
    {
      id: 'red_post_acne',
      label: 'Thâm mụn, nền da dễ ửng đỏ',
      weights: { dpl: 4, 'acne-care': 1 },
    },
    {
      id: 'scars_texture',
      label: 'Sẹo rỗ, bề mặt kém mịn / có nốt nổi',
      weights: { laser: 4 },
    },
    {
      id: 'dynamic_lines',
      label: 'Nếp nhăn động, cau mày / cơ mặt căng',
      weights: { 'muscle-relaxation': 4 },
    },
    {
      id: 'body_hair',
      label: 'Lông rậm, dễ rát khi cạo hoặc wax',
      weights: { 'hair-removal': 4 },
    },
    {
      id: 'healthy_maintain',
      label: 'Nền da khá ổn, muốn duy trì khoẻ đẹp',
      weights: { 'skin-booster': 2, 'acne-care': 2 },
    },
  ],
  sensitivity: [
    {
      id: 'sensitive',
      label: 'Da nhạy cảm, mỏng dễ ửng đỏ',
      weights: { dpl: 2, 'skin-booster': 2 },
    },
    {
      id: 'resilient',
      label: 'Da khoẻ, ít khi kích ứng',
    },
    {
      id: 'no_downtime',
      label: 'Cần đi làm ngay, không muốn bong tróc',
      weights: { dpl: 1, 'skin-booster': 1, 'acne-care': 1 },
    },
    {
      id: 'ok_downtime',
      label: 'Có thể nghỉ dưỡng nhẹ vài ngày để đạt hiệu quả sâu',
      weights: { laser: 2 },
    },
  ],
  history: [
    {
      id: 'first_time',
      label: 'Chưa từng làm thủ thuật thẩm mỹ',
    },
    {
      id: 'facial_peel',
      label: 'Từng chăm sóc da / lấy nhân mụn / peel',
    },
    {
      id: 'laser_light',
      label: 'Từng làm Laser hoặc ánh sáng (IPL, DPL)',
    },
    {
      id: 'injectable',
      label: 'Từng tiêm Skin Booster / thư giãn cơ',
    },
    {
      id: 'active_treatment',
      label: 'Đang dùng Retinol / Tretinoin / Acid tại nhà',
    },
    {
      id: 'pregnant',
      label: 'Đang mang thai hoặc cho con bú',
    },
  ],
};

export function getOptionLabels(stepId: ConsultationStepId, selectedIds: string[]): string[] {
  const options = STEP_OPTIONS[stepId];
  return selectedIds
    .map((id) => options.find((opt) => opt.id === id)?.label)
    .filter((label): label is string => Boolean(label));
}

function buildPersonalizedReason(
  serviceId: string,
  profile: ConsultationProfile,
  answers: ConsultationAnswers
): string {
  const { callCustomer } = getPronoun(profile);
  const wantsNoDowntime = answers.sensitivity.includes('no_downtime');
  const isSensitive = answers.sensitivity.includes('sensitive');

  switch (serviceId) {
    case 'laser':
      return `Rất hợp để tái thiết bề mặt, cải thiện sẹo, nốt nổi và trẻ hoá sâu cho da ${callCustomer} với Laser Fractional CO2 do bác sĩ trực tiếp căn chỉnh năng lượng.`;
    case 'skin-booster':
      return `Giúp cấp ẩm sâu, phục hồi hàng rào bảo vệ và nuôi nền da ${callCustomer} căng mịn rạng rỡ với phác đồ Skin Booster tuỳ chỉnh theo nền da thực tế.`;
    case 'dpl':
      return isSensitive || wantsNoDowntime
        ? `Công nghệ ánh sáng DPL êm dịu, không cần nghỉ dưỡng — rất hợp để làm dịu nền da dễ đỏ, hỗ trợ kháng viêm trị mụn và đều màu da cho ${callCustomer}.`
        : `Ánh sáng xung động DPL giúp kháng viêm trị mụn, giảm thâm đỏ và củng cố cấu trúc nền da khoẻ mạnh, đều màu hơn cho ${callCustomer}.`;
    case 'acne-care':
      return `Làm sạch sâu lỗ chân lông nhẹ nhàng bằng AquaPeel kết hợp kiểm soát mụn chuẩn y khoa, giúp nền da ${callCustomer} thông thoáng và hạn chế thâm sau mụn.`;
    case 'hair-removal':
      return `Công nghệ DPL lạnh làm mát tức thì giúp triệt lông êm dịu từng vùng hoặc tay, chân mà vẫn giữ bề mặt da ${callCustomer} mịn màng, không rát.`;
    case 'muscle-relaxation':
      return `Giúp thả lỏng vùng cơ căng cứng và làm mềm nếp nhăn động theo giải phẫu gương mặt, giữ trọn thần thái thanh thoát tự nhiên cho ${callCustomer}.`;
    default:
      return `Phù hợp với nhu cầu chăm sóc nền da hiện tại của ${callCustomer}, bác sĩ sẽ thăm khám trực tiếp để cá nhân hoá thông số tối ưu nhất.`;
  }
}

export function evaluateConsultation(
  profile: ConsultationProfile,
  answers: ConsultationAnswers
): ConsultationResult {
  const scores: Record<string, number> = {
    laser: 0,
    'skin-booster': 0,
    dpl: 0,
    'acne-care': 0,
    'hair-removal': 0,
    'muscle-relaxation': 0,
  };

  const applyWeights = (stepId: ConsultationStepId, selectedIds: string[]) => {
    const options = STEP_OPTIONS[stepId];
    for (const id of selectedIds) {
      const opt = options.find((o) => o.id === id);
      if (!opt?.weights) continue;
      for (const [serviceId, weight] of Object.entries(opt.weights)) {
        if (typeof weight === 'number' && serviceId in scores) {
          scores[serviceId] += weight;
        }
      }
    }
  };

  applyWeights('needs', answers.needs);
  applyWeights('skinCondition', answers.skinCondition);
  applyWeights('sensitivity', answers.sensitivity);

  // Lightweight keyword scan across optional free-text notes
  const allNotes = [
    answers.needsNote,
    answers.skinConditionNote,
    answers.sensitivityNote,
    answers.historyNote,
  ]
    .join(' ')
    .toLowerCase();

  if (/(sẹo|rỗ|nốt ruồi|mụn thịt|tổn thương nổi|laser)/.test(allNotes)) {
    scores.laser += 3;
  }
  if (/(căng bóng|cấp ẩm|khô|meso|booster|phục hồi)/.test(allNotes)) {
    scores['skin-booster'] += 3;
  }
  if (/(đỏ|thâm|dpl|giãn mạch|nhạy cảm|đều màu)/.test(allNotes)) {
    scores.dpl += 3;
  }
  if (/(mụn|nặn mụn|lấy nhân|lỗ chân lông|bã nhờn|aquapeel)/.test(allNotes)) {
    scores['acne-care'] += 3;
  }
  if (/(triệt lông|lông|nách|tay|chân|bikini)/.test(allNotes)) {
    scores['hair-removal'] += 4;
  }
  if (/(nhăn|cau mày|trán|đuôi mắt|thư giãn cơ|gọn hàm)/.test(allNotes)) {
    scores['muscle-relaxation'] += 4;
  }

  // Clinical preference adjustments
  const wantsNoDowntime = answers.sensitivity.includes('no_downtime');
  const isSensitive = answers.sensitivity.includes('sensitive');
  const isPregnant = answers.history.includes('pregnant');
  const usesTreatment = answers.history.includes('active_treatment');

  // If no downtime is requested and laser wasn't strongly demanded by scars/lesions, soften laser slightly
  if (wantsNoDowntime && scores.laser > 0 && scores.laser < 6) {
    scores.laser = Math.max(1, scores.laser - 1.5);
  }

  // If pregnant/breastfeeding, deprioritize invasive/energy-heavy options in auto-rank and prioritize gentle consultation
  if (isPregnant) {
    scores.laser = Math.max(0, scores.laser - 3);
    scores['muscle-relaxation'] = Math.max(0, scores['muscle-relaxation'] - 4);
    scores['skin-booster'] = Math.max(0, scores['skin-booster'] - 2);
    scores['acne-care'] += 2;
  }

  const ranked = SERVICES.map((service) => ({
    service,
    score: scores[service.id] ?? 0,
  }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  let selectedEntries = ranked.slice(0, 3);

  // Keep recommendations focused: if top 1 is strongly specific (e.g. only hair-removal or muscle-relaxation), avoid noisy 3rd item
  if (selectedEntries.length > 1) {
    const topScore = selectedEntries[0].score;
    selectedEntries = selectedEntries.filter(
      (entry, idx) => idx === 0 || entry.score >= Math.max(2, topScore * 0.45)
    );
  }

  // Fallback if user only typed generic note without matching keywords
  if (selectedEntries.length === 0) {
    const fallbackIds = isPregnant ? ['acne-care'] : ['skin-booster', 'acne-care'];
    selectedEntries = SERVICES.filter((s) => fallbackIds.includes(s.id)).map((service) => ({
      service,
      score: 1,
    }));
  }

  const { callCustomer } = getPronoun(profile);
  const safetyNotes: string[] = [];

  if (isPregnant) {
    safetyNotes.push(
      `Vì ${callCustomer} đang mang thai hoặc cho con bú, bác sĩ sẽ ưu tiên thăm khám kỹ và chọn các bước chăm sóc dịu nhẹ, tạm hoãn những can thiệp năng lượng cao hoặc tiêm dưỡng chất để đảm bảo an toàn tuyệt đối ạ.`
    );
  }
  if (usesTreatment) {
    safetyNotes.push(
      `Khi nhắn Zalo, ${callCustomer} nhớ gửi thêm tên sản phẩm Retinol/Acid đang dùng để bác sĩ dặn lịch tạm ngưng trước buổi làm vài ngày giúp da êm hơn nhé.`
    );
  }
  if (isSensitive && !isPregnant) {
    safetyNotes.push(
      `Với nền da dễ nhạy cảm, bác sĩ sẽ trực tiếp kiểm tra da và bắt đầu bằng mức thông số dịu nhẹ, ưu tiên phục hồi hàng rào bảo vệ trước ạ.`
    );
  }

  return {
    recommendations: selectedEntries.map(({ service }) => ({
      service,
      reason: buildPersonalizedReason(service.id, profile, answers),
    })),
    safetyNotes,
  };
}

export function buildZaloSummaryText(
  profile: ConsultationProfile,
  answers: ConsultationAnswers,
  result: ConsultationResult,
  voucherCode?: string
): string {
  const { customerSelf } = getPronoun(profile);

  const formatLine = (labels: string[], note: string) => {
    const parts = [...labels];
    if (note.trim()) parts.push(note.trim());
    return parts.length > 0 ? parts.join('; ') : 'Chưa bổ sung';
  };

  const lines: string[] = [
    '[TƯ VẤN DA - 9 P.M. SKINCARE]',
    `• Khách hàng: ${profile.name.trim()} (${profile.age.trim()} tuổi - ${GENDER_LABELS[profile.gender]})`,
    `• Nhu cầu chính: ${formatLine(getOptionLabels('needs', answers.needs), answers.needsNote)}`,
    `• Tình trạng nền da: ${formatLine(getOptionLabels('skinCondition', answers.skinCondition), answers.skinConditionNote)}`,
    `• Độ nhạy cảm & nghỉ dưỡng: ${formatLine(getOptionLabels('sensitivity', answers.sensitivity), answers.sensitivityNote)}`,
    `• Tiền sử làm da / chăm sóc: ${formatLine(getOptionLabels('history', answers.history), answers.historyNote)}`,
    '• Đề xuất sơ bộ từ hệ thống:',
    ...result.recommendations.map(
      (rec, index) => `  ${index + 1}. ${rec.service.title}`
    ),
    ...(voucherCode ? [`• Mã ưu đãi 5% từ Mina: ${voucherCode}`] : []),
    '',
    `Nhờ bác sĩ và 9 p.m. SkinCare tư vấn chi tiết thêm cho ${customerSelf} nhé!`,
  ];

  return lines.join('\n');
}
