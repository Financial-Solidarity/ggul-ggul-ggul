import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

import { useConsumptionModalStore } from '../../store/consumptionModalStore';
import {
  useGetChallengeDetail,
  useGetParticipantList,
} from '../../reactQueries/useChallengeQuery';
import { useGetConsumptionList } from '../../reactQueries/useConsumptionQuery';
import { ChallengePaymentHistory } from '../ChallengePaymentHistory';
import { ChallengeTeamSpentMoney } from '../ChallengeTeamSpentMoney';
import {
  ChallengePaymentStatistics,
  PaymentHistoryItem,
} from '../ChallengePaymentStatistics';

export const ConsumptionModal = () => {
  const [personalStatistics, setPersonalStatistics] = useState<
    PaymentHistoryItem[]
  >([]);
  const { isOpen, challengeId, isTotalChattingRoom, setIsOpen } =
    useConsumptionModalStore();

  const { data: challengeDetail } = useGetChallengeDetail(challengeId);
  const { data: participantList } = useGetParticipantList(challengeId);
  const { data: consumptionList } = useGetConsumptionList(challengeId);

  const myTeam = participantList?.find((p) => p.isMine)?.type;
  const myTeamConsumptionList = consumptionList?.filter(
    (consumption) => consumption.team === myTeam,
  );

  useEffect(() => {
    if (!participantList || !consumptionList || !challengeDetail) return;

    const myTeam = participantList.find((p) => p.isMine)?.type;
    const filteredParticipants =
      challengeDetail.competitionType === 'S'
        ? participantList
        : participantList.filter((p) => p.type === myTeam);

    const newStatistics: PaymentHistoryItem[] = filteredParticipants.map(
      (participant) => ({
        nickname: participant.nickname,
        budget:
          challengeDetail.competitionType === 'S'
            ? challengeDetail.budgetCap
            : consumptionList
                .filter((item) => item.team === myTeam)
                .reduce((acc, curr) => acc + curr.money, 0),

        spend: consumptionList.reduce((acc, consumption) => {
          if (consumption.nickname === participant.nickname) {
            return acc + consumption.money;
          }

          return acc;
        }, 0),
      }),
    );

    setPersonalStatistics(newStatistics);
  }, [participantList, consumptionList, challengeDetail]);

  return (
    <Modal
      className="p-0"
      isOpen={isOpen}
      scrollBehavior="inside"
      size="full"
      onOpenChange={setIsOpen}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h3 className="text-center">진행상황</h3>
            </ModalHeader>
            <ModalBody className="px-4">
              {isTotalChattingRoom ? (
                <div className="flex flex-col">
                  <ChallengeTeamSpentMoney
                    budget={challengeDetail.budgetCap}
                    consumptionList={Object.entries(
                      consumptionList
                        .filter((item) => item.team === 'RED')
                        .reduce(
                          (acc, curr) => {
                            acc[curr.label] =
                              (acc[curr.label] || 0) + curr.money;

                            return acc;
                          },
                          {} as Record<string, number>,
                        ),
                    ).map(([label, money]) => ({ label, money }))}
                    isMyTeam={
                      participantList.find((p) => p.isMine)?.type === 'RED'
                    }
                    teamName="RED팀"
                  />
                  <div className="flex w-full items-center gap-2 px-4">
                    <Divider className="flex-1" />
                    <span className="text-lg">vs</span>
                    <Divider className="flex-1" />
                  </div>
                  <ChallengeTeamSpentMoney
                    budget={challengeDetail.budgetCap}
                    consumptionList={Object.entries(
                      consumptionList
                        .filter((item) => item.team === 'BLUE')
                        .reduce(
                          (acc, curr) => {
                            acc[curr.label] =
                              (acc[curr.label] || 0) + curr.money;

                            return acc;
                          },
                          {} as Record<string, number>,
                        ),
                    ).map(([label, money]) => ({ label, money }))}
                    isMyTeam={
                      participantList.find((p) => p.isMine)?.type === 'BLUE'
                    }
                    teamName="BLUE팀"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  <ChallengePaymentStatistics
                    competitionType={challengeDetail.competitionType}
                    statistics={personalStatistics}
                  />
                  <ChallengePaymentHistory
                    paymentHistory={myTeamConsumptionList}
                  />
                </div>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
