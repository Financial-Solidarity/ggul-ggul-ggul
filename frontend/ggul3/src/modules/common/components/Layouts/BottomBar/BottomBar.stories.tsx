import type { Meta, StoryObj } from '@storybook/react';

import { MemoryRouter } from 'react-router-dom';

import { useSetBottomBar } from '../../../hooks/useSetBottomBar';

import { BottomBar } from './index';

import { PathNames } from '@/router';

interface BottomBarStoryArgs {
  active: boolean;
  isDarkMode: boolean;
  currentPath: string;
}

const meta: Meta<typeof BottomBar> = {
  title: 'UI/Components/BottomBar',
  component: BottomBar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story, context) => {
      const { active, isDarkMode, currentPath } =
        context.args as BottomBarStoryArgs;

      useSetBottomBar({ active, isDarkMode });

      return (
        <MemoryRouter initialEntries={[currentPath]}>
          <div style={{ padding: '1rem' }}>
            <Story />
          </div>
        </MemoryRouter>
      );
    },
  ],
  argTypes: {
    active: {
      description: '바텀바 활성화 여부',
      control: 'boolean',
    },
    isDarkMode: {
      description: '다크 모드 여부',
      control: 'boolean',
    },
    currentPath: {
      description: '현재 활성화된 경로',
      control: {
        type: 'select',
        options: Object.keys(PathNames).map((key) => PathNames[key].path),
      },
    },
  },
};

export default meta;

type Story = StoryObj<BottomBarStoryArgs>;

export const Default: Story = {
  args: {
    active: true,
    isDarkMode: false,
    currentPath: PathNames.HOME.path,
  },
};

// 다크모드 켜진 상태
export const DarkMode: Story = {
  args: {
    active: true,
    isDarkMode: true,
    currentPath: PathNames.HOME.path,
  },
};

export const HomeActive: Story = {
  args: {
    active: true,
    isDarkMode: false,
    currentPath: PathNames.HOME.path,
  },
};

export const PayActive: Story = {
  args: {
    active: true,
    isDarkMode: false,
    currentPath: PathNames.GGULPAY.path,
  },
};
