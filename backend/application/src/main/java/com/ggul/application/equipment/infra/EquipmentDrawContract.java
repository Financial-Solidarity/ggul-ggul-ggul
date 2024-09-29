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
    public static final String BINARY = "0x60a060405234801561001057600080fd5b506040516109b13803806109b18339818101604052810190610032919061015b565b81600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060808181525050505061019b565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100f2826100c7565b9050919050565b610102816100e7565b811461010d57600080fd5b50565b60008151905061011f816100f9565b92915050565b6000819050919050565b61013881610125565b811461014357600080fd5b50565b6000815190506101558161012f565b92915050565b60008060408385031215610172576101716100c2565b5b600061018085828601610110565b925050602061019185828601610146565b9150509250929050565b6080516107ed6101c46000396000818161013f015281816101bb01526102c201526107ed6000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063080bd79e14610046578063bf8fbbd214610077578063f07ab7be14610095575b600080fd5b610060600480360381019061005b919061051f565b6100b1565b60405161006e929190610565565b60405180910390f35b61007f61013d565b60405161008c919061058e565b60405180910390f35b6100af60048036038101906100aa91906105d5565b610161565b005b600080600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205491509150915091565b7f000000000000000000000000000000000000000000000000000000000000000081565b3373ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146101b957600080fd5b7f0000000000000000000000000000000000000000000000000000000000000000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231856040518263ffffffff1660e01b81526004016102359190610637565b602060405180830381865afa158015610252573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102769190610667565b101561028157600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663519888e4847f00000000000000000000000000000000000000000000000000000000000000006040518363ffffffff1660e01b81526004016102fe929190610694565b600060405180830381600087803b15801561031857600080fd5b505af115801561032c573d6000803e3d6000fd5b50505050600061033c848461042b565b905080600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600061038e8584610458565b905080600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508473ffffffffffffffffffffffffffffffffffffffff167f29f50c65143e11a6a29ec2e075c10655df23a0b4ac03c32d8ac983d7d5c89b6f838360405161041c929190610565565b60405180910390a25050505050565b600060016103e761043c8585610484565b61044691906106ec565b610450919061074c565b905092915050565b6000600160146104688585610484565b61047291906106ec565b61047c919061074c565b905092915050565b600082428360405160200161049b93929190610780565b6040516020818303038152906040528051906020012060001c905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006104ec826104c1565b9050919050565b6104fc816104e1565b811461050757600080fd5b50565b600081359050610519816104f3565b92915050565b600060208284031215610535576105346104bc565b5b60006105438482850161050a565b91505092915050565b6000819050919050565b61055f8161054c565b82525050565b600060408201905061057a6000830185610556565b6105876020830184610556565b9392505050565b60006020820190506105a36000830184610556565b92915050565b6105b28161054c565b81146105bd57600080fd5b50565b6000813590506105cf816105a9565b92915050565b6000806000606084860312156105ee576105ed6104bc565b5b60006105fc8682870161050a565b935050602061060d868287016105c0565b925050604061061e868287016105c0565b9150509250925092565b610631816104e1565b82525050565b600060208201905061064c6000830184610628565b92915050565b600081519050610661816105a9565b92915050565b60006020828403121561067d5761067c6104bc565b5b600061068b84828501610652565b91505092915050565b60006040820190506106a96000830185610628565b6106b66020830184610556565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006106f78261054c565b91506107028361054c565b925082610712576107116106bd565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006107578261054c565b91506107628361054c565b925082820190508082111561077a5761077961071d565b5b92915050565b60006060820190506107956000830186610628565b6107a26020830185610556565b6107af6040830184610556565b94935050505056fea26469706673582212207f738871fc540ad5bac8ded29cbbc36da5d9164dea39caedfc8b9eb3d072e4f764736f6c63430008180033";

    private static String librariesLinkedBinary;

    public static final String FUNC_COST = "COST";

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

    public RemoteFunctionCall<BigInteger> COST() {
        final Function function = new Function(FUNC_COST,
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
                                                           ContractGasProvider contractGasProvider, String _tokenContract, BigInteger _cost) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContract),
                new org.web3j.abi.datatypes.generated.Uint256(_cost)));
        return deployRemoteCall(EquipmentDrawContract.class, web3j, credentials, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    public static RemoteCall<EquipmentDrawContract> deploy(Web3j web3j,
                                                           TransactionManager transactionManager, ContractGasProvider contractGasProvider,
                                                           String _tokenContract, BigInteger _cost) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContract),
                new org.web3j.abi.datatypes.generated.Uint256(_cost)));
        return deployRemoteCall(EquipmentDrawContract.class, web3j, transactionManager, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<EquipmentDrawContract> deploy(Web3j web3j, Credentials credentials,
                                                           BigInteger gasPrice, BigInteger gasLimit, String _tokenContract, BigInteger _cost) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContract),
                new org.web3j.abi.datatypes.generated.Uint256(_cost)));
        return deployRemoteCall(EquipmentDrawContract.class, web3j, credentials, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<EquipmentDrawContract> deploy(Web3j web3j,
                                                           TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit,
                                                           String _tokenContract, BigInteger _cost) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContract),
                new org.web3j.abi.datatypes.generated.Uint256(_cost)));
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
