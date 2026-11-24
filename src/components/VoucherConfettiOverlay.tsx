import { motion } from 'motion/react';

interface ConfettiPiece {
  id: number;
  leftClass: string;
  colorClass: string;
  shapeClass: string;
  driftX: number;
  fallY: number;
  rotateEnd: number;
  delay: number;
  duration: number;
}

const LEFT_CLASSES = [
  'left-[6%]',
  'left-[10%]',
  'left-[14%]',
  'left-[18%]',
  'left-[22%]',
  'left-[26%]',
  'left-[30%]',
  'left-[34%]',
  'left-[38%]',
  'left-[42%]',
  'left-[46%]',
  'left-[50%]',
  'left-[54%]',
  'left-[58%]',
  'left-[62%]',
  'left-[66%]',
  'left-[70%]',
  'left-[74%]',
  'left-[78%]',
  'left-[82%]',
  'left-[86%]',
  'left-[90%]',
  'left-[94%]',
  'left-[16%]',
  'left-[36%]',
  'left-[56%]',
  'left-[76%]',
  'left-[88%]',
] as const;

const COLOR_CLASSES = [
  'bg-[#8C6730]',
  'bg-[#C6A876]',
  'bg-[#E5CCA2]',
  'bg-[#A8D4F0]',
  'bg-[#EBC6D6]',
  'bg-[#B6E4D6]',
] as const;

const SHAPE_CLASSES = [
  'w-[7px] h-[3.5px] rounded-[1.5px]',
  'w-[5px] h-[5px] rounded-full',
  'w-[5.5px] h-[5.5px] rounded-[1px]',
] as const;

const CONFETTI_PIECES: ConfettiPiece[] = LEFT_CLASSES.map((leftClass, index) => {
  const direction = index % 2 === 0 ? 1 : -1;
  const driftMagnitude = 14 + ((index * 19) % 34);

  return {
    id: index,
    leftClass,
    colorClass: COLOR_CLASSES[index % COLOR_CLASSES.length],
    shapeClass: SHAPE_CLASSES[index % SHAPE_CLASSES.length],
    driftX: direction * driftMagnitude,
    fallY: 165 + ((index * 29) % 155),
    rotateEnd: direction * (110 + ((index * 43) % 190)),
    delay: (index % 7) * 0.055,
    duration: 1.55 + ((index * 13) % 7) * 0.11,
  };
});

export default function VoucherConfettiOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {CONFETTI_PIECES.map((piece) => (
        <motion.span
          key={piece.id}
          initial={{
            opacity: 0,
            x: 0,
            y: -12,
            scale: 0.65,
            rotate: 0,
          }}
          animate={{
            opacity: [0, 0.92, 0.85, 0],
            x: [0, piece.driftX * 0.55, piece.driftX],
            y: [-12, piece.fallY * 0.45, piece.fallY],
            scale: [0.65, 1, 0.9, 0.72],
            rotate: piece.rotateEnd,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.16, 0.72, 1],
          }}
          className={`absolute top-2 block ${piece.leftClass} ${piece.colorClass} ${piece.shapeClass}`}
        />
      ))}
    </div>
  );
}
