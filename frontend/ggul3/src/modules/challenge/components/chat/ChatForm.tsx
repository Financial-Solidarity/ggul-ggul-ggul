import { PencilIcon } from '@heroicons/react/24/outline';
import { Textarea } from '@nextui-org/react';
import { useState } from 'react';

interface ChatformProps {
  onSubmit: (message: string) => void;
}

export const Chatform = ({ onSubmit }: ChatformProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { messageInput } = e.target as typeof e.target & {
      messageInput: HTMLInputElement;
    };

    if (!message) return;
    onSubmit(message);
    clearMessage();
    messageInput.focus();
  };

  const clearMessage = () => {
    setMessage('');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <form
      className="fixed bottom-0 flex w-full bg-default-100"
      onSubmit={handleSubmit}
    >
      <Textarea
        maxRows={4}
        minRows={1}
        name="messageInput"
        type="text"
        value={message}
        onChange={handleInput}
      />
      <button className="flex w-10 items-end justify-center bg-primary p-1.5 text-white">
        <PencilIcon className="w-6" />
      </button>
    </form>
  );
};
