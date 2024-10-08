package com.ggul.application.application.infra;

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
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
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
public class ApplicationContract extends Contract {
    public static final String BINARY = "0x608060405234801561001057600080fd5b506040516200108f3803806200108f8339818101604052810190610034919061011e565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505061014b565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100eb826100c0565b9050919050565b6100fb816100e0565b811461010657600080fd5b50565b600081519050610118816100f2565b92915050565b600060208284031215610134576101336100bb565b5b600061014284828501610109565b91505092915050565b610f34806200015b6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063375a7c7f146100515780639052b3d51461006d578063c7255cd41461009d578063d5804bd4146100cd575b600080fd5b61006b60048036038101906100669190610927565b6100e9565b005b61008760048036038101906100829190610b45565b6102dd565b6040516100949190610bbc565b60405180910390f35b6100b760048036038101906100b29190610bd7565b61035e565b6040516100c49190610bbc565b60405180910390f35b6100e760048036038101906100e29190610c17565b61041b565b005b3373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461014357600080fd5b6000841161015057600080fd5b81831061015c57600080fd5b60026040518060c00160405280600067ffffffffffffffff811115610184576101836109a4565b5b6040519080825280602002602001820160405280156101b25781602001602082028036833780820191505090505b508152602001868152602001858152602001848152602001838152602001600060018111156101e4576101e3610c6a565b5b8152509080600181540180825580915050600190039060005260206000209060060201600090919091909150600082015181600001908051906020019061022c929190610836565b506020820151816001015560408201518160020155606082015181600301556080820151816004015560a08201518160050160006101000a81548160ff021916908360018111156102805761027f610c6a565b5b021790555050507f2114960acf3916670fc4615633a2fed6573e80d32c0389e7a442f220e4cf491060016002805490506102ba9190610cc8565b858585856040516102cf959493929190610d0b565b60405180910390a150505050565b600080600090505b8351811015610352578273ffffffffffffffffffffffffffffffffffffffff1684828151811061031857610317610d5e565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1603610345576001915050610358565b80806001019150506102e5565b50600090505b92915050565b60006104136002838154811061037757610376610d5e565b5b906000526020600020906006020160000180548060200260200160405190810160405280929190818152602001828054801561040857602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116103be575b5050505050846102dd565b905092915050565b3373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461047557600080fd5b60006002838154811061048b5761048a610d5e565b5b9060005260206000209060060201905061052d8160000180548060200260200160405190810160405280929190818152602001828054801561052257602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116104d8575b5050505050856102dd565b1561053757600080fd5b6000600181111561054b5761054a610c6a565b5b8160050160009054906101000a900460ff16600181111561056f5761056e610c6a565b5b1461057957600080fd5b806004015460008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231866040518263ffffffff1660e01b81526004016105d79190610d9c565b602060405180830381865afa1580156105f4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106189190610dcc565b101561062357600080fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663519888e48583600401546040518363ffffffff1660e01b8152600401610682929190610df9565b600060405180830381600087803b15801561069c57600080fd5b505af11580156106b0573d6000803e3d6000fd5b50505050600081600301546106c586856107fe565b6106cf9190610e51565b9050600082600201548210905080156107885782600001869080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600101548360000180549050036107875760018360050160006101000a81548160ff0219169083600181111561078157610780610c6a565b5b02179055505b5b8573ffffffffffffffffffffffffffffffffffffffff167fdec49cf41f1a3f3fae8f616dee34ca89f71fe01b4578b18a550fcd560d27963383856002015484876000018054905088600101546107de9190610cc8565b6040516107ee9493929190610e82565b60405180910390a2505050505050565b600082428360405160200161081593929190610ec7565b6040516020818303038152906040528051906020012060001c905092915050565b8280548282559060005260206000209081019282156108af579160200282015b828111156108ae5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190610856565b5b5090506108bc91906108c0565b5090565b5b808211156108d95760008160009055506001016108c1565b5090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b610904816108f1565b811461090f57600080fd5b50565b600081359050610921816108fb565b92915050565b60008060008060808587031215610941576109406108e7565b5b600061094f87828801610912565b945050602061096087828801610912565b935050604061097187828801610912565b925050606061098287828801610912565b91505092959194509250565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6109dc82610993565b810181811067ffffffffffffffff821117156109fb576109fa6109a4565b5b80604052505050565b6000610a0e6108dd565b9050610a1a82826109d3565b919050565b600067ffffffffffffffff821115610a3a57610a396109a4565b5b602082029050602081019050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610a7b82610a50565b9050919050565b610a8b81610a70565b8114610a9657600080fd5b50565b600081359050610aa881610a82565b92915050565b6000610ac1610abc84610a1f565b610a04565b90508083825260208201905060208402830185811115610ae457610ae3610a4b565b5b835b81811015610b0d5780610af98882610a99565b845260208401935050602081019050610ae6565b5050509392505050565b600082601f830112610b2c57610b2b61098e565b5b8135610b3c848260208601610aae565b91505092915050565b60008060408385031215610b5c57610b5b6108e7565b5b600083013567ffffffffffffffff811115610b7a57610b796108ec565b5b610b8685828601610b17565b9250506020610b9785828601610a99565b9150509250929050565b60008115159050919050565b610bb681610ba1565b82525050565b6000602082019050610bd16000830184610bad565b92915050565b60008060408385031215610bee57610bed6108e7565b5b6000610bfc85828601610a99565b9250506020610c0d85828601610912565b9150509250929050565b600080600060608486031215610c3057610c2f6108e7565b5b6000610c3e86828701610a99565b9350506020610c4f86828701610912565b9250506040610c6086828701610912565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610cd3826108f1565b9150610cde836108f1565b9250828203905081811115610cf657610cf5610c99565b5b92915050565b610d05816108f1565b82525050565b600060a082019050610d206000830188610cfc565b610d2d6020830187610cfc565b610d3a6040830186610cfc565b610d476060830185610cfc565b610d546080830184610cfc565b9695505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b610d9681610a70565b82525050565b6000602082019050610db16000830184610d8d565b92915050565b600081519050610dc6816108fb565b92915050565b600060208284031215610de257610de16108e7565b5b6000610df084828501610db7565b91505092915050565b6000604082019050610e0e6000830185610d8d565b610e1b6020830184610cfc565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610e5c826108f1565b9150610e67836108f1565b925082610e7757610e76610e22565b5b828206905092915050565b6000608082019050610e976000830187610cfc565b610ea46020830186610cfc565b610eb16040830185610bad565b610ebe6060830184610cfc565b95945050505050565b6000606082019050610edc6000830186610d8d565b610ee96020830185610cfc565b610ef66040830184610cfc565b94935050505056fea26469706673582212203122309ad3e258b4cac29539fd5a406977eaec396c5e8d149132e268f870ef7c64736f6c63430008180033";

