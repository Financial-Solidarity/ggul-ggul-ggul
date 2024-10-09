import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { useJustifyModalStore } from '../../store/JustifyModalStore';
import { useJustify } from '../../reactQueries/useChallengeQuery';

export const JustifyModal = () => {
  const [input, setInput] = useState('');

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { isOpen, spendChat, setIsOpen } = useJustifyModalStore();

  const { mutateAsync: justify, isPending } = useJustify();

  const onClickJustify = () => {
    if (!spendChat) {
      toast.error('소명할 지출정보 없습니다.', {
        position: 'bottom-center',
      });

      return;
    }
    justify({ chattingId: spendChat.chattingId, content: input })
      .then(() => {
        setInput('');
        setIsOpen(false);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: 'bottom-center',
        });
      });
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <Modal
      className="p-0"
      isOpen={isOpen}
      scrollBehavior="inside"
      onOpenChange={setIsOpen}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>소명</ModalHeader>
            <ModalBody className="p-0">
              <div className="flex flex-1 flex-col items-center justify-center">
                <Textarea
                  ref={inputRef}
                  className="w-full p-4"
                  maxLength={1000}
                  minRows={20}
                  placeholder="소명 내용을 입력해주세요."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <p className="flex gap-1">
                  <span>{input.length}</span>
                  <span>/</span>
                  <span>1000</span>
                </p>
              </div>
            </ModalBody>
            <ModalFooter className="px-4">
              <Button
                className="w-full"
                color="primary"
                isDisabled={input.length === 0}
                isLoading={isPending}
                size="lg"
                onClick={onClickJustify}
              >
                소명하기
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
