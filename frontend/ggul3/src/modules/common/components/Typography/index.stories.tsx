import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { TColor } from '../../../themes/themeBase';

import { TTypographySize, TTypographyWeight } from './Typography.types';

import { Typography } from '.';

const meta = {
  title: 'UI/Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: {
      description: '표시할 텍스트',
    },
    size: {
      description: '텍스트 크기',
    },
    color: {
      description: '텍스트 색상',
    },
    weight: {
      description: '텍스트 굵기',
    },
    classNameStyles: {
      description: '부가적인 스타일',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

export const Primary: Story = {
  args: {
    children: 'Typography',
    size: 'md',
    color: 'primary',
    weight: 'regular',
  },
};

const sizeList: TTypographySize[] = [
  '3xs',
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
];

const colorList: TColor[] = [
  'primary',
  'secondary',
  'danger',
  'warning',
  'dark',
  'light',
];

const weightList: TTypographyWeight[] = [
  'light',
  'regular',
  'medium',
  'semibold',
  'bold',
];

export const Sizes: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {sizeList.map((size) => {
        return (
          <Typography key={size} size={size}>
            {args.children}
          </Typography>
        );
      })}
    </div>
  ),
};

export const Colors: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colorList.map((color) => {
        return (
          <Typography key={color} color={color}>
            {args.children}
          </Typography>
        );
      })}
    </div>
  ),
};

export const Weights: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {weightList.map((weight) => {
        return (
          <Typography key={weight} weight={weight}>
            {args.children}
          </Typography>
        );
      })}
    </div>
  ),
};
