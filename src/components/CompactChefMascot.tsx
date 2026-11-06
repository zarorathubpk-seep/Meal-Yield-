import React, { useState, useEffect, useRef } from 'react';

export type MascotAction = 'idle' | 'wave' | 'laugh' | 'nod' | 'present';

interface CompactChefMascotProps {
  action?: MascotAction;
  isSpeaking?: boolean;
  onClick?: () => void;
  className?: string;
}

export const CompactChefMascot: React.FC<CompactChefMascotProps> = ({
  action = 'idle',
  isSpeaking = false,
  onClick,
  className = '',
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [reactionAnim, setReactionAnim] = useState<string>('');

  // Procedural blinking every 3.2 - 5.5 seconds
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        const nextDelay = 3200 + Math.random() * 2500;
        blinkTimeout = setTimeout(triggerBlink, nextDelay);
      }, 180);
    };

    const initialDelay = 2000 + Math.random() * 2000;
    blinkTimeout = setTimeout(triggerBlink, initialDelay);

    return () => clearTimeout(blinkTimeout);
  }, []);

  // Subtle mouth movement while speaking
  useEffect(() => {
    if (!isSpeaking) {
      setMouthOpen(false);
      return;
    }
    const interval = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 140);
    return () => clearInterval(interval);
  }, [isSpeaking]);

  // Gentle mouse tracking for eyes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window === 'undefined') return;
      const mascotEl = document.getElementById('compact-chef-svg');
      if (!mascotEl) return;
      const rect = mascotEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);
      setPupilOffset({
        x: Math.max(-1.5, Math.min(1.5, dx * 1.5)),
        y: Math.max(-1.2, Math.min(1.2, dy * 1.2)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = () => {
    setReactionAnim('animate-chef-nod');
    setTimeout(() => setReactionAnim(''), 600);
    onClick?.();
  };

  const isWaving = action === 'wave' || isHovered;
  const isPresenting = action === 'present';

  return (
    <div
      id="compact-chef-svg"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative cursor-pointer select-none transition-transform duration-200 active:scale-95 group ${reactionAnim} ${className}`}
      title="Click to talk with your AI Chef!"
      style={{
        width: '84px',
        height: '106px',
      }}
    >
      <svg
        viewBox="0 0 100 126"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md overflow-visible"
      >
        <defs>
          {/* Hat shading */}
          <linearGradient id="chefHatGrad" x1="50" y1="2" x2="50" y2="46" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.85" stopColor="#F5F3EF" />
            <stop offset="1" stopColor="#E2DDD5" />
          </linearGradient>

          {/* Skin tone */}
          <linearGradient id="chefSkinGrad" x1="50" y1="42" x2="50" y2="76" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFDECF" />
            <stop offset="1" stopColor="#F5C4B0" />
          </linearGradient>

          {/* Coat */}
          <linearGradient id="chefCoatGrad" x1="50" y1="74" x2="50" y2="114" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#EAE6DF" />
          </linearGradient>

          {/* Apron */}
          <linearGradient id="chefApronGrad" x1="50" y1="88" x2="50" y2="116" gradientUnits="userSpaceOnUse">
            <stop stopColor="#143D2B" />
            <stop offset="1" stopColor="#0B2419" />
          </linearGradient>

          {/* Neckerchief */}
          <linearGradient id="chefScarfGrad" x1="50" y1="71" x2="50" y2="79" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E05D35" />
            <stop offset="1" stopColor="#C85A32" />
          </linearGradient>

          {/* Gold / Cloche metal */}
          <linearGradient id="chefClocheGrad" x1="12" y1="78" x2="28" y2="94" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF2B2" />
            <stop offset="0.4" stopColor="#E6C86E" />
            <stop offset="1" stopColor="#B38F39" />
          </linearGradient>
        </defs>

        {/* Shadow base on table */}
        <ellipse cx="50" cy="122" rx="24" ry="3.5" fill="#143D2B" fillOpacity="0.18" />

        {/* CHEF BODY GROUP */}
        <g className="animate-chef-idle origin-bottom">
          {/* Chef Coat & Torso */}
          <path
            d="M 30 76 C 30 74, 70 74, 70 76 L 75 112 C 75 116, 25 116, 25 112 Z"
            fill="url(#chefCoatGrad)"
            stroke="#D6CEBE"
            strokeWidth="1.2"
          />

          {/* Apron */}
          <path
            d="M 34 88 L 66 88 L 64 115 C 64 117, 36 117, 36 115 Z"
            fill="url(#chefApronGrad)"
            stroke="#0B2419"
            strokeWidth="0.8"
          />
          {/* Apron Pocket */}
          <rect x="42" y="96" width="16" height="12" rx="2" fill="#143D2B" stroke="#1D563D" strokeWidth="0.8" />
          {/* Wooden spoon handle sticking out of pocket */}
          <line x1="53" y1="92" x2="56" y2="104" stroke="#D19864" strokeWidth="2" strokeLinecap="round" />

          {/* Coat Double-Breasted Gold Buttons */}
          <circle cx="43" cy="81" r="1.5" fill="#D4AF37" stroke="#9E8020" strokeWidth="0.5" />
          <circle cx="57" cy="81" r="1.5" fill="#D4AF37" stroke="#9E8020" strokeWidth="0.5" />
          <circle cx="43" cy="88" r="1.5" fill="#D4AF37" stroke="#9E8020" strokeWidth="0.5" />
          <circle cx="57" cy="88" r="1.5" fill="#D4AF37" stroke="#9E8020" strokeWidth="0.5" />

          {/* Neckerchief (Red-orange scarf) */}
          <path
            d="M 40 73 C 44 76, 56 76, 60 73 L 53 82 L 50 83 L 47 82 Z"
            fill="url(#chefScarfGrad)"
          />
          <circle cx="50" cy="76" r="2.2" fill="#A84323" />

          {/* LEFT ARM & CLOCHE PLATTER */}
          <g className={isPresenting ? 'animate-chef-present origin-left' : ''}>
            {/* Upper arm */}
            <path
              d="M 31 77 C 22 81, 19 88, 22 95 C 24 98, 28 97, 30 92 Z"
              fill="#FFFFFF"
              stroke="#D6CEBE"
              strokeWidth="1"
            />
            {/* Hand */}
            <circle cx="21" cy="94" r="3.2" fill="url(#chefSkinGrad)" />
            {/* Cloche serving tray */}
            <path
              d="M 10 93 C 10 93, 20 81, 32 93 Z"
              fill="url(#chefClocheGrad)"
              stroke="#8C6E23"
              strokeWidth="0.8"
            />
            <line x1="8" y1="94" x2="34" y2="94" stroke="#8C6E23" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="21" cy="83" r="1.6" fill="#FFE27A" stroke="#8C6E23" strokeWidth="0.6" />
            {/* Steam puff from cloche */}
            <path
              d="M 18 78 Q 20 73 17 70"
              stroke="#C85A32"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeOpacity="0.6"
              fill="none"
            />
            <path
              d="M 23 79 Q 25 74 23 69"
              stroke="#C85A32"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeOpacity="0.6"
              fill="none"
            />
          </g>

          {/* RIGHT ARM (WAVING OR AT SIDE) */}
          <g
            className={`transition-transform duration-300 ${
              isWaving ? 'animate-chef-wave origin-[72px_78px]' : ''
            }`}
          >
            {isWaving ? (
              // Raised waving arm
              <g>
                <path
                  d="M 68 76 C 75 72, 85 64, 88 56 C 89 54, 86 52, 83 55 L 72 72 Z"
                  fill="#FFFFFF"
                  stroke="#D6CEBE"
                  strokeWidth="1"
                />
                {/* Waving hand with little fingers */}
                <ellipse cx="89" cy="53" rx="3.5" ry="4" fill="url(#chefSkinGrad)" />
                <circle cx="87" cy="50" r="1.2" fill="url(#chefSkinGrad)" />
                <circle cx="90" cy="49" r="1.2" fill="url(#chefSkinGrad)" />
                <circle cx="93" cy="51" r="1.2" fill="url(#chefSkinGrad)" />
              </g>
            ) : (
              // Relaxed arm holding waist
              <g>
                <path
                  d="M 69 77 C 77 81, 80 88, 77 95 C 75 98, 71 97, 69 92 Z"
                  fill="#FFFFFF"
                  stroke="#D6CEBE"
                  strokeWidth="1"
                />
                <circle cx="78" cy="94" r="3.2" fill="url(#chefSkinGrad)" />
              </g>
            )}
          </g>

          {/* CHEF HEAD GROUP */}
          <g>
            {/* Head oval */}
            <ellipse cx="50" cy="58" rx="18" ry="16" fill="url(#chefSkinGrad)" />

            {/* Rosy Cheeks */}
            <ellipse cx="38" cy="62" rx="3.5" ry="2" fill="#FF8A73" fillOpacity="0.45" />
            <ellipse cx="62" cy="62" rx="3.5" ry="2" fill="#FF8A73" fillOpacity="0.45" />

            {/* EYES (With blinking and pupil tracking) */}
            {isBlinking ? (
              // Closed eye arcs during blink
              <g stroke="#2C1B14" strokeWidth="1.8" strokeLinecap="round">
                <path d="M 40 56 Q 44 59 47 56" />
                <path d="M 53 56 Q 56 59 60 56" />
              </g>
            ) : (
              // Open animated expressive eyes
              <g>
                {/* Eye whites */}
                <ellipse cx="43" cy="55" rx="4.5" ry="5.5" fill="#FFFFFF" stroke="#3D281E" strokeWidth="0.8" />
                <ellipse cx="57" cy="55" rx="4.5" ry="5.5" fill="#FFFFFF" stroke="#3D281E" strokeWidth="0.8" />

                {/* Eyeballs / Pupils tracking mouse */}
                <ellipse
                  cx={43.5 + pupilOffset.x}
                  cy={55.5 + pupilOffset.y}
                  rx="2.6"
                  ry="3.2"
                  fill="#1B3B2B"
                />
                <ellipse
                  cx={57.5 + pupilOffset.x}
                  cy={55.5 + pupilOffset.y}
                  rx="2.6"
                  ry="3.2"
                  fill="#1B3B2B"
                />

                {/* Eye sparkle reflections */}
                <circle cx={42.2 + pupilOffset.x} cy={54 + pupilOffset.y} r="1" fill="#FFFFFF" />
                <circle cx={56.2 + pupilOffset.x} cy={54 + pupilOffset.y} r="1" fill="#FFFFFF" />

                {/* Friendly Eyebrows */}
                <path
                  d="M 39 48 Q 43 46 47 48"
                  stroke="#3D281E"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 53 48 Q 57 46 61 48"
                  stroke="#3D281E"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            )}

            {/* Cute Little Nose */}
            <ellipse cx="50" cy="59.5" rx="2" ry="1.4" fill="#E8A892" />

            {/* Curled Friendly Mustache */}
            <path
              d="M 44 63 Q 48 61 50 63 Q 52 61 56 63 Q 59 65 62 63.5 Q 56 66 50 64.5 Q 44 66 38 63.5 Q 41 65 44 63 Z"
              fill="#42291D"
            />

            {/* Smiling Mouth (Dynamic open/close when speaking) */}
            {mouthOpen ? (
              // Open talking mouth
              <path
                d="M 46 66 Q 50 72 54 66 Q 50 67 46 66 Z"
                fill="#8C1D1D"
                stroke="#541313"
                strokeWidth="0.6"
              />
            ) : (
              // Sweet smile curve
              <path
                d="M 46 65.5 Q 50 68 54 65.5"
                stroke="#541313"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />
            )}

            {/* PROFESSIONAL TALL PLEATED CHEF HAT */}
            <g>
              {/* Hat base band */}
              <rect
                x="32"
                y="41"
                width="36"
                height="8"
                rx="2"
                fill="#EAE5DC"
                stroke="#CEC7B9"
                strokeWidth="1"
              />
              {/* Gold hat band ribbon */}
              <rect x="33" y="46" width="34" height="2" fill="#D4AF37" />

              {/* Puffed pleated toque crowns */}
              <path
                d="M 33 42
                   C 26 36, 26 22, 36 14
                   C 42 6, 58 6, 64 14
                   C 74 22, 74 36, 67 42
                   Z"
                fill="url(#chefHatGrad)"
                stroke="#D6CEBE"
                strokeWidth="1.2"
              />
              {/* Hat vertical pleats */}
              <path
                d="M 42 12 Q 41 26 40 42"
                stroke="#D6CEBE"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 50 9 Q 50 25 50 42"
                stroke="#D6CEBE"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 58 12 Q 59 26 60 42"
                stroke="#D6CEBE"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />

              {/* Gold emblem star on hat */}
              <circle cx="50" cy="44" r="1.8" fill="#D4AF37" stroke="#A88218" strokeWidth="0.4" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
