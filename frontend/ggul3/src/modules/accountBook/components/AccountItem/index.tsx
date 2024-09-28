import { BsCheckCircle } from 'react-icons/bs';

interface Account {
  id: number;
  name: string;
  accountNo: string;
}

interface AccountItemProps {
  account: Account;
  selectedAccountNo?: string;
  handleClickAccount?: (accountNo: string) => void;
}

export const AccountItem = ({
  account,
  selectedAccountNo,
  handleClickAccount,
}: AccountItemProps) => {
  return (
    <li
      key={account.id}
      className={`list-none ${handleClickAccount && 'px-3 py-3 hover:bg-gray-200'} rounded transition duration-200`}
    >
      <button
        className="flex w-full cursor-pointer justify-between"
        onClick={
          handleClickAccount && (() => handleClickAccount(account.accountNo))
        }
      >
        <div className="flex">
          <p className="mr-1 text-xl font-medium">{account.name}</p>
          <p className="self-end text-xs text-gray-500">
            {account.accountNo.slice(0, 8) + '****'}
          </p>
        </div>
        {handleClickAccount &&
          (selectedAccountNo === account.accountNo ? (
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
