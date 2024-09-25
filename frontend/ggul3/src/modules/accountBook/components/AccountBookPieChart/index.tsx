import { ResponsivePie } from '@nivo/pie';

// {
//   id: 'javascript',
//   label: 'javascript',
//   value: 430,
//   color: 'hsl(67, 70%, 50%)',
// },

interface AccountBookPieChartProps {
  data: {
    id: string;
    label: string;
    value: number;
    color: string;
  }[];
}

export const AccountBookPieChart = ({
  data /* see data tab */,
}: AccountBookPieChartProps) => {
  return (
    <ResponsivePie
      activeOuterRadiusOffset={8}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      borderWidth={1}
      cornerRadius={3}
      data={data}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'ruby',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'c',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'go',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'python',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'scala',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'lisp',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'elixir',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'javascript',
          },
          id: 'lines',
        },
      ]}
      innerRadius={0.5}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      padAngle={0.7}
    />
  );
};
