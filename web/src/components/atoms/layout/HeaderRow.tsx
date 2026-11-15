import { styled } from '@/libs/styled';
import { Flex, type FlexProps } from './Flex';

export type HeaderRowProps = FlexProps;

export const HeaderRow = styled(Flex)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));