    private static String librariesLinkedBinary;

    public static final String FUNC__CONTAINS = "_contains";

    public static final String FUNC_ENTER = "enter";

    public static final String FUNC_REGISTER = "register";

    public static final String FUNC_VERIFYWINNER = "verifyWinner";

    public static final Event APPLICATIONREGISTERRESULT_EVENT = new Event("ApplicationRegisterResult",
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}));
    ;

    public static final Event ENTERRESULT_EVENT = new Event("EnterResult",
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Bool>() {}, new TypeReference<Uint256>() {}));
    ;

    @Deprecated
    protected ApplicationContract(String contractAddress, Web3j web3j, Credentials credentials,
                                  BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected ApplicationContract(String contractAddress, Web3j web3j, Credentials credentials,
                                  ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected ApplicationContract(String contractAddress, Web3j web3j,
                                  TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected ApplicationContract(String contractAddress, Web3j web3j,
                                  TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<ApplicationRegisterResultEventResponse> getApplicationRegisterResultEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(APPLICATIONREGISTERRESULT_EVENT, transactionReceipt);
        ArrayList<ApplicationRegisterResultEventResponse> responses = new ArrayList<ApplicationRegisterResultEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ApplicationRegisterResultEventResponse typedResponse = new ApplicationRegisterResultEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.applicationNo = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.maxWinnerCount = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
            typedResponse.probabilityNume = (BigInteger) eventValues.getNonIndexedValues().get(2).getValue();
            typedResponse.probabilityDeno = (BigInteger) eventValues.getNonIndexedValues().get(3).getValue();
            typedResponse.price = (BigInteger) eventValues.getNonIndexedValues().get(4).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ApplicationRegisterResultEventResponse getApplicationRegisterResultEventFromLog(
            Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(APPLICATIONREGISTERRESULT_EVENT, log);
        ApplicationRegisterResultEventResponse typedResponse = new ApplicationRegisterResultEventResponse();
        typedResponse.log = log;
        typedResponse.applicationNo = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.maxWinnerCount = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
        typedResponse.probabilityNume = (BigInteger) eventValues.getNonIndexedValues().get(2).getValue();
        typedResponse.probabilityDeno = (BigInteger) eventValues.getNonIndexedValues().get(3).getValue();
        typedResponse.price = (BigInteger) eventValues.getNonIndexedValues().get(4).getValue();
        return typedResponse;
    }

    public Flowable<ApplicationRegisterResultEventResponse> applicationRegisterResultEventFlowable(
            EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getApplicationRegisterResultEventFromLog(log));
    }

    public Flowable<ApplicationRegisterResultEventResponse> applicationRegisterResultEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(APPLICATIONREGISTERRESULT_EVENT));
        return applicationRegisterResultEventFlowable(filter);
    }

    public static List<EnterResultEventResponse> getEnterResultEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(ENTERRESULT_EVENT, transactionReceipt);
        ArrayList<EnterResultEventResponse> responses = new ArrayList<EnterResultEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            EnterResultEventResponse typedResponse = new EnterResultEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.player = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.nonce = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.target = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
            typedResponse.isSuccess = (Boolean) eventValues.getNonIndexedValues().get(2).getValue();
            typedResponse.remainingWinnerCount = (BigInteger) eventValues.getNonIndexedValues().get(3).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static EnterResultEventResponse getEnterResultEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(ENTERRESULT_EVENT, log);
        EnterResultEventResponse typedResponse = new EnterResultEventResponse();
        typedResponse.log = log;
        typedResponse.player = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.nonce = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.target = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
        typedResponse.isSuccess = (Boolean) eventValues.getNonIndexedValues().get(2).getValue();
        typedResponse.remainingWinnerCount = (BigInteger) eventValues.getNonIndexedValues().get(3).getValue();
        return typedResponse;
    }

    public Flowable<EnterResultEventResponse> enterResultEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getEnterResultEventFromLog(log));
    }

    public Flowable<EnterResultEventResponse> enterResultEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(ENTERRESULT_EVENT));
        return enterResultEventFlowable(filter);
    }

    public RemoteFunctionCall<Boolean> _contains(List<String> _array, String _player) {
        final Function function = new Function(FUNC__CONTAINS,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.DynamicArray<org.web3j.abi.datatypes.Address>(
                                org.web3j.abi.datatypes.Address.class,
                                org.web3j.abi.Utils.typeMap(_array, org.web3j.abi.datatypes.Address.class)),
                        new org.web3j.abi.datatypes.Address(160, _player)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<TransactionReceipt> enter(String _player, BigInteger _applicationNo,
                                                        BigInteger _seed) {
        final Function function = new Function(
                FUNC_ENTER,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _player),
                        new org.web3j.abi.datatypes.generated.Uint256(_applicationNo),
                        new org.web3j.abi.datatypes.generated.Uint256(_seed)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> register(BigInteger _maxWinnerCount,
                                                           BigInteger _probabilityNume, BigInteger _probabilityDeno, BigInteger _price) {
        final Function function = new Function(
                FUNC_REGISTER,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_maxWinnerCount),
                        new org.web3j.abi.datatypes.generated.Uint256(_probabilityNume),
                        new org.web3j.abi.datatypes.generated.Uint256(_probabilityDeno),
                        new org.web3j.abi.datatypes.generated.Uint256(_price)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Boolean> verifyWinner(String _player, BigInteger _applicationNo) {
        final Function function = new Function(FUNC_VERIFYWINNER,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _player),
                        new org.web3j.abi.datatypes.generated.Uint256(_applicationNo)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    @Deprecated
    public static ApplicationContract load(String contractAddress, Web3j web3j,
                                           Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new ApplicationContract(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static ApplicationContract load(String contractAddress, Web3j web3j,
                                           TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new ApplicationContract(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static ApplicationContract load(String contractAddress, Web3j web3j,
                                           Credentials credentials, ContractGasProvider contractGasProvider) {
        return new ApplicationContract(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static ApplicationContract load(String contractAddress, Web3j web3j,
                                           TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new ApplicationContract(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<ApplicationContract> deploy(Web3j web3j, Credentials credentials,
                                                         ContractGasProvider contractGasProvider, String _tokenContract) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContract)));
        return deployRemoteCall(ApplicationContract.class, web3j, credentials, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    public static RemoteCall<ApplicationContract> deploy(Web3j web3j,
                                                         TransactionManager transactionManager, ContractGasProvider contractGasProvider,
                                                         String _tokenContract) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContract)));
        return deployRemoteCall(ApplicationContract.class, web3j, transactionManager, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<ApplicationContract> deploy(Web3j web3j, Credentials credentials,
                                                         BigInteger gasPrice, BigInteger gasLimit, String _tokenContract) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContract)));
        return deployRemoteCall(ApplicationContract.class, web3j, credentials, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<ApplicationContract> deploy(Web3j web3j,
                                                         TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit,
                                                         String _tokenContract) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContract)));
        return deployRemoteCall(ApplicationContract.class, web3j, transactionManager, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
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

    public static class ApplicationRegisterResultEventResponse extends BaseEventResponse {
        public BigInteger applicationNo;

        public BigInteger maxWinnerCount;

        public BigInteger probabilityNume;

        public BigInteger probabilityDeno;

        public BigInteger price;
    }

    public static class EnterResultEventResponse extends BaseEventResponse {
        public String player;

        public BigInteger nonce;

        public BigInteger target;

        public Boolean isSuccess;

        public BigInteger remainingWinnerCount;
    }
}