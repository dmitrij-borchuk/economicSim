import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';

const CanvasWrapper = styled(Box)(() => ({
  backgroundColor: '#07090d',
  border: '1px solid #19202c',
  padding: '12px',
  minHeight: '160px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const SubmarineSchematicCanvas: React.FC = () => {
  return (
    <CanvasWrapper>
      <svg
        viewBox="0 0 760 140"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        {/* Grid backdrop */}
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#161e2e" strokeWidth="0.5" />
        </pattern>
        <rect width="760" height="140" fill="url(#grid)" />

        {/* Main Structural Outer Hull (Submarine / Station Profile) */}
        {/* Nose bow (left) */}
        <path
          d="M 140,70 C 140,50 160,35 220,35 L 560,35 C 600,35 630,45 660,70 C 630,95 600,105 560,105 L 220,105 C 160,105 140,90 140,70 Z"
          fill="none"
          stroke="#047857"
          strokeWidth="1.8"
        />

        {/* Outer sensor fins / stabilizers */}
        <path d="M 120,60 L 140,65 L 140,75 L 120,80 Z" fill="none" stroke="#059669" strokeWidth="1" />
        <path d="M 660,65 L 680,60 L 680,80 L 660,75 Z" fill="none" stroke="#059669" strokeWidth="1" />
        {/* Tail propeller / thrusters */}
        <circle cx="690" cy="70" r="8" fill="none" stroke="#059669" strokeWidth="1.5" />
        <line x1="680" y1="70" x2="700" y2="70" stroke="#059669" strokeWidth="1.5" />
        <line x1="690" y1="60" x2="690" y2="80" stroke="#059669" strokeWidth="1.5" />

        {/* Internal Conning Tower / Command Bridge */}
        <path
          d="M 330,35 L 330,22 C 330,20 335,18 360,18 C 385,18 390,20 390,22 L 390,35"
          fill="none"
          stroke="#059669"
          strokeWidth="1.5"
        />
        <circle cx="360" cy="26" r="3" fill="#10b981" />

        {/* Inner Compartment Bulkheads */}
        <line x1="210" y1="38" x2="210" y2="102" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="310" y1="36" x2="310" y2="104" stroke="#059669" strokeWidth="1.2" />
        <line x1="430" y1="36" x2="430" y2="104" stroke="#059669" strokeWidth="1.2" />
        <line x1="550" y1="36" x2="550" y2="104" stroke="#059669" strokeWidth="1.2" />

        {/* Center spine conduit */}
        <line x1="160" y1="70" x2="640" y2="70" stroke="#0d9488" strokeWidth="1" />

        {/* SEC 1 Room: Bow Torpedo / Sensor Array */}
        <rect x="170" y="55" width="30" height="30" rx="3" fill="none" stroke="#059669" strokeWidth="1" />
        <circle cx="185" cy="70" r="7" fill="none" stroke="#059669" strokeWidth="0.75" />
        <circle cx="185" cy="70" r="2" fill="#10b981" />

        {/* SEC 2 Room: Control & Battery Core */}
        <rect x="230" y="48" width="65" height="44" rx="2" fill="none" stroke="#059669" strokeWidth="1" />
        <line x1="230" y1="62" x2="295" y2="62" stroke="#059669" strokeWidth="0.75" />
        <line x1="230" y1="78" x2="295" y2="78" stroke="#059669" strokeWidth="0.75" />
        <circle cx="250" cy="55" r="3" fill="none" stroke="#059669" />
        <circle cx="275" cy="55" r="3" fill="none" stroke="#059669" />

        {/* SEC 3 Room: Reactor & Aux Drive */}
        <rect x="330" y="45" width="80" height="50" rx="4" fill="none" stroke="#059669" strokeWidth="1" />
        <circle cx="370" cy="70" r="14" fill="none" stroke="#059669" strokeWidth="1.5" />
        <circle cx="370" cy="70" r="6" fill="#047857" />

        {/* SEC 4 Room: Tactical Weapons / Security Breach Target! */}
        <rect x="450" y="48" width="80" height="44" rx="2" fill="rgba(239, 68, 68, 0.08)" stroke="#ef4444" strokeWidth="1.5" />
        {/* Target reticle on breach */}
        <circle cx="490" cy="70" r="12" fill="none" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="490" cy="70" r="6" fill="#ef4444">
          <animate attributeName="r" values="4;8;4" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <line x1="490" y1="50" x2="490" y2="90" stroke="#ef4444" strokeWidth="1" />
        <line x1="470" y1="70" x2="510" y2="70" stroke="#ef4444" strokeWidth="1" />

        {/* SEC 5 Room: Engine Propulsion */}
        <rect x="570" y="52" width="60" height="36" rx="2" fill="none" stroke="#059669" strokeWidth="1" />
        <line x1="570" y1="64" x2="630" y2="64" stroke="#059669" strokeWidth="1" />
        <circle cx="600" cy="70" r="5" fill="#10b981" />
      </svg>
    </CanvasWrapper>
  );
};
