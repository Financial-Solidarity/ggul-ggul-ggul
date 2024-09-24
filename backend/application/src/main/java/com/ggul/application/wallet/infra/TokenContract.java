package com.ggul.application.wallet.infra;

import io.reactivex.Flowable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.abi.datatypes.generated.Uint8;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the
 * <a href="https://github.com/hyperledger/web3j/tree/main/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 1.6.1.
 */
@SuppressWarnings("rawtypes")
public class TokenContract extends Contract {
    public static final String BINARY = "0x60806040523480156200001157600080fd5b5060405162001ac638038062001ac6833981810160405281019062000037919062000420565b6040518060400160405280600a81526020017f4747554c20546f6b656e000000000000000000000000000000000000000000008152506040518060400160405280600481526020017f4747554c000000000000000000000000000000000000000000000000000000008152508160039081620000b49190620006c2565b508060049081620000c69190620006c2565b50505033600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200011c33826200012360201b60201c565b50620008e0565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620001985760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016200018f9190620007ee565b60405180910390fd5b620001ac60008383620001b060201b60201c565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160362000206578060026000828254620001f991906200083a565b92505081905550620002dc565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101562000295578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016200028c9392919062000886565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160362000327578060026000828254039250508190555062000374565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620003d39190620008c3565b60405180910390a3505050565b600080fd5b6000819050919050565b620003fa81620003e5565b81146200040657600080fd5b50565b6000815190506200041a81620003ef565b92915050565b600060208284031215620004395762000438620003e0565b5b6000620004498482850162000409565b91505092915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620004d457607f821691505b602082108103620004ea57620004e96200048c565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620005547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000515565b62000560868362000515565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620005a36200059d6200059784620003e5565b62000578565b620003e5565b9050919050565b6000819050919050565b620005bf8362000582565b620005d7620005ce82620005aa565b84845462000522565b825550505050565b600090565b620005ee620005df565b620005fb818484620005b4565b505050565b5b81811015620006235762000617600082620005e4565b60018101905062000601565b5050565b601f82111562000672576200063c81620004f0565b620006478462000505565b8101602085101562000657578190505b6200066f620006668562000505565b83018262000600565b50505b505050565b600082821c905092915050565b6000620006976000198460080262000677565b1980831691505092915050565b6000620006b2838362000684565b9150826002028217905092915050565b620006cd8262000452565b67ffffffffffffffff811115620006e957620006e86200045d565b5b620006f58254620004bb565b6200070282828562000627565b600060209050601f8311600181146200073a576000841562000725578287015190505b620007318582620006a4565b865550620007a1565b601f1984166200074a86620004f0565b60005b8281101562000774578489015182556001820191506020850194506020810190506200074d565b8683101562000794578489015162000790601f89168262000684565b8355505b6001600288020188555050505b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620007d682620007a9565b9050919050565b620007e881620007c9565b82525050565b6000602082019050620008056000830184620007dd565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006200084782620003e5565b91506200085483620003e5565b92508282019050808211156200086f576200086e6200080b565b5b92915050565b6200088081620003e5565b82525050565b60006060820190506200089d6000830186620007dd565b620008ac602083018562000875565b620008bb604083018462000875565b949350505050565b6000602082019050620008da600083018462000875565b92915050565b6111d680620008f06000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c8063519888e41161008c57806395d89b411161006657806395d89b4114610214578063a0712d6814610232578063a9059cbb1461024e578063dd62ed3e1461027e576100cf565b8063519888e4146101aa57806370a08231146101c65780638da5cb5b146101f6576100cf565b8063028eab22146100d457806306fdde03146100f0578063095ea7b31461010e57806318160ddd1461013e57806323b872dd1461015c578063313ce5671461018c575b600080fd5b6100ee60048036038101906100e99190610dd0565b6102ae565b005b6100f8610363565b6040516101059190610e8d565b60405180910390f35b61012860048036038101906101239190610ee5565b6103f5565b6040516101359190610f40565b60405180910390f35b610146610418565b6040516101539190610f6a565b60405180910390f35b61017660048036038101906101719190610f85565b610422565b6040516101839190610f40565b60405180910390f35b610194610451565b6040516101a19190610ff4565b60405180910390f35b6101c460048036038101906101bf9190610ee5565b610456565b005b6101e060048036038101906101db9190610dd0565b6104ba565b6040516101ed9190610f6a565b60405180910390f35b6101fe610502565b60405161020b919061101e565b60405180910390f35b61021c610528565b6040516102299190610e8d565b60405180910390f35b61024c60048036038101906102479190611039565b6105ba565b005b61026860048036038101906102639190610ee5565b610621565b6040516102759190610f40565b60405180910390f35b61029860048036038101906102939190611066565b610644565b6040516102a59190610f6a565b60405180910390f35b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461030857600080fd5b6001600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b606060038054610372906110d5565b80601f016020809104026020016040519081016040528092919081815260200182805461039e906110d5565b80156103eb5780601f106103c0576101008083540402835291602001916103eb565b820191906000526020600020905b8154815290600101906020018083116103ce57829003601f168201915b5050505050905090565b6000806104006106cb565b905061040d8185856106d3565b600191505092915050565b6000600254905090565b60008061042d6106cb565b905061043a8582856106e5565b610445858585610779565b60019150509392505050565b600090565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166104ac57600080fd5b6104b6828261086d565b5050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b606060048054610537906110d5565b80601f0160208091040260200160405190810160405280929190818152602001828054610563906110d5565b80156105b05780601f10610585576101008083540402835291602001916105b0565b820191906000526020600020905b81548152906001019060200180831161059357829003601f168201915b5050505050905090565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461061457600080fd5b61061e33826108ef565b50565b60008061062c6106cb565b9050610639818585610779565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b6106e08383836001610971565b505050565b60006106f18484610644565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146107735781811015610763578281836040517ffb8f41b200000000000000000000000000000000000000000000000000000000815260040161075a93929190611106565b60405180910390fd5b61077284848484036000610971565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107eb5760006040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016107e2919061101e565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361085d5760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610854919061101e565b60405180910390fd5b610868838383610b48565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036108df5760006040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016108d6919061101e565b60405180910390fd5b6108eb82600083610b48565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036109615760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610958919061101e565b60405180910390fd5b61096d60008383610b48565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036109e35760006040517fe602df050000000000000000000000000000000000000000000000000000000081526004016109da919061101e565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610a555760006040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610a4c919061101e565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508015610b42578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610b399190610f6a565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610b9a578060026000828254610b8e919061116c565b92505081905550610c6d565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610c26578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610c1d93929190611106565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610cb65780600260008282540392505081905550610d03565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610d609190610f6a565b60405180910390a3505050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610d9d82610d72565b9050919050565b610dad81610d92565b8114610db857600080fd5b50565b600081359050610dca81610da4565b92915050565b600060208284031215610de657610de5610d6d565b5b6000610df484828501610dbb565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610e37578082015181840152602081019050610e1c565b60008484015250505050565b6000601f19601f8301169050919050565b6000610e5f82610dfd565b610e698185610e08565b9350610e79818560208601610e19565b610e8281610e43565b840191505092915050565b60006020820190508181036000830152610ea78184610e54565b905092915050565b6000819050919050565b610ec281610eaf565b8114610ecd57600080fd5b50565b600081359050610edf81610eb9565b92915050565b60008060408385031215610efc57610efb610d6d565b5b6000610f0a85828601610dbb565b9250506020610f1b85828601610ed0565b9150509250929050565b60008115159050919050565b610f3a81610f25565b82525050565b6000602082019050610f556000830184610f31565b92915050565b610f6481610eaf565b82525050565b6000602082019050610f7f6000830184610f5b565b92915050565b600080600060608486031215610f9e57610f9d610d6d565b5b6000610fac86828701610dbb565b9350506020610fbd86828701610dbb565b9250506040610fce86828701610ed0565b9150509250925092565b600060ff82169050919050565b610fee81610fd8565b82525050565b60006020820190506110096000830184610fe5565b92915050565b61101881610d92565b82525050565b6000602082019050611033600083018461100f565b92915050565b60006020828403121561104f5761104e610d6d565b5b600061105d84828501610ed0565b91505092915050565b6000806040838503121561107d5761107c610d6d565b5b600061108b85828601610dbb565b925050602061109c85828601610dbb565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806110ed57607f821691505b602082108103611100576110ff6110a6565b5b50919050565b600060608201905061111b600083018661100f565b6111286020830185610f5b565b6111356040830184610f5b565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061117782610eaf565b915061118283610eaf565b925082820190508082111561119a5761119961113d565b5b9291505056fea26469706673582212201e9e6b29e6acdc444523b173126a6f4b72d3416d08a0166808566a7d4e78959b64736f6c63430008180033";

