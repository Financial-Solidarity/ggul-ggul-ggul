# PageContainer 및 TopBar 구현, 사용법 등

`PageContainer`와 `TopBar`를 구현했습니다. <br/>
이 두 컴포넌트는 페이지의 상단 바와 메인 콘텐츠 영역을 담당하고 있습니다. 

<br/><br/>

## 1. TopBar 구성

`TopBar`는 화면 상단에 고정되는 상단 바로, `왼쪽`, `가운데`, `오른쪽`에 각각 필요한 컴포넌트를 넣을 수 있게 설계했습니다. 페이지에 따라 제목을 넣거나 뒤로 가기 버튼 등을 넣는 방식으로 다양하게 사용할 수 있겠습니다.

해당 상단바는 스스로 영역을 잡고있으므로, TopBar와 페이지 컨테이너를 동일레벨로 넣어준다면 `flex-1`이 적용된 페이지 컨테이너는 아래로 밀려납니다.

<br/>

### TopBar 구조

`TopBar`는 `left`, `center`, `right` 세 가지 영역으로 나눠져 있고, 각각에 컴포넌트를 넣을 수 있도록 `React.ReactNode` 타입으로 받습니다. 배경색(`bgColor`)도 설정할 수 있어서, 페이지에 맞는 색상으로 쉽게 변경 가능합니다.

```tsx
export const TopBar = ({ left, center, right, bgColor = 'bg-white' }: TopBarProps) => {
  return (
    <div className={`TOP-BAR sticky ${bgColor} w-full h-12`}>
      <ul className="flex flex-row justify-between w-full h-12 px-4">
        <li className="w-max min-w-10 h-12 flex flex-row justify-center items-center">
          {left}
        </li>
        <li className="w-max min-w-10 h-12 flex flex-row justify-center items-center">
          {center}
        </li>
        <li className="w-max min-w-10 h-12 flex flex-row justify-center items-center">
          {right}
        </li>
      </ul>
    </div>
  );
};
```

<br/>

### TopBar 사용 예시
TopBar는 특정 페이지에서 이렇게 사용하면 됩니다. 예를 들어, 왼쪽에는 뒤로 가기 버튼, 가운데에는 페이지 제목, 오른쪽에는 설정 아이콘 등을 넣을 수 있습니다.

```tsx
<TopBar
  left={<button onClick={() => navigate(-1)}>뒤로</button>}
  center={<p>페이지 제목</p>}
  right={<SettingsIcon />}
/>
```

<br/><br/>

## 2. PageContainer 구성
PageContainer는 페이지의 메인 콘텐츠 영역을 담당합니다. 여기에 페이지의 제목이나 주요 내용을 넣고, BottomBar의 상태에 따라 하단 패딩도 자동으로 조절됩니다. 

기본적으로 
1. 배경색과 
2. X축 패딩 여부
3. Title
을 일관되며 유연하게 적용할 수 있도록 props로 전달 받아 적용할 수 있도록 했습니다. 모두 optional입니다.

PageContainer 구조
PageContainer는 children으로 페이지 콘텐츠를 감싸는 역할을 하며, 배경색(bgColor), 수평 패딩(activePaddingX), 제목(titleContent)을 설정할 수 있습니다. 또한, BottomBar가 활성화되어 있으면 하단에 여유 공간을 추가해줍니다.

```tsx
export const PageContainer = ({ children, activePaddingX = true, bgColor = 'bg-white', titleContent }: PropsWithChildren<PageContainerProps>) => {
  const isBottomBarActivated = useBottomBarStore((state: BottomBarState) => state.active);

  return (
    <div className={`PAGE-CONTAINER ${bgColor} ${activePaddingX ? 'px-4' : 'px-0'} ${isBottomBarActivated ? 'pb-14' : 'pb-0'} flex-1 w-full overflow-auto`}>
      <div className="py-2">{titleContent}</div>
      {children}
    </div>
  );
};
```

<br/>
<br/>

## 3. TopBar와 PageContainer 사용 예시.
대부분의 페이지에서는 TopBar와 PageContainer를 함께 사용하게 될 것 같습니다.

```tsx

const MyPage = () => {
  useSetBottomBar({ active: true, isDarkMode: false });

  return (
    <>
      <TopBar
        left={<button onClick={() => navigate(-1)}>뒤로</button>}
        center={<p>마이 페이지</p>}
        right={<SettingsIcon />}
      />
      <PageContainer
        bgColor="bg-gray-100"
        titleContent={<h1>마이 페이지</h1>}
      >
        <p>여기에 페이지 내용을 넣으시면 됩니다.</p>
      </PageContainer>
    </>
  );
};
```