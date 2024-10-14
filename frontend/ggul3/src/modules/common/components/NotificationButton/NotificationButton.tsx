import { BellIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NotificationDTO } from '@types';

import { formatToRelativeTime } from '../../utils/dateUtils';

import { useGetNotifications } from '@/modules/common/reactQueries/useNotificationQuery';

interface NotificationButtonProps {
  color?: 'black' | 'white';
}

export const NotificationButton = ({
  color = 'black',
}: NotificationButtonProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, fetchNextPage, hasNextPage, error, isLoading } =
    useGetNotifications();

  const notifications: NotificationDTO[] =
    data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <>
      <button className={`w-7 text-${color}`} onClick={onOpen}>
        <BellIcon />
      </button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <p>알림함</p>
              </ModalHeader>
              <ModalBody>
                {isLoading && <div>로딩 중...</div>}
                {error && <div>알림을 불러오는 중 오류가 발생했습니다.</div>}
                {!isLoading && !error && (
                  <InfiniteScroll
                    dataLength={notifications.length}
                    endMessage={
                      <p className="mt-3" style={{ textAlign: 'center' }}>
                        더 이상 알림이 없습니다.
                      </p>
                    }
                    hasMore={!!hasNextPage}
                    height={400}
                    loader={<h4>로딩 중...</h4>}
                    next={() => fetchNextPage()}
                  >
                    {notifications.map((notification, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '10px 0',
                          borderBottom: '1px solid #eaeaea',
                        }}
                      >
                        <p>{notification.title}</p>
                        <p>{notification.body}</p>
                        <p style={{ color: 'gray', fontSize: '12px' }}>
                          {formatToRelativeTime(notification.createdAt)}
                        </p>
                      </div>
                    ))}
                  </InfiniteScroll>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="default" onClick={onClose}>
                  닫기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
