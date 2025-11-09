import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

function CardRotate({ children, onSendToBack, sensitivity }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export default function CategoryStack({
  randomRotation = true,
  sensitivity = 180,
  cardDimensions = { width: 280, height: 280 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false
}) {
  const { theme } = useTheme();
  const [cards, setCards] = useState(cardsData);

  const sendToBack = id => {
    setCards(prev => {
      const newCards = [...prev];
      const index = newCards.findIndex(card => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  const colorGradients = [
    'linear-gradient(135deg, #ff6b9d 0%, #ffa07a 100%)',
    'linear-gradient(135deg, #87ceeb 0%, #4dd0e1 100%)',
    'linear-gradient(135deg, #ffd700 0%, #ffa500 100%)',
    'linear-gradient(135deg, #dda0dd 0%, #ba55d3 100%)',
    'linear-gradient(135deg, #98fb98 0%, #00fa9a 100%)',
    'linear-gradient(135deg, #ffb6c1 0%, #ff69b4 100%)',
    'linear-gradient(135deg, #ffa07a 0%, #ff6347 100%)'
  ];

  return (
    <div
      className="relative mx-auto"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

        return (
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
            <motion.div
              className="group relative rounded-2xl overflow-hidden border-8 border-gray-900"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
                boxShadow: '8px 8px 0px 0px rgba(0,0,0,1), 12px 12px 0px 0px rgba(255,105,180,0.5)',
                background: colorGradients[index % 7]
              }}
            >
              {/* Manga halftone dots background */}
              <div className="absolute inset-0 opacity-10 pointer-events-none z-10" style={{
                backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px'
              }}></div>

              {/* Image */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={card.img}
                  alt={card.name || `card-${card.id}`}
                  className="w-full h-full object-cover pointer-events-none"
                />

                {/* Manga speed lines overlay on drag/hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" style={{
                  background: `
                    repeating-conic-gradient(
                      from 0deg at 50% 50%,
                      transparent 0deg,
                      transparent 2deg,
                      ${theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'} 2deg,
                      ${theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'} 3deg
                    )
                  `
                }}></div>

                {/* Manga star burst - top right */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 border-2 border-gray-900 animate-pulse z-20" style={{
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                }}></div>

                {/* Manga sparkles - decorative */}
                <div className="absolute top-3 left-3 w-3 h-3 bg-white opacity-70 border-2 border-gray-900 z-20" style={{
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                }}></div>
              </div>

              {/* Category name badge at bottom */}
              {card.name && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="px-6 py-3 bg-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                    <span className="font-black text-gray-900 uppercase tracking-wide text-lg" style={{
                      textShadow: '1px 1px 0px rgba(255,255,255,0.5)'
                    }}>
                      {card.name}
                    </span>
                  </div>
                </div>
              )}

              {/* Drag instruction hint (only on top card) */}
              {index === cards.length - 1 && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="px-4 py-2 bg-yellow-300 border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] animate-bounce">
                    <span className="font-bold text-gray-900 text-xs uppercase">
                      Drag Me!
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
