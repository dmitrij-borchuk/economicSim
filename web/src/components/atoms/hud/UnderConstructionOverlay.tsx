import React from 'react';
import { styled } from '@/libs/styled';
import { Box, type BoxProps } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';

export interface UnderConstructionOverlayProps extends Omit<BoxProps, 'ref'> {
  /**
   * Optional text label displayed in the center of the overlay.
   * Pass `null` or `""` to hide the badge.
   * @default 'UNDER CONSTRUCTION'
   */
  label?: React.ReactNode;
  /**
   * Whether the overlay is active/visible when wrapping children.
   * @default true
   */
  active?: boolean;
}

export const UnderConstructionOverlay: React.FC<UnderConstructionOverlayProps> = ({
  children,
  label = 'UNDER CONSTRUCTION',
  active = true,
  ...rest
}) => {
  const overlayContent = active ? (
    <StripedBackdrop aria-label={typeof label === 'string' ? label : 'Under construction'} {...(children ? {} : rest)}>
      {label ? (
        <LabelBadge>
          <LabelText variant="caption">{label}</LabelText>
        </LabelBadge>
      ) : null}
    </StripedBackdrop>
  ) : null;

  if (children) {
    return (
      <RelativeWrapper {...rest}>
        {children}
        {overlayContent}
      </RelativeWrapper>
    );
  }

  return overlayContent;
};

const RelativeWrapper = styled(Box)(() => ({
  position: 'relative',
}));

const StripedBackdrop = styled(Box)(() => ({
  position: 'absolute',
  inset: 0,
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage:
    'repeating-linear-gradient(-45deg, rgba(249, 115, 22, 0.24) 0px, rgba(249, 115, 22, 0.24) 14px, rgba(11, 13, 18, 0.68) 14px, rgba(11, 13, 18, 0.68) 28px)',
  border: '1px solid rgba(249, 115, 22, 0.45)',
  backdropFilter: 'blur(1px)',
  userSelect: 'none',
}));

const LabelBadge = styled(Box)(() => ({
  padding: '4px 12px',
  backgroundColor: 'rgba(11, 13, 18, 0.92)',
  border: '1px solid #f97316',
  boxShadow: '0 0 12px rgba(249, 115, 22, 0.25)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const LabelText = styled(Typography)(() => ({
  color: '#f97316',
  fontFamily: 'monospace',
  fontSize: '0.72rem',
  fontWeight: 800,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
}));
