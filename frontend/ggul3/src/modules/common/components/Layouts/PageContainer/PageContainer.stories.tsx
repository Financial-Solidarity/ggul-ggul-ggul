import type { Meta, StoryObj } from '@storybook/react';

import { PageContainer } from './index';

const meta: Meta<typeof PageContainer> = {
  title: 'UI/Layouts/PageContainer',
  component: PageContainer,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    activePaddingX: {
      description: '좌우 패딩 적용 여부',
      control: 'boolean',
    },
    bgColor: {
      description: '배경 색상',
      control: {
        type: 'select',
        options: [
          'bg-white',
          'bg-gray-100',
          'bg-zinc-800',
          'bg-blue-500',
          'bg-yellow-200',
        ],
      },
    },
    titleContent: {
      description: '타이틀 내용',
      control: 'text',
    },
    children: {
      description: '페이지 내부 콘텐츠',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PageContainer>;

export const Default: Story = {
  args: {
    activePaddingX: true,
    bgColor: 'bg-white',
    titleContent: '기본 타이틀',
    children: '기본 페이지 내용',
  },
};

export const WithTitle: Story = {
  args: {
    activePaddingX: true,
    bgColor: 'bg-gray-100',
    titleContent: '페이지 타이틀',
    children: '이 페이지는 타이틀을 가지고 있습니다.',
  },
};

export const WithoutPadding: Story = {
  args: {
    activePaddingX: false,
    bgColor: 'bg-white',
    titleContent: '패딩 없는 페이지',
    children: '이 페이지는 좌우에 패딩이 없습니다.',
  },
};

export const CustomColor: Story = {
  args: {
    activePaddingX: true,
    bgColor: 'bg-blue-500',
    titleContent: '커스텀 배경 페이지',
    children: '이 페이지는 커스텀 배경을 가지고 있습니다.',
  },
};
