import { CalendarDate, Time } from '@internationalized/date';
import { DatePicker, DateValue, Input, TimeInput } from '@nextui-org/react';

import { useCreateChallengeStore } from '@/modules/challenge/store';
export const DetailStep = () => {
  const {
    startDate,
    startTime,
    endDate,
    endTime,
    title,
    budgetCap,
    setTitle,
    setStartDate,
    setStartTime,
    setEndDate,
    setEndTime,
    setBudgetCap,
  } = useCreateChallengeStore();

  const handleStartDate = (date: DateValue) => {
    const { year, month, day } = date;

    setStartDate({ year, month, day });
  };

  const handleStartTime = (time: { hour: number; minute: number }) => {
    const { hour, minute } = time;

    setStartTime({ hour, minute });
  };

  const handleEndDate = (date: DateValue) => {
    const { year, month, day } = date;

    setEndDate({ year, month, day });
  };

  const handleEndTime = (time: { hour: number; minute: number }) => {
    const { hour, minute } = time;

    setEndTime({ hour, minute });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-4">
        <DatePicker
          label="시작일"
          value={
            startDate &&
            new CalendarDate(startDate.year, startDate.month, startDate.day)
          }
          onChange={handleStartDate}
        />
        <TimeInput
          label="시작시간"
          value={startTime && new Time(startTime.hour, startTime.minute)}
          onChange={handleStartTime}
        />
      </div>
      <div className="flex items-center gap-4">
        <DatePicker
          label="종료일"
          value={
            endDate &&
            new CalendarDate(endDate.year, endDate.month, endDate.day)
          }
          onChange={handleEndDate}
        />
        <TimeInput
          label="종료시간"
          value={endTime && new Time(endTime.hour, endTime.minute)}
          onChange={handleEndTime}
        />
      </div>
      <Input
        isRequired
        label="예산"
        type="number"
        value={String(budgetCap)}
        onChange={(e) => setBudgetCap(Number(e.target.value))}
      />
      <Input
        isRequired
        label="방제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
};
