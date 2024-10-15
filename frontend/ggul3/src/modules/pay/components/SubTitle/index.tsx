import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface SubTitleProps {
  title: string;
  count?: number;
  rightLinkButtonUrl?: string;
}

export const SubTitle = ({
  title,
  count,
  rightLinkButtonUrl,
}: SubTitleProps) => {
  return (
    <div className="flex justify-between">
      <p className="font-bold">
        {title} <span className="text-primary">{count && count}</span>
      </p>
      {rightLinkButtonUrl && (
        <Link to={rightLinkButtonUrl}>
          <p className="text-gray flex content-center items-end items-center text-xs">
            더보기 <ChevronRightIcon className="size-3" />
          </p>
        </Link>
      )}
    </div>
  );
};
