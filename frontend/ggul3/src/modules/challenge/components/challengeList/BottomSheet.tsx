import { Sheet } from 'react-modal-sheet';

import { useChallengeListStore } from '../../store/challengeListStore';

export const BottomSheet = () => {
  const { closeSheet, isSheetOpen } = useChallengeListStore();

  return (
    <Sheet detent="content-height" isOpen={isSheetOpen} onClose={closeSheet}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className="px-4 py-10">
            <p>detent='content-height'이면 콘텐츠의 크기만큼 커짐.</p>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      {/* Backdrop 클릭 시 닫히도록 할 수 있음 */}
      <Sheet.Backdrop onTap={closeSheet} />
    </Sheet>
  );
};
