import { http, HttpResponse } from 'msw';

import {
  EquipmentNFTDTO,
  EquipmentDTO,
  SellNFTDTO,
  UserDTO,
  SaleDTO,
} from '@/modules/game/@types/new_index';

// 목킹용 예제 데이터 생성
const sampleEquipments: EquipmentNFTDTO[] = [
  {
    ipfsCID: 'QmVXffNKw4JV8fF2xLo8613RpM6h68LsZ92P35MjFSZ5qp',
    nftUrl:
      'http://ggul-ipfs.kro.kr:5002/ipfs/QmVXffNKw4JV8fF2xLo8613RpM6h68LsZ92P35MjFSZ5qp',
    status: 'NONE',
    equipment: {
      adjective: '비범한',
      name: '핫도그',
      // 프로젝트 내 이미지 경로로 변경
      imageUrl: '/src/assets/images/food/food_hotdog.png',
      power: 494,
      grade: 2,
      transactionHash:
        '0x88eb3dd02c30c5c36e56f677a7efaf47c653243af768eab73732d85a2d40486d',
      transactionUrl:
        'http://ggul-chain.kro.kr/tx/0x88eb3dd02c30c5c36e56f677a7efaf47c653243af768eab73732d85a2d40486d?tab=logs',
    },
  },
  {
    ipfsCID: 'QmSwv9wEVBSz9CUdxUaY7zk1DFD8jRT8qum2i5pusptpTc',
    nftUrl:
      'http://ggul-ipfs.kro.kr:5002/ipfs/QmSwv9wEVBSz9CUdxUaY7zk1DFD8jRT8qum2i5pusptpTc',
    status: 'EQUIPPED',
    equipment: {
      adjective: '평범한',
      name: '참치캔',
      // 프로젝트 내 이미지 경로로 변경
      imageUrl: '/src/assets/images/food/food_can.png',
      power: 93,
      grade: 0,
      transactionHash:
        '0x5e7ceb11e5f18dd4c050ef9bfe01460a7ea993e75a766eab329b01ed58d0ec9e6',
      transactionUrl:
        'http://ggul-chain.kro.kr/tx/0x5e7ceb11e5f18dd4c050ef9bfe01460a7ea993e75a766eab329b01ed58d0ec9e6?tab=logs',
    },
  },
];

let equippedEquipment: EquipmentNFTDTO | null =
  sampleEquipments.find((equipment) => equipment.status === 'EQUIPPED') || null;

