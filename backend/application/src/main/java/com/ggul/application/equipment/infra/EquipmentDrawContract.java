package com.ggul.application.equipment.infra;

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
public class EquipmentDrawContract extends Contract {
    public static final String BINARY = "0x60a060405234801561001057600080fd5b506040516108323803806108328339818101604052810190610032919061015b565b81600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060808181525050505061019b565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100f2826100c7565b9050919050565b610102816100e7565b811461010d57600080fd5b50565b60008151905061011f816100f9565b92915050565b6000819050919050565b61013881610125565b811461014357600080fd5b50565b6000815190506101558161012f565b92915050565b60008060408385031215610172576101716100c2565b5b600061018085828601610110565b925050602061019185828601610146565b9150509250929050565b6080516106706101c26000396000818160770152818160f301526101fa01526106706000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063bf8fbbd21461003b578063f07ab7be14610059575b600080fd5b610043610075565b6040516100509190610385565b60405180910390f35b610073600480360381019061006e919061042f565b610099565b005b7f000000000000000000000000000000000000000000000000000000000000000081565b3373ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146100f157600080fd5b7f0000000000000000000000000000000000000000000000000000000000000000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231856040518263ffffffff1660e01b815260040161016d9190610491565b602060405180830381865afa15801561018a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101ae91906104c1565b10156101b957600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663519888e4847f00000000000000000000000000000000000000000000000000000000000000006040518363ffffffff1660e01b81526004016102369291906104ee565b600060405180830381600087803b15801561025057600080fd5b505af1158015610264573d6000803e3d6000fd5b50505050600061027484846102db565b905060006102828584610308565b90508473ffffffffffffffffffffffffffffffffffffffff167f29f50c65143e11a6a29ec2e075c10655df23a0b4ac03c32d8ac983d7d5c89b6f83836040516102cc929190610517565b60405180910390a25050505050565b600060016103e76102ec8585610334565b6102f6919061056f565b61030091906105cf565b905092915050565b6000600160146103188585610334565b610322919061056f565b61032c91906105cf565b905092915050565b600082428360405160200161034b93929190610603565b6040516020818303038152906040528051906020012060001c905092915050565b6000819050919050565b61037f8161036c565b82525050565b600060208201905061039a6000830184610376565b92915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006103d0826103a5565b9050919050565b6103e0816103c5565b81146103eb57600080fd5b50565b6000813590506103fd816103d7565b92915050565b61040c8161036c565b811461041757600080fd5b50565b60008135905061042981610403565b92915050565b600080600060608486031215610448576104476103a0565b5b6000610456868287016103ee565b93505060206104678682870161041a565b92505060406104788682870161041a565b9150509250925092565b61048b816103c5565b82525050565b60006020820190506104a66000830184610482565b92915050565b6000815190506104bb81610403565b92915050565b6000602082840312156104d7576104d66103a0565b5b60006104e5848285016104ac565b91505092915050565b60006040820190506105036000830185610482565b6105106020830184610376565b9392505050565b600060408201905061052c6000830185610376565b6105396020830184610376565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061057a8261036c565b91506105858361036c565b92508261059557610594610540565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006105da8261036c565b91506105e58361036c565b92508282019050808211156105fd576105fc6105a0565b5b92915050565b60006060820190506106186000830186610482565b6106256020830185610376565b6106326040830184610376565b94935050505056fea26469706673582212208e6ae1ccc604c7ba62dc09718b3871e1ec79d0db6569618cce2c49f2ab3e5d1364736f6c63430008180033";

    private static String librariesLinkedBinary;

    public static final String FUNC_COST = "COST";

    public static final String FUNC_DRAW = "draw";

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
