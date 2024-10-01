package com.ggul.application.equipment.application;

import com.ggul.application.common.infra.blockchain.EthereumCall;
import com.ggul.application.common.infra.ipfs.upload.IPFSJsonUploader;
import com.ggul.application.common.infra.ipfs.upload.IPFSResponse;
import com.ggul.application.equipment.application.dto.EquipmentMintResult;
import com.ggul.application.equipment.application.vo.EquipmentNFT;
import com.ggul.application.equipment.domain.Equipment;
import com.ggul.application.equipment.domain.TokenizedEquipment;
import com.ggul.application.equipment.exception.EquipmentAlreadyMintedException;
import com.ggul.application.equipment.exception.EquipmentUnauthorizedException;
import com.ggul.application.equipment.infra.EquipmentNFTContract;
import com.ggul.application.common.infra.blockchain.exception.ERC721InvalidSenderException;
import com.ggul.application.wallet.exception.WalletInsufficientTokenException;
import com.ggul.application.common.infra.blockchain.exception.ERC20InsufficientBalanceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.util.Objects;

import static com.ggul.application.common.infra.blockchain.EthereumCaller.call;
import static com.ggul.application.common.infra.blockchain.EthereumCallExceptionHandler.handleException;

@Service
@RequiredArgsConstructor
public class EquipmentNFTService {

    private final EquipmentNFTContract adminEquipmentNFTContract;
    private final IPFSJsonUploader ipfsJsonUploader;

    /**
     * Equipment NFT 발행
     * @param address NFT 발행하는 Wallet 주소
     * @param equipment NFT로 발행할 equipment
     * @return NFT 발행 결과
     */
    public EquipmentMintResult mintNFT(String address, Equipment equipment){

        IPFSResponse ipfsResponse = ipfsJsonUploader.upload("metadata.json", EquipmentNFT.of(equipment));
        EthereumCall<TransactionReceipt> ec = call(adminEquipmentNFTContract.mint(address, ipfsResponse.getHash()));
        if(ec.isSuccess()){
            TransactionReceipt tr = ec.getValue();
            EquipmentNFTContract.MintResultEventResponse event = EquipmentNFTContract.getMintResultEvents(tr).get(0);
            return new EquipmentMintResult(tr.getTransactionHash(), event.ipfsCID, event.nftURI);
        }

        if(ec.getException() instanceof ERC20InsufficientBalanceException)
            throw new WalletInsufficientTokenException();
        else if(ec.getException() instanceof ERC721InvalidSenderException)
            throw new EquipmentAlreadyMintedException();
        throw ec.getException();
    }

    /**
     * Equipment NFT 삭제
     * @param address NFT 삭제할 Wallet 주소
     * @param equipment NFT 삭제할 equipment
     */
    public void burnNFT(String address, TokenizedEquipment equipment){
        if(!verifyOwner(address, equipment))
            throw new EquipmentUnauthorizedException();
        handleException(call(adminEquipmentNFTContract.burn(address, equipment.getIpfsCID())));
    }

    /**
     * Equipment 소유 여부 확인
     * @param address 소유자 Wallet 주소
     * @param equipment 확인할 equipment
     */
    public boolean verifyOwner(String address, TokenizedEquipment equipment){
        String ownerAddress = handleException(call(adminEquipmentNFTContract.ownerOf(equipment.getIpfsCID())));
        return Objects.equals(address, ownerAddress);
    }
}
