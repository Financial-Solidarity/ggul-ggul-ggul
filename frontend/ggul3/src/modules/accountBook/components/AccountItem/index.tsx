import { Image } from '@nextui-org/react';
import { AccountItemDTO } from '@types';
import { BsCheckCircle } from 'react-icons/bs';

import hankook_logo from '@/assets/images/bank_logo/hankook.svg';
import kb_logo from '@/assets/images/bank_logo/kb.png';
import shinhan_logo from '@/assets/images/bank_logo/shinhan.png';

interface AccountItemProps {
  account: AccountItemDTO | null;
  selectedAccount?: AccountItemDTO | null;
  handleClickAccount?: (account: AccountItemDTO) => void;
}

const bankLogo = {
  한국은행: hankook_logo,
  국민은행: kb_logo,
  신한은행: shinhan_logo,
};

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
          <div className="mr-2">
            <Image
              alt="bank-logo"
              height={30}
              src={bankLogo[account.bankName as keyof typeof bankLogo]}
              width={30}
            />
          </div>
          <p className="mr-1 text-xl font-medium">{account.bankName}</p>
          <p className="self-end text-xs text-gray-500">
            {account.accountNo.slice(0, 4) + '****'}
          </p>
        </div>
        {handleClickAccount &&
          (selectedAccount?.accountNo === account.accountNo ? (
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
