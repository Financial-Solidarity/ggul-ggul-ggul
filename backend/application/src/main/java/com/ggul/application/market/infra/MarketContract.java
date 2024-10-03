package com.ggul.application.market.infra;

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
public class MarketContract extends Contract {
    public static final String BINARY = "0x60806040523480156200001157600080fd5b50604051620016ce380380620016ce83398181016040528101906200003791906200016b565b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050620001b2565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001338262000106565b9050919050565b620001458162000126565b81146200015157600080fd5b50565b60008151905062000165816200013a565b92915050565b6000806040838503121562000185576200018462000101565b5b6000620001958582860162000154565b9250506020620001a88582860162000154565b9150509250929050565b61150c80620001c26000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80636d97786e1461004657806398590ef914610062578063cce7ec131461007e575b600080fd5b610060600480360381019061005b9190610c8a565b61009a565b005b61007c60048036038101906100779190610cf9565b61040e565b005b61009860048036038101906100939190610cf9565b610615565b005b3373ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146100f457600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663920ffa26826040518263ffffffff1660e01b815260040161014f9190610db8565b602060405180830381865afa15801561016c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101909190610def565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146101c757600080fd5b6004816040516101d79190610e58565b908152602001604051809103902060009054906101000a900460ff16156101fd57600080fd5b60036040518060a001604052808573ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018381526020016000600281111561026357610262610e6f565b5b815250908060018154018082558091505060019003906000526020600020906005020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301908161033c91906110aa565b5060808201518160040160006101000a81548160ff0219169083600281111561036857610367610e6f565b5b0217905550505060016004826040516103819190610e58565b908152602001604051809103902060006101000a81548160ff0219169083151502179055508273ffffffffffffffffffffffffffffffffffffffff167fcaa0712af0470d551d5fac06e9c1a1dcd0bde1fc03ab04c7fc1e549c480dd0dd60016003805490506103f091906111ab565b8484604051610401939291906111ee565b60405180910390a2505050565b3373ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461046857600080fd5b60006003828154811061047e5761047d61122c565b5b906000526020600020906005020190508273ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146104ea57600080fd5b600060028111156104fe576104fd610e6f565b5b8160040160009054906101000a900460ff16600281111561052257610521610e6f565b5b1461052c57600080fd5b60028160040160006101000a81548160ff0219169083600281111561055457610553610e6f565b5b0217905550600060048260030160405161056e91906112de565b908152602001604051809103902060006101000a81548160ff0219169083151502179055508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f05ba6fbac93ce3d44130280fa09111a095fb8f8931d8083325a9b7735ca0d3bd8383600201548460030160405161060893929190611379565b60405180910390a2505050565b3373ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461066f57600080fd5b6000600382815481106106855761068461122c565b5b90600052602060002090600502019050600060028111156106a9576106a8610e6f565b5b8160040160009054906101000a900460ff1660028111156106cd576106cc610e6f565b5b146106d757600080fd5b8273ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff160361073357600080fd5b806002015460008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231856040518263ffffffff1660e01b815260040161079191906113c6565b602060405180830381865afa1580156107ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d291906113f6565b10156107dd57600080fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f5537ede848360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1684600201546040518463ffffffff1660e01b815260040161086293929190611423565b600060405180830381600087803b15801561087c57600080fd5b505af1158015610890573d6000803e3d6000fd5b50505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663397bfa928260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1685846003016040518463ffffffff1660e01b815260040161091a9392919061145a565b600060405180830381600087803b15801561093457600080fd5b505af1158015610948573d6000803e3d6000fd5b50505050828160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018160040160006101000a81548160ff021916908360028111156109b7576109b6610e6f565b5b021790555060006004826003016040516109d191906112de565b908152602001604051809103902060006101000a81548160ff0219169083151502179055508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fdac729480422c48bd2cf6545647c2484edfb8f8abbbc754807d1a40d836d5f7b8260010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836002015484600301604051610a8f93929190611498565b60405180910390a2505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610adb82610ab0565b9050919050565b610aeb81610ad0565b8114610af657600080fd5b50565b600081359050610b0881610ae2565b92915050565b6000819050919050565b610b2181610b0e565b8114610b2c57600080fd5b50565b600081359050610b3e81610b18565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610b9782610b4e565b810181811067ffffffffffffffff82111715610bb657610bb5610b5f565b5b80604052505050565b6000610bc9610a9c565b9050610bd58282610b8e565b919050565b600067ffffffffffffffff821115610bf557610bf4610b5f565b5b610bfe82610b4e565b9050602081019050919050565b82818337600083830152505050565b6000610c2d610c2884610bda565b610bbf565b905082815260208101848484011115610c4957610c48610b49565b5b610c54848285610c0b565b509392505050565b600082601f830112610c7157610c70610b44565b5b8135610c81848260208601610c1a565b91505092915050565b600080600060608486031215610ca357610ca2610aa6565b5b6000610cb186828701610af9565b9350506020610cc286828701610b2f565b925050604084013567ffffffffffffffff811115610ce357610ce2610aab565b5b610cef86828701610c5c565b9150509250925092565b60008060408385031215610d1057610d0f610aa6565b5b6000610d1e85828601610af9565b9250506020610d2f85828601610b2f565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610d73578082015181840152602081019050610d58565b60008484015250505050565b6000610d8a82610d39565b610d948185610d44565b9350610da4818560208601610d55565b610dad81610b4e565b840191505092915050565b60006020820190508181036000830152610dd28184610d7f565b905092915050565b600081519050610de981610ae2565b92915050565b600060208284031215610e0557610e04610aa6565b5b6000610e1384828501610dda565b91505092915050565b600081905092915050565b6000610e3282610d39565b610e3c8185610e1c565b9350610e4c818560208601610d55565b80840191505092915050565b6000610e648284610e27565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610ee557607f821691505b602082108103610ef857610ef7610e9e565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302610f607fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610f23565b610f6a8683610f23565b95508019841693508086168417925050509392505050565b6000819050919050565b6000610fa7610fa2610f9d84610b0e565b610f82565b610b0e565b9050919050565b6000819050919050565b610fc183610f8c565b610fd5610fcd82610fae565b848454610f30565b825550505050565b600090565b610fea610fdd565b610ff5818484610fb8565b505050565b5b818110156110195761100e600082610fe2565b600181019050610ffb565b5050565b601f82111561105e5761102f81610efe565b61103884610f13565b81016020851015611047578190505b61105b61105385610f13565b830182610ffa565b50505b505050565b600082821c905092915050565b600061108160001984600802611063565b1980831691505092915050565b600061109a8383611070565b9150826002028217905092915050565b6110b382610d39565b67ffffffffffffffff8111156110cc576110cb610b5f565b5b6110d68254610ecd565b6110e182828561101d565b600060209050601f8311600181146111145760008415611102578287015190505b61110c858261108e565b865550611174565b601f19841661112286610efe565b60005b8281101561114a57848901518255600182019150602085019450602081019050611125565b868310156111675784890151611163601f891682611070565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006111b682610b0e565b91506111c183610b0e565b92508282039050818111156111d9576111d861117c565b5b92915050565b6111e881610b0e565b82525050565b600060608201905061120360008301866111df565b61121060208301856111df565b81810360408301526112228184610d7f565b9050949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000815461126881610ecd565b6112728186610e1c565b9450600182166000811461128d57600181146112a2576112d5565b60ff19831686528115158202860193506112d5565b6112ab85610efe565b60005b838110156112cd578154818901526001820191506020810190506112ae565b838801955050505b50505092915050565b60006112ea828461125b565b915081905092915050565b6000815461130281610ecd565b61130c8186610d44565b94506001821660008114611327576001811461133d57611370565b60ff198316865281151560200286019350611370565b61134685610efe565b60005b8381101561136857815481890152600182019150602081019050611349565b808801955050505b50505092915050565b600060608201905061138e60008301866111df565b61139b60208301856111df565b81810360408301526113ad81846112f5565b9050949350505050565b6113c081610ad0565b82525050565b60006020820190506113db60008301846113b7565b92915050565b6000815190506113f081610b18565b92915050565b60006020828403121561140c5761140b610aa6565b5b600061141a848285016113e1565b91505092915050565b600060608201905061143860008301866113b7565b61144560208301856113b7565b61145260408301846111df565b949350505050565b600060608201905061146f60008301866113b7565b61147c60208301856113b7565b818103604083015261148e81846112f5565b9050949350505050565b60006060820190506114ad60008301866113b7565b6114ba60208301856111df565b81810360408301526114cc81846112f5565b905094935050505056fea2646970667358221220236c39620649f87a97689abdb6a421bf5290edf06c44031a46ee83f5f690f17f64736f6c63430008180033";

