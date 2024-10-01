import { Sheet } from 'react-modal-sheet';
import { Button, Input } from '@nextui-org/react';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  joinChallenge,
  verifyJoinChallengePassword,
} from '../../apis/waitingroom';
import { useChattingRoomStore } from '../../store/chattingRoom';

import { useChallengeListStore } from '@/modules/challenge/store/challengeListStore';
import { formatCountdown, toYYMDhm_ko } from '@/modules/common/utils/dateUtils';
import { useCountdown } from '@/modules/common/hooks/useCountDown';
import { mockRequest } from '@/mocks/wrapper';

export const BottomSheet = () => {
  const navigate = useNavigate();

  const { closeSheet, isSheetOpen, item } = useChallengeListStore();
  const { setLobbyChattingRoomId } = useChattingRoomStore(); // 09.30 13:10 yyh

  const [password, setPassword] = useState('');
  const countdown = useCountdown(item?.startAt || '');

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const {
    title,
    startAt,
    endAt,
    currentParticipant,
    limitParticipant,
    competitionType,
    isBlindness,
    isEncrypted,
    budgetCap,
  } = item!;

  useEffect(() => {
    if (!isSheetOpen) {
      setPassword('');
    }
  }, [isSheetOpen]);

  // ------------------------------------------- 09.30 12:52 yyh
  // 챌린지 참가 (MSW mock 요청)
  const mockJoinChallenge = async () => {
    // 비밀방인 경우 비밀번호 확인
    if (isEncrypted) {
      await verifyJoinChallengePassword({
        challengeId: item?.challengeId,
        password, // test 비밀번호: '1'
      });
    }

    // 검증 후 참가
    return joinChallenge({ challengeId: item?.challengeId, password }).then();
  };

  // 참가하기 버튼 클릭 이벤트
  const handleJoinChallenge = async () => {
    // 채팅방 입장 (MSW mock 요청)
    try {
      const { challengeId, lobbyChattingRoomId } =
        await mockRequest(mockJoinChallenge);

      navigate(`/challenge/waiting-room/${challengeId}`);
    } catch (e) {
      console.error(e);
      // 없다면 FCM 알림 해야함 (code: 400)
      window.alert('참가에 실패했습니다.');
      closeSheet();
    }
  };
  // ------------------------------------------- 09.30 12:52 yyh

  return (
    <Sheet detent="content-height" isOpen={isSheetOpen} onClose={closeSheet}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className="flex-flex-col w-full p-4">
            <p
              className={twMerge([
                'mb-4 flex justify-center gap-1 font-semibold text-default-500',
                countdown.days === 0 &&
                  countdown.hours === 0 &&
                  countdown.minutes < 10 &&
                  'text-danger',
              ])}
            >
              <span>시작까지</span>
              <span>{formatCountdown(countdown)}</span>
              <span>남음</span>
            </p>
            <div>
              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold">{title}</h4>
                <div>
                  <div className="flex items-center">
                    <span>{toYYMDhm_ko(startAt)}</span>
                    <span>부터</span>
                  </div>
                  <div className="flex items-center">
                    <span>{toYYMDhm_ko(endAt)}</span>
                    <span>까지</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <UserGroupIcon className="w-4" />
                  <span>{currentParticipant}</span>
                  <span>/</span>
                  <span>{limitParticipant}</span>
                </div>
                <div className="itmes-center flex gap-1">
                  <span>{competitionType === 'S' ? '개인전' : '팀전'}</span>
                  <span>/</span>
                  <span>{isBlindness ? '익명' : '기명'}</span>
                  {isEncrypted && (
                    <>
                      <span>/</span>
                      <span>비밀방</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="py-4">
              <hr className="border-dashed border-default-300" />
            </div>
            <div className="mb-2 flex flex-col gap-4">
              <p className="text-2xl font-black">
                <span>{budgetCap}</span>
                <span>원</span>
              </p>
              {isEncrypted && (
                <Input
                  label="비밀번호"
                  radius="md"
                  size="sm"
                  type="password"
                  variant="bordered"
                  onChange={handleChangePassword}
                />
              )}
            </div>
            <Button
              className="w-full"
              color="primary"
              isDisabled={isEncrypted && password === ''}
              onClick={handleJoinChallenge}
            >
              참가하기
            </Button>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      {/* Backdrop 클릭 시 닫히도록 할 수 있음 */}
      <Sheet.Backdrop onTap={closeSheet} />
    </Sheet>
  );
};
