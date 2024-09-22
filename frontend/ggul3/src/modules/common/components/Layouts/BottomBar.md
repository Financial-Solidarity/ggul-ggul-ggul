# 라우터, BottomBar 관련 설명 문서

 `react-router-dom`의 createBroswerRouter를 사용해 라우팅을 구성했고, `zustand`로 `BottomBar` 상태 관리를 처리했습니다.

## 1. 라우터 설정

라우터는 `react-router-dom`의 `createBrowserRouter`로 설정했습니다. 주요 경로들은 `PathNames`라는 객체에 미리 정의해두었고, 각 경로는 컴포넌트에서 쉽게 접근할 수 있도록 만들었습니다.

```typescript
export const PathNames: IPathNames = {
  HOME: { path: '/', name: '홈' },
  GAME: { path: '/game', name: '껄키우기' },
  CHALLENGE: { path: '/challenge', name: '챌린지' },
  GGULPAY: { path: '/pay', name: '껄페이' },
  ACCOUNTBOOK: { path: '/accountbook', name: '가계부' },
  MYPAGE: { path: '/mypage', name: '마이페이지' },
};
```
라우터 설정은 이렇게 했습니다. App 컴포넌트가 공통적인 레이아웃을 담당하고, 그 안에서 Outlet으로 각 페이지 컴포넌트를 렌더링하게 했습니다. BottomBar는 App 컴포넌트에 항상 붙어있습니다.

```typescript
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <GGul /> }, 
      { path: PathNames.GAME.path, element: <GGul /> },
      { path: PathNames.CHALLENGE.path, element: <GGul /> },
      ...
    ],
  },
]);
```

## 2. BottomBar 컴포넌트
구조는 왼쪽 버튼, 중앙 버튼, 오른쪽 버튼으로 나뉩니다. isCurrentPath 함수로 현재 라우트 주소와 비교하여 활성화를 boolean으로 판단 및 tailwind-varaints에 파라미터로 전달하여 스타일을 동적으로 변경하도록 설계했습니다.

zustand로 관리하는 BottomBar 상태의 isDarkMode와 함께 고려되어 다크모드/라이트모드로 스타일링됩니다.

```tsx
return (
  <div className={`BOTTOM-BAR fixed rounded-t-2xl ...`}>
    <ul className="flex flex-row justify-between w-full items-center px-4">
      {/* 좌측 버튼 */}
      <ul className="flex flex-row gap-7">
        <BottomBarButton
          icon={<ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7" />}
          label="챌린지"
          isActive={isCurrentPath(PathNames.CHALLENGE.path)}
          isDarkMode={isDarkMode}
          onClick={() => handleNavigation(PathNames.CHALLENGE.path)}
        />
        {/* 다른 버튼들도 같은 방식으로 설정되어 있습니다. */}
      </ul>

      {/* 중앙 버튼 */}
      <div className="absolute left-1/2 bottom-2 ..." onClick={() => handleNavigation(PathNames.GGULPAY.path)}>
        <div className={centerButtonStyles({ isActive: isCurrentPath(PathNames.GGULPAY.path) })}>
          <QrCodeIcon className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* 우측 버튼 */}
      <ul className="flex flex-row gap-7">
        <BottomBarButton
          icon={<CalendarIcon className="h-7 w-7" />}
          label="가계부"
          isActive={isCurrentPath(PathNames.ACCOUNTBOOK.path)}
          isDarkMode={isDarkMode}
          onClick={() => handleNavigation(PathNames.ACCOUNTBOOK.path)}
        />
      </ul>
    </ul>
  </div>
);
```

## 3. BottomBar.styles.ts
tailwind-variants 활용 스타일링 중 일부 스니펫입니다. 

```tsx
...
  compoundVariants: [
    {
      isActive: true,
      isDarkMode: false,
      class: 'text-primary-700', 
    },
    {
      isActive: true,
      isDarkMode: true,
      class: 'text-white', // 다크 모드에서 활성화된 버튼은 흰색
    },
  ],
  ...
```

## 4. 상태 관리 (zustand)
zustand로 BottomBar의 활성화 상태(active)와 다크 모드(isDarkMode)를 관리하고 있습니다. 

추가로
useBottomBarStore라는 커스텀 훅을 만들어서 바텀바 설정해야할 컴포넌트 내에 호출하는 라인 한줄로 관리할 수 있도록 했습니다.

```typescript
export const useBottomBarStore = create<BottomBarState>((set) => ({
  active: true,
  isDarkMode: false,
  setActive: (param: boolean) => set({ active: param }),
  setIsDarkMode: (param: boolean) => set({ isDarkMode: param }),
}));
```

### 5. EX) 특정 페이지에서 BottomBar 설정하기
각 페이지에서 useSetBottomBar 훅을 불러 상태를 설정할 수 있습니다. 예를 들어, GGul 페이지에서 BottomBar를 활성화하고 다크 모드로 설정하려면 다음과 같이 하면 됩니다.


```tsx
export const 도메인페이지컴포넌트 = () => {
  useSetBottomBar({ active: true, isDarkMode: true });

  return (
    ...
  );
};
```
useSetBottomBar 훅은 컴포넌트가 렌더링될 때 BottomBar 상태를 설정해 줍니다. active와 isDarkMode 값을 넘겨주면, 해당 페이지에서 그 설정대로 동작하게 됩니다.