    private static String librariesLinkedBinary;

    public static final String FUNC_ALLOWANCE = "allowance";

    public static final String FUNC_APPROVE = "approve";

    public static final String FUNC_BALANCEOF = "balanceOf";

    public static final String FUNC_DECIMALS = "decimals";

    public static final String FUNC_MINT = "mint";

    public static final String FUNC_NAME = "name";

    public static final String FUNC_OWNER = "owner";

    public static final String FUNC_REGISTERUSETOKENALLOWEDCONTRACTLIST = "registerUseTokenAllowedContractList";

    public static final String FUNC_SYMBOL = "symbol";

    public static final String FUNC_TOTALSUPPLY = "totalSupply";

    public static final String FUNC_TRANSFER = "transfer";

    public static final String FUNC_TRANSFERFROM = "transferFrom";

    public static final String FUNC_USETOKEN = "useToken";

    public static final Event APPROVAL_EVENT = new Event("Approval",
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}));
    ;

    public static final Event TRANSFER_EVENT = new Event("Transfer",
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}));
    ;

    @Deprecated
    protected TokenContract(String contractAddress, Web3j web3j, Credentials credentials,
                            BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected TokenContract(String contractAddress, Web3j web3j, Credentials credentials,
                            ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected TokenContract(String contractAddress, Web3j web3j,
                            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected TokenContract(String contractAddress, Web3j web3j,
                            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<ApprovalEventResponse> getApprovalEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(APPROVAL_EVENT, transactionReceipt);
        ArrayList<ApprovalEventResponse> responses = new ArrayList<ApprovalEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ApprovalEventResponse typedResponse = new ApprovalEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.spender = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ApprovalEventResponse getApprovalEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(APPROVAL_EVENT, log);
        ApprovalEventResponse typedResponse = new ApprovalEventResponse();
        typedResponse.log = log;
        typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.spender = (String) eventValues.getIndexedValues().get(1).getValue();
        typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<ApprovalEventResponse> approvalEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getApprovalEventFromLog(log));
    }

    public Flowable<ApprovalEventResponse> approvalEventFlowable(DefaultBlockParameter startBlock,
                                                                 DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(APPROVAL_EVENT));
        return approvalEventFlowable(filter);
    }

    public static List<TransferEventResponse> getTransferEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(TRANSFER_EVENT, transactionReceipt);
        ArrayList<TransferEventResponse> responses = new ArrayList<TransferEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            TransferEventResponse typedResponse = new TransferEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.from = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.to = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static TransferEventResponse getTransferEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(TRANSFER_EVENT, log);
        TransferEventResponse typedResponse = new TransferEventResponse();
        typedResponse.log = log;
        typedResponse.from = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.to = (String) eventValues.getIndexedValues().get(1).getValue();
        typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<TransferEventResponse> transferEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getTransferEventFromLog(log));
    }

    public Flowable<TransferEventResponse> transferEventFlowable(DefaultBlockParameter startBlock,
                                                                 DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(TRANSFER_EVENT));
        return transferEventFlowable(filter);
    }

    public RemoteFunctionCall<BigInteger> allowance(String owner, String spender) {
        final Function function = new Function(FUNC_ALLOWANCE,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, owner),
                        new org.web3j.abi.datatypes.Address(160, spender)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> approve(String spender, BigInteger value) {
        final Function function = new Function(
                FUNC_APPROVE,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, spender),
                        new org.web3j.abi.datatypes.generated.Uint256(value)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> balanceOf(String account) {
        final Function function = new Function(FUNC_BALANCEOF,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, account)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> decimals() {
        final Function function = new Function(FUNC_DECIMALS,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint8>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> mint(BigInteger _amount) {
        final Function function = new Function(
                FUNC_MINT,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_amount)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> name() {
        final Function function = new Function(FUNC_NAME,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> owner() {
        final Function function = new Function(FUNC_OWNER,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> registerUseTokenAllowedContractList(
            String _contractAddress) {
        final Function function = new Function(
                FUNC_REGISTERUSETOKENALLOWEDCONTRACTLIST,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _contractAddress)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> symbol() {
        final Function function = new Function(FUNC_SYMBOL,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<BigInteger> totalSupply() {
        final Function function = new Function(FUNC_TOTALSUPPLY,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> transfer(String to, BigInteger value) {
        final Function function = new Function(
                FUNC_TRANSFER,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, to),
                        new org.web3j.abi.datatypes.generated.Uint256(value)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> transferFrom(String from, String to,
                                                               BigInteger value) {
        final Function function = new Function(
                FUNC_TRANSFERFROM,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, from),
                        new org.web3j.abi.datatypes.Address(160, to),
                        new org.web3j.abi.datatypes.generated.Uint256(value)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> useToken(String _spender, BigInteger _amount) {
        final Function function = new Function(
                FUNC_USETOKEN,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _spender),
                        new org.web3j.abi.datatypes.generated.Uint256(_amount)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static TokenContract load(String contractAddress, Web3j web3j, Credentials credentials,
                                     BigInteger gasPrice, BigInteger gasLimit) {
        return new TokenContract(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static TokenContract load(String contractAddress, Web3j web3j,
                                     TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new TokenContract(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static TokenContract load(String contractAddress, Web3j web3j, Credentials credentials,
                                     ContractGasProvider contractGasProvider) {
        return new TokenContract(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static TokenContract load(String contractAddress, Web3j web3j,
                                     TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new TokenContract(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<TokenContract> deploy(Web3j web3j, Credentials credentials,
                                                   ContractGasProvider contractGasProvider, BigInteger initialSupply) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(initialSupply)));
        return deployRemoteCall(TokenContract.class, web3j, credentials, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    public static RemoteCall<TokenContract> deploy(Web3j web3j,
                                                   TransactionManager transactionManager, ContractGasProvider contractGasProvider,
                                                   BigInteger initialSupply) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(initialSupply)));
        return deployRemoteCall(TokenContract.class, web3j, transactionManager, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<TokenContract> deploy(Web3j web3j, Credentials credentials,
                                                   BigInteger gasPrice, BigInteger gasLimit, BigInteger initialSupply) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(initialSupply)));
        return deployRemoteCall(TokenContract.class, web3j, credentials, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<TokenContract> deploy(Web3j web3j,
                                                   TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit,
                                                   BigInteger initialSupply) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(initialSupply)));
        return deployRemoteCall(TokenContract.class, web3j, transactionManager, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
    }

    public static void linkLibraries(List<Contract.LinkReference> references) {
        librariesLinkedBinary = linkBinaryWithReferences(BINARY, references);
    }

    private static String getDeploymentBinary() {
        if (librariesLinkedBinary != null) {
            return librariesLinkedBinary;
        } else {
            return BINARY;
        }
    }

    public static class ApprovalEventResponse extends BaseEventResponse {
        public String owner;

        public String spender;

        public BigInteger value;
    }

    public static class TransferEventResponse extends BaseEventResponse {
        public String from;

        public String to;

        public BigInteger value;
    }
}