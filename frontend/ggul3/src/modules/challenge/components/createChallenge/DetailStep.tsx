import { CalendarDate, Time } from '@internationalized/date';
import { DatePicker, DateValue, Input, TimeInput } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useEffect } from 'react';

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

  useEffect(() => {
    if (!budgetCap) {
      setBudgetCap(1000);
    }
  }, []);

  useEffect(() => {
    const defaultStart = dayjs().add(5, 'minute');
    const defaultEnd = dayjs().add(1, 'day').add(5, 'minute');

    if (!startDate) {
      setStartDate({
        year: defaultStart.year(),
        month: defaultStart.month() + 1,
        day: defaultStart.date(),
      });
    }

    if (!startTime) {
      setStartTime({
        hour: defaultStart.hour(),
        minute: defaultStart.minute(),
      });
    }

    if (!endDate) {
      setEndDate({
        year: defaultEnd.year(),
        month: defaultEnd.month() + 1,
        day: defaultEnd.date(),
      });
    }

    if (!endTime) {
      setEndTime({
        hour: defaultEnd.hour(),
        minute: defaultEnd.minute(),
      });
    }
  }, [
    budgetCap,
    startDate,
    startTime,
    endDate,
    endTime,
    setStartDate,
    setStartTime,
    setEndDate,
    setEndTime,
  ]);

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

  const startAt =
    startDate && startTime
      ? dayjs()
          .year(startDate.year)
          .month(startDate.month - 1)
          .date(startDate.day)
          .hour(startTime.hour)
          .minute(startTime.minute)
      : null;

  const endAt =
    endDate && endTime
      ? dayjs()
          .year(endDate.year)
          .month(endDate.month - 1)
          .date(endDate.day)
          .hour(endTime.hour)
          .minute(endTime.minute)
      : null;

  const now = dayjs();

  const isStartTimeValid = startAt ? startAt.isAfter(now) : false;
  const isEndTimeValid = startAt && endAt ? endAt.isAfter(startAt) : false;
  const isBudgetValid = budgetCap > 0;
  const isTitleValid = title.trim().length > 0;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-4">
        <DatePicker
          isRequired
          errorMessage={
            !isStartTimeValid && startDate && startTime
              ? '시작시간은 현재 시간보다 늦어야 합니다.'
              : ''
          }
          label="시작일"
          minValue={new CalendarDate(now.year(), now.month() + 1, now.date())}
          value={
            startDate &&
            new CalendarDate(startDate.year, startDate.month, startDate.day)
          }
          onChange={handleStartDate}
        />
        <TimeInput
          isRequired
          errorMessage={
            !isStartTimeValid && startDate && startTime
              ? '시작시간은 현재 시간보다 늦어야 합니다.'
              : ''
          }
          hourCycle={24}
          isInvalid={!isStartTimeValid && !!startDate && !!startTime}
          label="시작시간"
          value={
            startTime ? new Time(startTime.hour, startTime.minute) : undefined
          }
          onChange={handleStartTime}
        />
      </div>
      <div className="flex items-center gap-4">
        <DatePicker
          isRequired
          errorMessage={
            !isEndTimeValid && endDate && endTime
              ? '종료시간은 시작시간 이후여야 합니다.'
              : ''
          }
          label="종료일"
          minValue={
            startAt
              ? new CalendarDate(
                  startAt.year(),
                  startAt.month() + 1,
                  startAt.date(),
                )
              : undefined
          }
          value={
            endDate &&
            new CalendarDate(endDate.year, endDate.month, endDate.day)
          }
          onChange={handleEndDate}
        />
        <TimeInput
          isRequired
          errorMessage={
            !isEndTimeValid && endDate && endTime
              ? '종료시간은 시작시간 이후여야 합니다.'
              : ''
          }
          hourCycle={24}
          isInvalid={!isEndTimeValid && !!endDate && !!endTime}
          label="종료시간"
          value={endTime ? new Time(endTime.hour, endTime.minute) : undefined}
          onChange={handleEndTime}
        />
      </div>
      <Input
        isRequired
        errorMessage={!isBudgetValid ? '예산은 0보다 커야 합니다.' : ''}
        isInvalid={!isBudgetValid}
        label="예산"
        type="number"
        value={String(budgetCap)}
        onChange={(e) => setBudgetCap(Number(e.target.value))}
      />
      <Input
        isRequired
        errorMessage={!isTitleValid ? '방제목을 입력해 주세요.' : ''}
        isInvalid={!isTitleValid}
        label="방 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
};
