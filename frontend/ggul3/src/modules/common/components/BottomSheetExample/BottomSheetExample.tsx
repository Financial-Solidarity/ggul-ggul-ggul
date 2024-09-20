import { Sheet } from 'react-modal-sheet';
import { useState } from 'react';

// [바텀 시트 github](https://github.com/Temzasse/react-modal-sheet)
export function BottomSheetExample() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open sheet</button>

      <Sheet
        detent="content-height"
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      >
        <Sheet.Container>
          {/* 스타일은 인라인 스타일로 오버라이딩 가능 */}
          <Sheet.Header style={{ background: 'orange' }} />
          <Sheet.Header>
            {/* children이 없으면 짧고 가로로 누운 회색 버튼이 나타남 */}
            헤더에 정보를 추가할 수 있음.
          </Sheet.Header>
          {/* 콘텐츠를 드래그 할 수 없도록 함 */}
          <Sheet.Content disableDrag={true}>
            {/* detent='content-height인 경우' 콘텐츠의 크기만큼 커지게 됨. default='full-height' */}
            <p className="bg-primary-500 p-10">
              detent='content-height'이면 콘텐츠의 크기만큼 커짐.
            </p>
          </Sheet.Content>
        </Sheet.Container>
        {/* Backdrop 클릭 시 닫히도록 할 수 있음 */}
        <Sheet.Backdrop onTap={() => setOpen(false)} />
      </Sheet>
    </>
  );
}
