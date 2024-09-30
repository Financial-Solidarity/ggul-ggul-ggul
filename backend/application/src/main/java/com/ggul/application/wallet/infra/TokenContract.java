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
    public static final String BINARY = "0x60806040523480156200001157600080fd5b5060405162001bdf38038062001bdf833981810160405281019062000037919062000420565b6040518060400160405280600a81526020017f4747554c20546f6b656e000000000000000000000000000000000000000000008152506040518060400160405280600481526020017f4747554c000000000000000000000000000000000000000000000000000000008152508160039081620000b49190620006c2565b508060049081620000c69190620006c2565b50505033600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200011c33826200012360201b60201c565b50620008e0565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620001985760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016200018f9190620007ee565b60405180910390fd5b620001ac60008383620001b060201b60201c565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160362000206578060026000828254620001f991906200083a565b92505081905550620002dc565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101562000295578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016200028c9392919062000886565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160362000327578060026000828254039250508190555062000374565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620003d39190620008c3565b60405180910390a3505050565b600080fd5b6000819050919050565b620003fa81620003e5565b81146200040657600080fd5b50565b6000815190506200041a81620003ef565b92915050565b600060208284031215620004395762000438620003e0565b5b6000620004498482850162000409565b91505092915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620004d457607f821691505b602082108103620004ea57620004e96200048c565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620005547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000515565b62000560868362000515565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620005a36200059d6200059784620003e5565b62000578565b620003e5565b9050919050565b6000819050919050565b620005bf8362000582565b620005d7620005ce82620005aa565b84845462000522565b825550505050565b600090565b620005ee620005df565b620005fb818484620005b4565b505050565b5b81811015620006235762000617600082620005e4565b60018101905062000601565b5050565b601f82111562000672576200063c81620004f0565b620006478462000505565b8101602085101562000657578190505b6200066f620006668562000505565b83018262000600565b50505b505050565b600082821c905092915050565b6000620006976000198460080262000677565b1980831691505092915050565b6000620006b2838362000684565b9150826002028217905092915050565b620006cd8262000452565b67ffffffffffffffff811115620006e957620006e86200045d565b5b620006f58254620004bb565b6200070282828562000627565b600060209050601f8311600181146200073a576000841562000725578287015190505b620007318582620006a4565b865550620007a1565b601f1984166200074a86620004f0565b60005b8281101562000774578489015182556001820191506020850194506020810190506200074d565b8683101562000794578489015162000790601f89168262000684565b8355505b6001600288020188555050505b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620007d682620007a9565b9050919050565b620007e881620007c9565b82525050565b6000602082019050620008056000830184620007dd565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006200084782620003e5565b91506200085483620003e5565b92508282019050808211156200086f576200086e6200080b565b5b92915050565b6200088081620003e5565b82525050565b60006060820190506200089d6000830186620007dd565b620008ac602083018562000875565b620008bb604083018462000875565b949350505050565b6000602082019050620008da600083018462000875565b92915050565b6112ef80620008f06000396000f3fe608060405234801561001057600080fd5b50600436106100f45760003560e01c8063519888e411610097578063a9059cbb11610066578063a9059cbb14610271578063dd62ed3e146102a1578063f5537ede146102d1578063f5ff5c76146102ed576100f4565b8063519888e4146101eb57806370a082311461020757806395d89b4114610237578063a0712d6814610255576100f4565b8063095ea7b3116100d3578063095ea7b31461014f57806318160ddd1461017f57806323b872dd1461019d578063313ce567146101cd576100f4565b8062533577146100f9578063028eab221461011557806306fdde0314610131575b600080fd5b610113600480360381019061010e9190610ee9565b61030b565b005b61012f600480360381019061012a9190610ee9565b6103c0565b005b610139610475565b6040516101469190610fa6565b60405180910390f35b61016960048036038101906101649190610ffe565b610507565b6040516101769190611059565b60405180910390f35b61018761052a565b6040516101949190611083565b60405180910390f35b6101b760048036038101906101b2919061109e565b610534565b6040516101c49190611059565b60405180910390f35b6101d5610563565b6040516101e2919061110d565b60405180910390f35b61020560048036038101906102009190610ffe565b610568565b005b610221600480360381019061021c9190610ee9565b6105ef565b60405161022e9190611083565b60405180910390f35b61023f610637565b60405161024c9190610fa6565b60405180910390f35b61026f600480360381019061026a9190611128565b6106c9565b005b61028b60048036038101906102869190610ffe565b610730565b6040516102989190611059565b60405180910390f35b6102bb60048036038101906102b69190611155565b610753565b6040516102c89190611083565b60405180910390f35b6102eb60048036038101906102e6919061109e565b6107da565b005b6102f5610840565b60405161030291906111a4565b60405180910390f35b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461036557600080fd5b6001600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461041a57600080fd5b6001600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b606060038054610484906111ee565b80601f01602080910402602001604051908101604052809291908181526020018280546104b0906111ee565b80156104fd5780601f106104d2576101008083540402835291602001916104fd565b820191906000526020600020905b8154815290600101906020018083116104e057829003601f168201915b5050505050905090565b600080610512610866565b905061051f81858561086e565b600191505092915050565b6000600254905090565b60008061053f610866565b905061054c858285610880565b610557858585610914565b60019150509392505050565b600090565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166105be57600080fd5b6105eb82600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683610914565b5050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b606060048054610646906111ee565b80601f0160208091040260200160405190810160405280929190818152602001828054610672906111ee565b80156106bf5780601f10610694576101008083540402835291602001916106bf565b820191906000526020600020905b8154815290600101906020018083116106a257829003601f168201915b5050505050905090565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461072357600080fd5b61072d3382610a08565b50565b60008061073b610866565b9050610748818585610914565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1661083057600080fd5b61083b838383610914565b505050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600033905090565b61087b8383836001610a8a565b505050565b600061088c8484610753565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811461090e57818110156108fe578281836040517ffb8f41b20000000000000000000000000000000000000000000000000000000081526004016108f59392919061121f565b60405180910390fd5b61090d84848484036000610a8a565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036109865760006040517f96c6fd1e00000000000000000000000000000000000000000000000000000000815260040161097d91906111a4565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036109f85760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016109ef91906111a4565b60405180910390fd5b610a03838383610c61565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610a7a5760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610a7191906111a4565b60405180910390fd5b610a8660008383610c61565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610afc5760006040517fe602df05000000000000000000000000000000000000000000000000000000008152600401610af391906111a4565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610b6e5760006040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610b6591906111a4565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508015610c5b578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610c529190611083565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610cb3578060026000828254610ca79190611285565b92505081905550610d86565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610d3f578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610d369392919061121f565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610dcf5780600260008282540392505081905550610e1c565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610e799190611083565b60405180910390a3505050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610eb682610e8b565b9050919050565b610ec681610eab565b8114610ed157600080fd5b50565b600081359050610ee381610ebd565b92915050565b600060208284031215610eff57610efe610e86565b5b6000610f0d84828501610ed4565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610f50578082015181840152602081019050610f35565b60008484015250505050565b6000601f19601f8301169050919050565b6000610f7882610f16565b610f828185610f21565b9350610f92818560208601610f32565b610f9b81610f5c565b840191505092915050565b60006020820190508181036000830152610fc08184610f6d565b905092915050565b6000819050919050565b610fdb81610fc8565b8114610fe657600080fd5b50565b600081359050610ff881610fd2565b92915050565b6000806040838503121561101557611014610e86565b5b600061102385828601610ed4565b925050602061103485828601610fe9565b9150509250929050565b60008115159050919050565b6110538161103e565b82525050565b600060208201905061106e600083018461104a565b92915050565b61107d81610fc8565b82525050565b60006020820190506110986000830184611074565b92915050565b6000806000606084860312156110b7576110b6610e86565b5b60006110c586828701610ed4565b93505060206110d686828701610ed4565b92505060406110e786828701610fe9565b9150509250925092565b600060ff82169050919050565b611107816110f1565b82525050565b600060208201905061112260008301846110fe565b92915050565b60006020828403121561113e5761113d610e86565b5b600061114c84828501610fe9565b91505092915050565b6000806040838503121561116c5761116b610e86565b5b600061117a85828601610ed4565b925050602061118b85828601610ed4565b9150509250929050565b61119e81610eab565b82525050565b60006020820190506111b96000830184611195565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061120657607f821691505b602082108103611219576112186111bf565b5b50919050565b60006060820190506112346000830186611195565b6112416020830185611074565b61124e6040830184611074565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061129082610fc8565b915061129b83610fc8565b92508282019050808211156112b3576112b2611256565b5b9291505056fea2646970667358221220389d9a807fc83099e83c561e4108131c04d84d1bbc68e7ba61ade714c7f63d5964736f6c63430008180033";

    private static String librariesLinkedBinary;

    public static final String FUNC_AGENT = "agent";

    public static final String FUNC_ALLOWANCE = "allowance";

    public static final String FUNC_APPROVE = "approve";

    public static final String FUNC_BALANCEOF = "balanceOf";

    public static final String FUNC_DECIMALS = "decimals";

    public static final String FUNC_MINT = "mint";

    public static final String FUNC_NAME = "name";

    public static final String FUNC_REGISTERTRANSFERTOKENALLOWEDCONTRACTLIST = "registerTransferTokenAllowedContractList";

    public static final String FUNC_REGISTERUSETOKENALLOWEDCONTRACTLIST = "registerUseTokenAllowedContractList";

    public static final String FUNC_SYMBOL = "symbol";

    public static final String FUNC_TOTALSUPPLY = "totalSupply";

    public static final String FUNC_TRANSFER = "transfer";

    public static final String FUNC_TRANSFERFROM = "transferFrom";

    public static final String FUNC_TRANSFERTOKEN = "transferToken";

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

    public RemoteFunctionCall<String> agent() {
        final Function function = new Function(FUNC_AGENT,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
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

    public RemoteFunctionCall<TransactionReceipt> registerTransferTokenAllowedContractList(
            String _contractAddress) {
        final Function function = new Function(
                FUNC_REGISTERTRANSFERTOKENALLOWEDCONTRACTLIST,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _contractAddress)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
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

    public RemoteFunctionCall<TransactionReceipt> transferToken(String _from, String _to,
                                                                BigInteger _amount) {
        final Function function = new Function(
                FUNC_TRANSFERTOKEN,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _from),
                        new org.web3j.abi.datatypes.Address(160, _to),
                        new org.web3j.abi.datatypes.generated.Uint256(_amount)),
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