export const gameHandlers = [
  // 보유한 장비 조회
  http.get('/equipments', async () => {
    const filteredEquipments = sampleEquipments.filter(
      (equipment) => equipment,
    );

    return HttpResponse.json(filteredEquipments);
  }),

  // 장착한 장비 조회
  http.get('/equipments/equipped', async () => {
    return HttpResponse.json(equippedEquipment);
  }),

  // 장비 장착
  http.put('/equipments/equip', async ({ request }) => {
    const { ipfsCID } = (await request.json()) as { ipfsCID: string };

    const equipmentToEquip = sampleEquipments.find(
      (equipment) => equipment.ipfsCID === ipfsCID,
    );

    if (equipmentToEquip) {
      equippedEquipment = { ...equipmentToEquip, status: 'EQUIPPED' };

      return HttpResponse.json({ success: true });
    } else {
      return HttpResponse.json({ success: false }, { status: 404 });
    }
  }),

  // 장비 해제
  http.put('/equipments/unequip', async ({ request }) => {
    const { ipfsCID } = (await request.json()) as { ipfsCID: string };

    if (equippedEquipment && equippedEquipment.ipfsCID === ipfsCID) {
      equippedEquipment = null;

      return HttpResponse.json({ success: true });
    } else {
      return HttpResponse.json({ success: false }, { status: 404 });
    }
  }),

  // 장비 삭제
  http.post('/equipments/remove', async ({ request }) => {
    const { ipfsCID } = (await request.json()) as { ipfsCID: string };

    const indexToRemove = sampleEquipments.findIndex(
      (equipment) => equipment.ipfsCID === ipfsCID,
    );

    if (indexToRemove !== -1) {
      sampleEquipments.splice(indexToRemove, 1);

      return HttpResponse.json({ success: true });
    } else {
      return HttpResponse.json({ success: false }, { status: 404 });
    }
  }),

  // 장비 뽑기
  http.post('/equipments/draw', async () => {
    const newEquipment: EquipmentDTO = {
      adjective: '빛나는',
      name: '초콜릿바',
      // 프로젝트 내 이미지 경로로 변경
      imageUrl: '/src/assets/images/food/food_cupcake.png',
      power: 150,
      grade: 1,
      transactionHash:
        '0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234567',
      transactionUrl:
        'http://ggul-chain.kro.kr/tx/0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234567?tab=logs',
    };

    return HttpResponse.json(newEquipment);
  }),

  // 장비 NFT 발행
  http.post('/equipments/mint', async ({ request }) => {
    const { transactionHash } = (await request.json()) as {
      transactionHash: string;
    };

    const newNFT: EquipmentNFTDTO = {
      ipfsCID: 'QmNewlyMintedIpfsCID',
      nftUrl: 'http://ggul-ipfs.kro.kr:5002/ipfs/QmNewlyMintedIpfsCID',
      status: 'NONE',
      equipment: {
        adjective: '매우 희귀한',
        name: '신비의 과자',
        // 프로젝트 내 이미지 경로로 변경
        imageUrl: '/src/assets/images/food/food_tofu.png',
        power: 200,
        grade: 3,
        transactionHash,
        transactionUrl: `http://ggul-chain.kro.kr/tx/${transactionHash}?tab=logs`,
      },
    };

    sampleEquipments.push(newNFT);

    return HttpResponse.json(newNFT);
  }),

  //====================== 마켓 모킹 ==========================
  // 판매 글 작성
  // 판매 글 작성
  http.post('/market/sell', async ({ request }) => {
    const { ipfsCID, title, description, price } = (await request.json()) as {
      ipfsCID: string;
      title: string;
      description: string;
      price: number;
    };

    // NFT 정보를 찾아서 SaleDTO로 변경
    const equipmentNFT = sampleEquipments.find(
      (equipment) => equipment.ipfsCID === ipfsCID,
    );

    if (!equipmentNFT) {
      return HttpResponse.json(
        { success: false, message: 'NFT not found' },
        { status: 404 },
      );
    }

    const sale: SaleDTO = {
      title,
      description,
      price,
      createdAt: new Date().toISOString(),
    };

    const newSellItem: SellNFTDTO = {
      sale,
      ipfsCID,
      nftUrl: equipmentNFT.nftUrl,
      equipment: equipmentNFT.equipment,
      seller: mockSeller,
    };

    sampleSellList.push(newSellItem);

    return HttpResponse.json({ success: true });
  }),

  // 판매 글 조회
  http.get('/market/sell/:ipfsCID', async ({ params }) => {
    const { ipfsCID } = params as { ipfsCID: string };

    const sellNFT = sampleSellList.find((item) => item.ipfsCID === ipfsCID);

    if (!sellNFT) {
      return HttpResponse.json(
        { success: false, message: 'Sell item not found' },
        { status: 404 },
      );
    }

    return HttpResponse.json(sellNFT);
  }),

  // 판매 글 리스트 조회 (URL 검색자 없이 전체 반환)
  http.get('/market/sells', async () => {
    return HttpResponse.json(sampleSellList);
  }),

  // 판매 글 수정
  http.put('/market/sell/:ipfsCID', async ({ params, request }) => {
    const { ipfsCID } = params as { ipfsCID: string };
    const { title, description, price } = (await request.json()) as SaleDTO;

    const sellNFTIndex = sampleSellList.findIndex(
      (item) => item.ipfsCID === ipfsCID,
    );

    if (sellNFTIndex === -1) {
      return HttpResponse.json(
        { success: false, message: 'Sell item not found' },
        { status: 404 },
      );
    }

    sampleSellList[sellNFTIndex].sale = {
      title,
      description,
      price,
      createdAt: sampleSellList[sellNFTIndex].sale.createdAt, // keep original creation date
    };

    return HttpResponse.json({ success: true });
  }),

  // 판매 글 삭제
  http.delete('/market/sell/:ipfsCID', async ({ params }) => {
    const { ipfsCID } = params as { ipfsCID: string };

    const sellNFTIndex = sampleSellList.findIndex(
      (item) => item.ipfsCID === ipfsCID,
    );

    if (sellNFTIndex === -1) {
      return HttpResponse.json(
        { success: false, message: 'Sell item not found' },
        { status: 404 },
      );
    }

    sampleSellList.splice(sellNFTIndex, 1);

    return HttpResponse.json({ success: true });
  }),
];

// 판매 글 리스트를 저장할 곳
const sampleSellList: SellNFTDTO[] = [];

// 목킹용 판매자 정보
const mockSeller: UserDTO = {
  username: 'test@example.com',
  nickname: '맛도리',
  profileImage: '/src/assets/images/profile/default_profile.png',
};
