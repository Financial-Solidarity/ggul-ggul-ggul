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
  data = [],
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
      cornerRadius={3}
      data={data}
      innerRadius={0.5}
      margin={{ top: 30, right: 70, bottom: 30, left: 70 }}
    />
  );
};