    private static String librariesLinkedBinary;

    public static final String FUNC_BUY = "buy";

    public static final String FUNC_CANCEL = "cancel";

    public static final String FUNC_SELL = "sell";

    public static final Event MARKETBUYRESULT_EVENT = new Event("MarketBuyResult",
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Utf8String>() {}));
    ;

    public static final Event MARKETCANCELRESULT_EVENT = new Event("MarketCancelResult",
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Utf8String>() {}));
    ;

    public static final Event MARKETREGISTERSELLRESULT_EVENT = new Event("MarketRegisterSellResult",
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Utf8String>() {}));
    ;

    @Deprecated
    protected MarketContract(String contractAddress, Web3j web3j, Credentials credentials,
                             BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected MarketContract(String contractAddress, Web3j web3j, Credentials credentials,
                             ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected MarketContract(String contractAddress, Web3j web3j,
                             TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected MarketContract(String contractAddress, Web3j web3j,
                             TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<MarketBuyResultEventResponse> getMarketBuyResultEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(MARKETBUYRESULT_EVENT, transactionReceipt);
        ArrayList<MarketBuyResultEventResponse> responses = new ArrayList<MarketBuyResultEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            MarketBuyResultEventResponse typedResponse = new MarketBuyResultEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.seller = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.buyer = (String) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.price = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
            typedResponse.ipfsCID = (String) eventValues.getNonIndexedValues().get(2).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static MarketBuyResultEventResponse getMarketBuyResultEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(MARKETBUYRESULT_EVENT, log);
        MarketBuyResultEventResponse typedResponse = new MarketBuyResultEventResponse();
        typedResponse.log = log;
        typedResponse.seller = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.buyer = (String) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.price = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
        typedResponse.ipfsCID = (String) eventValues.getNonIndexedValues().get(2).getValue();
        return typedResponse;
    }

    public Flowable<MarketBuyResultEventResponse> marketBuyResultEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getMarketBuyResultEventFromLog(log));
    }

    public Flowable<MarketBuyResultEventResponse> marketBuyResultEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(MARKETBUYRESULT_EVENT));
        return marketBuyResultEventFlowable(filter);
    }

    public static List<MarketCancelResultEventResponse> getMarketCancelResultEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(MARKETCANCELRESULT_EVENT, transactionReceipt);
        ArrayList<MarketCancelResultEventResponse> responses = new ArrayList<MarketCancelResultEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            MarketCancelResultEventResponse typedResponse = new MarketCancelResultEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.seller = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.dealNo = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.price = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
            typedResponse.ipfsCID = (String) eventValues.getNonIndexedValues().get(2).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static MarketCancelResultEventResponse getMarketCancelResultEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(MARKETCANCELRESULT_EVENT, log);
        MarketCancelResultEventResponse typedResponse = new MarketCancelResultEventResponse();
        typedResponse.log = log;
        typedResponse.seller = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.dealNo = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.price = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
        typedResponse.ipfsCID = (String) eventValues.getNonIndexedValues().get(2).getValue();
        return typedResponse;
    }

    public Flowable<MarketCancelResultEventResponse> marketCancelResultEventFlowable(
            EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getMarketCancelResultEventFromLog(log));
    }

    public Flowable<MarketCancelResultEventResponse> marketCancelResultEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(MARKETCANCELRESULT_EVENT));
        return marketCancelResultEventFlowable(filter);
    }

    public static List<MarketRegisterSellResultEventResponse> getMarketRegisterSellResultEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(MARKETREGISTERSELLRESULT_EVENT, transactionReceipt);
        ArrayList<MarketRegisterSellResultEventResponse> responses = new ArrayList<MarketRegisterSellResultEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            MarketRegisterSellResultEventResponse typedResponse = new MarketRegisterSellResultEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.seller = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.dealNo = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.price = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
            typedResponse.ipfsCID = (String) eventValues.getNonIndexedValues().get(2).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static MarketRegisterSellResultEventResponse getMarketRegisterSellResultEventFromLog(
            Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(MARKETREGISTERSELLRESULT_EVENT, log);
        MarketRegisterSellResultEventResponse typedResponse = new MarketRegisterSellResultEventResponse();
        typedResponse.log = log;
        typedResponse.seller = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.dealNo = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.price = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
        typedResponse.ipfsCID = (String) eventValues.getNonIndexedValues().get(2).getValue();
        return typedResponse;
    }

    public Flowable<MarketRegisterSellResultEventResponse> marketRegisterSellResultEventFlowable(
            EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getMarketRegisterSellResultEventFromLog(log));
    }

    public Flowable<MarketRegisterSellResultEventResponse> marketRegisterSellResultEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(MARKETREGISTERSELLRESULT_EVENT));
        return marketRegisterSellResultEventFlowable(filter);
    }

    public RemoteFunctionCall<TransactionReceipt> buy(String _buyer, BigInteger dealNo) {
        final Function function = new Function(
                FUNC_BUY,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _buyer),
                        new org.web3j.abi.datatypes.generated.Uint256(dealNo)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> cancel(String _seller, BigInteger dealNo) {
        final Function function = new Function(
                FUNC_CANCEL,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _seller),
                        new org.web3j.abi.datatypes.generated.Uint256(dealNo)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> sell(String _seller, BigInteger _price,
                                                       String _ipfsCID) {
        final Function function = new Function(
                FUNC_SELL,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _seller),
                        new org.web3j.abi.datatypes.generated.Uint256(_price),
                        new org.web3j.abi.datatypes.Utf8String(_ipfsCID)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static MarketContract load(String contractAddress, Web3j web3j, Credentials credentials,
                                      BigInteger gasPrice, BigInteger gasLimit) {
        return new MarketContract(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static MarketContract load(String contractAddress, Web3j web3j,
                                      TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new MarketContract(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static MarketContract load(String contractAddress, Web3j web3j, Credentials credentials,
                                      ContractGasProvider contractGasProvider) {
        return new MarketContract(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static MarketContract load(String contractAddress, Web3j web3j,
                                      TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new MarketContract(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<MarketContract> deploy(Web3j web3j, Credentials credentials,
                                                    ContractGasProvider contractGasProvider, String _tokenContract,
                                                    String _equipmentNFTContract) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContract),
                new org.web3j.abi.datatypes.Address(160, _equipmentNFTContract)));
        return deployRemoteCall(MarketContract.class, web3j, credentials, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    public static RemoteCall<MarketContract> deploy(Web3j web3j,
                                                    TransactionManager transactionManager, ContractGasProvider contractGasProvider,
                                                    String _tokenContract, String _equipmentNFTContract) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContract),
                new org.web3j.abi.datatypes.Address(160, _equipmentNFTContract)));
        return deployRemoteCall(MarketContract.class, web3j, transactionManager, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<MarketContract> deploy(Web3j web3j, Credentials credentials,
                                                    BigInteger gasPrice, BigInteger gasLimit, String _tokenContract,
                                                    String _equipmentNFTContract) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContract),
                new org.web3j.abi.datatypes.Address(160, _equipmentNFTContract)));
        return deployRemoteCall(MarketContract.class, web3j, credentials, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<MarketContract> deploy(Web3j web3j,
                                                    TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit,
                                                    String _tokenContract, String _equipmentNFTContract) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenContract),
                new org.web3j.abi.datatypes.Address(160, _equipmentNFTContract)));
        return deployRemoteCall(MarketContract.class, web3j, transactionManager, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
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

    public static class MarketBuyResultEventResponse extends BaseEventResponse {
        public String seller;

        public String buyer;

        public BigInteger price;

        public String ipfsCID;
    }

    public static class MarketCancelResultEventResponse extends BaseEventResponse {
        public String seller;

        public BigInteger dealNo;

        public BigInteger price;

        public String ipfsCID;
    }

    public static class MarketRegisterSellResultEventResponse extends BaseEventResponse {
        public String seller;

        public BigInteger dealNo;

        public BigInteger price;

        public String ipfsCID;
    }
}