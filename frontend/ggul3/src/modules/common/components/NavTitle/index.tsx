interface NavTitleProps {
  title: string;
  color?: 'white' | 'black';
}

export const NavTitle = ({ title, color = 'black' }: NavTitleProps) => {
  return <p className={`text-lg text-${color}`}>{title}</p>;
};
