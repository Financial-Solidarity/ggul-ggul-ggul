package com.ggul.application.equipment.application;

import com.ggul.application.common.infra.blockchain.EthereumCall;
import com.ggul.application.equipment.application.dto.EquipmentMintResult;
import com.ggul.application.equipment.exception.NFTOwnerAlreadyExistsException;
import com.ggul.application.equipment.infra.EquipmentNFTContract;
import com.ggul.application.equipment.infra.exception.ERC721InvalidSenderException;
import com.ggul.application.wallet.exception.WalletInsufficientTokenException;
import com.ggul.application.wallet.infra.TokenContract;
import com.ggul.application.wallet.infra.exception.ERC20InsufficientBalanceException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.math.BigInteger;

import static com.ggul.application.common.infra.blockchain.EthereumCallExceptionHandler.handleException;
import static com.ggul.application.common.infra.blockchain.EthereumCaller.call;

@Service
@RequiredArgsConstructor
public class EquipmentNFTService {
    private final TokenContract adminTokenContract;
    private final EquipmentNFTContract adminEquipmentNFTContract;
    private BigInteger ISSUE_COST;

    @PostConstruct
    public void init() {
        ISSUE_COST = handleException(call(adminEquipmentNFTContract.COST()));
    }

    /**
     * Equipment NFT 발행
     * @param address NFT 발행하는 Wallet 주소
     * @param ipfsCid IPFS CID
     * @return NFT 발행 결과
     * @throws WalletInsufficientTokenException Wallet에서 지급할 Token 부족
     * @throws NFTOwnerAlreadyExistsException NFT의 소유자가 이미 존재
     */
    public EquipmentMintResult mintNFT(String address, String ipfsCid) throws WalletInsufficientTokenException, NFTOwnerAlreadyExistsException {
        BigInteger balance = handleException(call(adminTokenContract.balanceOf(address)));
        if(balance.compareTo(ISSUE_COST) < 0)
            throw new WalletInsufficientTokenException(null);

        EthereumCall<TransactionReceipt> ec = call(adminEquipmentNFTContract.mint(address, ipfsCid));
        if(ec.isSuccess()){
            TransactionReceipt tr = ec.getValue();
            EquipmentNFTContract.MintResultEventResponse event = EquipmentNFTContract.getMintResultEvents(tr).get(0);
            return new EquipmentMintResult(tr.getTransactionHash(), event.ipfsCID, event.nftURI);
        }

        if(ec.getException() instanceof ERC20InsufficientBalanceException)
            throw new WalletInsufficientTokenException(ec.getException());
        else if(ec.getException() instanceof ERC721InvalidSenderException)
            throw new NFTOwnerAlreadyExistsException(ec.getException());
        throw ec.getException();
    }
}
