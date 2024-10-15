import type { Meta, StoryObj } from '@storybook/react';

import { TopBar } from './index';

import { ExampleTopButton } from '@/modules/ggul';

const meta: Meta<typeof TopBar> = {
  title: 'UI/Layouts/TopBar',
  component: TopBar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    left: {
      description: '좌측에 들어갈 요소',
      control: 'text',
    },
    center: {
      description: '중앙에 들어갈 요소',
      control: 'text',
    },
    right: {
      description: '우측에 들어갈 요소',
      control: 'text',
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
  },
};

export default meta;

type Story = StoryObj<typeof TopBar>;

export const Default: Story = {
  args: {
    left: '뒤로가기',
    center: '타이틀',
    right: '설정',
    bgColor: 'bg-white',
  },
};

export const WithIcons: Story = {
  args: {
    left: <ExampleTopButton />,
    center: '아이콘 포함 타이틀',
    right: <ExampleTopButton />,
    bgColor: 'bg-white',
  },
};

export const CustomColor: Story = {
  args: {
    left: '메뉴',
    center: '커스텀 배경색',
    right: '옵션',
    bgColor: 'bg-blue-500',
  },
};
