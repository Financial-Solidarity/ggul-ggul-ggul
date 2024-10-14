import { Card, CardHeader, Image } from '@nextui-org/react';

interface GlowingCardProps {
  title: string;
  description: string;
  boxImage: string;
  onClick: () => void;
}

export const GlowingCard: React.FC<GlowingCardProps> = ({
  title,
  description,
  boxImage,
  onClick,
}) => (
  <div className="BOTTOM-SECTION relative mt-20">
    <Card
      isHoverable
      isPressable
      className="w-full flex-1 rounded-xl bg-danger p-3"
      style={{ boxShadow: '0px 0px 30px rgba(255, 82, 116, 0.8)' }}
      onClick={onClick}
    >
      <CardHeader className="flex-col items-start gap-2">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <p className="text-center text-sm text-zinc-300">{description}</p>
      </CardHeader>
    </Card>
    <div className="pointer-events-none absolute -top-7 right-4 z-10">
      <Image alt="box" src={boxImage} />
    </div>
  </div>
);
