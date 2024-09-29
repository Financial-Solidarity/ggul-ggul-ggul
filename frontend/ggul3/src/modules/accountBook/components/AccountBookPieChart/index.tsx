import { ResponsivePie } from '@nivo/pie';

interface AccountBookPieChartProps {
  data: {
    id: string;
    label: string;
    value: number;
    color: string;
  }[];
  pieChartColors: string[];
}

export const AccountBookPieChart = ({
  data /* see data tab */,
  pieChartColors,
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
      arcLinkLabelsDiagonalLength={0}
      arcLinkLabelsOffset={10}
      arcLinkLabelsSkipAngle={0}
      arcLinkLabelsStraightLength={0}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      // @ts-ignore
      colorBy="index"
      colors={pieChartColors}
      // borderColor={{
      //   from: 'color',
      //   modifiers: [['darker', 0.2]],
      // }}
      // borderWidth={1}
      cornerRadius={3}
      data={data}
      // enableArcLinkLabels={false}
      // defs={[
      //   {
      //     id: 'dots',
      //     type: 'patternDots',
      //     background: 'inherit',
      //     color: 'rgba(255, 255, 255, 0.3)',
      //     size: 4,
      //     padding: 1,
      //     stagger: true,
      //   },
      //   {
      //     id: 'lines',
      //     type: 'patternLines',
      //     background: 'inherit',
      //     color: 'rgba(255, 255, 255, 0.3)',
      //     rotation: -45,
      //     lineWidth: 6,
      //     spacing: 10,
      //   },
      // ]}
      // fill={[
      //   {
      //     match: {
      //       id: 'ruby',
      //     },
      //     id: 'dots',
      //   },
      //   {
      //     match: {
      //       id: 'c',
      //     },
      //     id: 'dots',
      //   },
      //   {
      //     match: {
      //       id: 'go',
      //     },
      //     id: 'dots',
      //   },
      //   {
      //     match: {
      //       id: 'python',
      //     },
      //     id: 'dots',
      //   },
      //   {
      //     match: {
      //       id: 'scala',
      //     },
      //     id: 'lines',
      //   },
      //   {
      //     match: {
      //       id: 'lisp',
      //     },
      //     id: 'lines',
      //   },
      //   {
      //     match: {
      //       id: 'elixir',
      //     },
      //     id: 'lines',
      //   },
      //   {
      //     match: {
      //       id: 'javascript',
      //     },
      //     id: 'lines',
      //   },
      // ]}
      innerRadius={0.5}
      // legends={[
      //   {
      //     anchor: 'bottom-left',
      //     direction: 'column',
      //     justify: false,
      //     translateX: -70,
      //     translateY: 56,
      //     itemsSpacing: 2,
      //     itemWidth: 100,
      //     itemHeight: 18,
      //     itemTextColor: '#999',
      //     itemDirection: 'left-to-right',
      //     itemOpacity: 1,
      //     symbolSize: 18,
      //     symbolShape: 'circle',
      //     effects: [
      //       {
      //         on: 'hover',
      //         style: {
      //           itemTextColor: '#000',
      //         },
      //       },
      //     ],
      //   },
      // ]}
      margin={{ top: 30, right: 70, bottom: 30, left: 70 }}
      // padAngle={0.7}
    />
  );
};
