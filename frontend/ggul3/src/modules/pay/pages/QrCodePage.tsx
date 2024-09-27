import { useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';
import { BsFullscreen } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

interface ItemData {
  categoryId: string;
  productName: string;
  requiredMoney: string;
  market: string;
}

export const QrCodePage = () => {
  const navigate = useNavigate();

  const videoRef = useRef(null);

  const handleScan = (result: QrScanner.ScanResult) => {
    const parsedData = JSON.parse(result.data);

    console.log(parsedData);
  };

  useEffect(() => {
    const videoElem = videoRef.current;

    if (videoElem) {
      const qrScanner = new QrScanner(
        videoElem,
        (result) => {
          // data 속성 추출
          // @ts-ignore
          const dataString = result.data; // 앞뒤 공백 제거

          // JSON으로 변환 (필요한 경우)
          const jsonData = JSON.parse(dataString);
          const { categoryId, productName, requiredMoney, market } = jsonData;

          navigate(
            `/pay/qr-pay?categoryId=${categoryId}&productName=${productName}&requiredMoney=${requiredMoney}&market=${market}`,
          );

          // 결제페이지로 이동

          // @ts-ignore
          return handleScan(result);
        },
        // @ts-ignore
        QrOptions,
      );

      qrScanner.start();

      return () => qrScanner.destroy();
    }
  }, []);

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <track
          default
          kind="captions"
          label="English"
          src="captions_en.vtt"
          srcLang="en"
        />
      </video>
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <BsFullscreen className="text-[300px]" />
      </div>
    </div>
  );
};

const QrOptions = {
  // 핸드폰의 경우, 외부 카메라인지 셀프카메라인지
  preferredCamera: 'environment',
  // 1초당 몇번의 스캔을 할 것인지? ex) 1초에 60번 QR 코드 감지한다.
  maxScansPerSecond: 60,
  // QR 스캔이 일어나는 부분을 표시해줄 지 (노란색 네모 테두리가 생긴다.)
  highlightCodeOutline: true,
  returnDetailedScanResult: true,
};

// 카테고리 id
// 상품명
// 가격
// 가게 이름
