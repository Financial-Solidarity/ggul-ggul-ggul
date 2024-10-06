import { AccountItemDTO } from '@types';
import { BsCheckCircle } from 'react-icons/bs';

interface AccountItemProps {
  account: AccountItemDTO | null;
  selectedAccount?: AccountItemDTO | null;
  handleClickAccount?: (account: AccountItemDTO) => void;
}

export const AccountItem = ({
  account,
  selectedAccount,
  handleClickAccount,
}: AccountItemProps) => {
  if (!account) {
    return (
      <li className="list-none rounded transition duration-200">
        <button className="flex w-full cursor-pointer justify-between px-3 py-3 hover:bg-gray-200">
          <div className="flex">
            <p className="mr-1 text-xl font-medium">계좌를 선택해주세요</p>
          </div>
        </button>
      </li>
    );
  }

  return (
    <li
      key={account.bankName}
      className={`list-none rounded transition duration-200`}
    >
      <button
        className={`flex w-full cursor-pointer justify-between ${handleClickAccount && 'px-3 py-3 hover:bg-gray-200'}`}
        onClick={handleClickAccount && (() => handleClickAccount(account))}
      >
        <div className="flex">
          <p className="mr-1 text-xl font-medium">{account.bankName}</p>
          <p className="self-end text-xs text-gray-500">
            {account.accountNo.slice(0, 4) + '****'}
          </p>
        </div>
        {handleClickAccount &&
          (selectedAccount?.bankName === account.bankName ? (
            <div>
              <BsCheckCircle className="h-6 w-6 text-primary-700" />
            </div>
          ) : (
            <div>
              <BsCheckCircle className="h-6 w-6 text-gray-300" />
            </div>
          ))}
      </button>
    </li>
  );
};
