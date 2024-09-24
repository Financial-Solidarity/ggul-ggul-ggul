package com.ggul.application.equipment.infra;

import io.reactivex.Flowable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
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
import org.web3j.tuples.generated.Tuple2;
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
public class EquipmentDrawContract extends Contract {
    public static final String BINARY = "0x608060405234801561001057600080fd5b506040516108e63803806108e68339818101604052810190610032919061011c565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610149565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100e9826100be565b9050919050565b6100f9816100de565b811461010457600080fd5b50565b600081519050610116816100f0565b92915050565b600060208284031215610132576101316100b9565b5b600061014084828501610107565b91505092915050565b61078e806101586000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063080bd79e146100465780638222068f14610077578063f07ab7be14610095575b600080fd5b610060600480360381019061005b91906104c0565b6100b1565b60405161006e929190610506565b60405180910390f35b61007f61013d565b60405161008c919061052f565b60405180910390f35b6100af60048036038101906100aa9190610576565b610142565b005b600080600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205491509150915091565b600a81565b3373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461019c57600080fd5b600a60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231856040518263ffffffff1660e01b81526004016101f791906105d8565b602060405180830381865afa158015610214573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102389190610608565b101561024357600080fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663519888e484600a6040518363ffffffff1660e01b815260040161029f929190610635565b600060405180830381600087803b1580156102b957600080fd5b505af11580156102cd573d6000803e3d6000fd5b5050505060006102dd84846103cc565b905080600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600061032f85846103f9565b905080600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508473ffffffffffffffffffffffffffffffffffffffff167f29f50c65143e11a6a29ec2e075c10655df23a0b4ac03c32d8ac983d7d5c89b6f83836040516103bd929190610506565b60405180910390a25050505050565b600060016103e76103dd8585610425565b6103e7919061068d565b6103f191906106ed565b905092915050565b6000600160146104098585610425565b610413919061068d565b61041d91906106ed565b905092915050565b600082428360405160200161043c93929190610721565b6040516020818303038152906040528051906020012060001c905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061048d82610462565b9050919050565b61049d81610482565b81146104a857600080fd5b50565b6000813590506104ba81610494565b92915050565b6000602082840312156104d6576104d561045d565b5b60006104e4848285016104ab565b91505092915050565b6000819050919050565b610500816104ed565b82525050565b600060408201905061051b60008301856104f7565b61052860208301846104f7565b9392505050565b600060208201905061054460008301846104f7565b92915050565b610553816104ed565b811461055e57600080fd5b50565b6000813590506105708161054a565b92915050565b60008060006060848603121561058f5761058e61045d565b5b600061059d868287016104ab565b93505060206105ae86828701610561565b92505060406105bf86828701610561565b9150509250925092565b6105d281610482565b82525050565b60006020820190506105ed60008301846105c9565b92915050565b6000815190506106028161054a565b92915050565b60006020828403121561061e5761061d61045d565b5b600061062c848285016105f3565b91505092915050565b600060408201905061064a60008301856105c9565b61065760208301846104f7565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610698826104ed565b91506106a3836104ed565b9250826106b3576106b261065e565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006106f8826104ed565b9150610703836104ed565b925082820190508082111561071b5761071a6106be565b5b92915050565b600060608201905061073660008301866105c9565b61074360208301856104f7565b61075060408301846104f7565b94935050505056fea2646970667358221220aec1824352fce06e71af9ab0948620583f00594632270c393c7dc885e1c28fd464736f6c63430008180033";

    private static String librariesLinkedBinary;

    public static final String FUNC_DRAW_COST = "DRAW_COST";

    public static final String FUNC_DRAW = "draw";

    public static final String FUNC_GETDRAWNEQUIPMENT = "getDrawnEquipment";

    public static final Event DRAWRESULT_EVENT = new Event("DrawResult", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}));
    ;

    @Deprecated
    protected EquipmentDrawContract(String contractAddress, Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected EquipmentDrawContract(String contractAddress, Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected EquipmentDrawContract(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected EquipmentDrawContract(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<DrawResultEventResponse> getDrawResultEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(DRAWRESULT_EVENT, transactionReceipt);
        ArrayList<DrawResultEventResponse> responses = new ArrayList<DrawResultEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            DrawResultEventResponse typedResponse = new DrawResultEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.player = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.power = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.item = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static DrawResultEventResponse getDrawResultEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(DRAWRESULT_EVENT, log);
        DrawResultEventResponse typedResponse = new DrawResultEventResponse();
        typedResponse.log = log;
        typedResponse.player = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.power = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.item = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
        return typedResponse;
    }

    public Flowable<DrawResultEventResponse> drawResultEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getDrawResultEventFromLog(log));
    }

    public Flowable<DrawResultEventResponse> drawResultEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(DRAWRESULT_EVENT));
        return drawResultEventFlowable(filter);
    }

    public RemoteFunctionCall<BigInteger> DRAW_COST() {
        final Function function = new Function(FUNC_DRAW_COST, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> draw(String _player, BigInteger _powerSeed,
            BigInteger _itemSeed) {
        final Function function = new Function(
                FUNC_DRAW, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _player), 
                new org.web3j.abi.datatypes.generated.Uint256(_powerSeed), 
                new org.web3j.abi.datatypes.generated.Uint256(_itemSeed)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Tuple2<BigInteger, BigInteger>> getDrawnEquipment(String _player) {
        final Function function = new Function(FUNC_GETDRAWNEQUIPMENT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _player)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple2<BigInteger, BigInteger>>(function,
                new Callable<Tuple2<BigInteger, BigInteger>>() {
                    @Override
                    public Tuple2<BigInteger, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple2<BigInteger, BigInteger>(
                                (BigInteger) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue());
                    }
                });
    }

    @Deprecated
    public static EquipmentDrawContract load(String contractAddress, Web3j web3j,
            Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new EquipmentDrawContract(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static EquipmentDrawContract load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new EquipmentDrawContract(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static EquipmentDrawContract load(String contractAddress, Web3j web3j,
            Credentials credentials, ContractGasProvider contractGasProvider) {
        return new EquipmentDrawContract(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static EquipmentDrawContract load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new EquipmentDrawContract(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<EquipmentDrawContract> deploy(Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider, String _tokenContractAddress) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContractAddress)));
        return deployRemoteCall(EquipmentDrawContract.class, web3j, credentials, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    public static RemoteCall<EquipmentDrawContract> deploy(Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider,
            String _tokenContractAddress) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContractAddress)));
        return deployRemoteCall(EquipmentDrawContract.class, web3j, transactionManager, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<EquipmentDrawContract> deploy(Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit, String _tokenContractAddress) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContractAddress)));
        return deployRemoteCall(EquipmentDrawContract.class, web3j, credentials, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<EquipmentDrawContract> deploy(Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit,
            String _tokenContractAddress) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContractAddress)));
        return deployRemoteCall(EquipmentDrawContract.class, web3j, transactionManager, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
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

    public static class DrawResultEventResponse extends BaseEventResponse {
        public String player;

        public BigInteger power;

        public BigInteger item;
    }
}
