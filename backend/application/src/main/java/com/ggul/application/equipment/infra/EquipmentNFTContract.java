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
import org.web3j.abi.datatypes.Bool;
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
public class EquipmentNFTContract extends Contract {
    public static final String BINARY = "0x60806040523480156200001157600080fd5b5060405162002dae38038062002dae8339818101604052810190620000379190620002b6565b6040518060400160405280600981526020017f45717569706d656e7400000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f4e465400000000000000000000000000000000000000000000000000000000008152508160009081620000b4919062000552565b508060019081620000c6919062000552565b50505033600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600790816200011b919062000552565b505062000639565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200018c8262000141565b810181811067ffffffffffffffff82111715620001ae57620001ad62000152565b5b80604052505050565b6000620001c362000123565b9050620001d1828262000181565b919050565b600067ffffffffffffffff821115620001f457620001f362000152565b5b620001ff8262000141565b9050602081019050919050565b60005b838110156200022c5780820151818401526020810190506200020f565b60008484015250505050565b60006200024f6200024984620001d6565b620001b7565b9050828152602081018484840111156200026e576200026d6200013c565b5b6200027b8482856200020c565b509392505050565b600082601f8301126200029b576200029a62000137565b5b8151620002ad84826020860162000238565b91505092915050565b600060208284031215620002cf57620002ce6200012d565b5b600082015167ffffffffffffffff811115620002f057620002ef62000132565b5b620002fe8482850162000283565b91505092915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200035a57607f821691505b60208210810362000370576200036f62000312565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620003da7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200039b565b620003e686836200039b565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620004336200042d6200042784620003fe565b62000408565b620003fe565b9050919050565b6000819050919050565b6200044f8362000412565b620004676200045e826200043a565b848454620003a8565b825550505050565b600090565b6200047e6200046f565b6200048b81848462000444565b505050565b5b81811015620004b357620004a760008262000474565b60018101905062000491565b5050565b601f8211156200050257620004cc8162000376565b620004d7846200038b565b81016020851015620004e7578190505b620004ff620004f6856200038b565b83018262000490565b50505b505050565b600082821c905092915050565b6000620005276000198460080262000507565b1980831691505092915050565b600062000542838362000514565b9150826002028217905092915050565b6200055d8262000307565b67ffffffffffffffff81111562000579576200057862000152565b5b62000585825462000341565b62000592828285620004b7565b600060209050601f831160018114620005ca5760008415620005b5578287015190505b620005c1858262000534565b86555062000631565b601f198416620005da8662000376565b60005b828110156200060457848901518255600182019150602085019450602081019050620005dd565b8683101562000624578489015162000620601f89168262000514565b8355505b6001600288020188555050505b505050505050565b61276580620006496000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c80636352211e116100a2578063a22cb46511610071578063a22cb46514610303578063b88d4fde1461031f578063c87b56dd1461033b578063d0def5211461036b578063e985e9c51461038757610116565b80636352211e1461025557806370a0823114610285578063920ffa26146102b557806395d89b41146102e557610116565b806317987ca5116100e957806317987ca5146101b557806323b872dd146101e5578063397bfa921461020157806342842e0e1461021d5780635d9ef52e1461023957610116565b806301ffc9a71461011b57806306fdde031461014b578063081812fc14610169578063095ea7b314610199575b600080fd5b61013560048036038101906101309190611bff565b6103b7565b6040516101429190611c47565b60405180910390f35b610153610499565b6040516101609190611cf2565b60405180910390f35b610183600480360381019061017e9190611d4a565b61052b565b6040516101909190611db8565b60405180910390f35b6101b360048036038101906101ae9190611dff565b610547565b005b6101cf60048036038101906101ca9190611f74565b61055d565b6040516101dc9190611cf2565b60405180910390f35b6101ff60048036038101906101fa9190611fbd565b6105b5565b005b61021b60048036038101906102169190612010565b6106b7565b005b61023760048036038101906102329190611fbd565b610729565b005b610253600480360381019061024e919061207f565b610749565b005b61026f600480360381019061026a9190611d4a565b610800565b60405161027c9190611db8565b60405180910390f35b61029f600480360381019061029a91906120db565b610812565b6040516102ac9190612117565b60405180910390f35b6102cf60048036038101906102ca9190611f74565b6108cc565b6040516102dc9190611db8565b60405180910390f35b6102ed6108e6565b6040516102fa9190611cf2565b60405180910390f35b61031d6004803603810190610318919061215e565b610978565b005b6103396004803603810190610334919061223f565b61098e565b005b61035560048036038101906103509190611d4a565b6109ab565b6040516103629190611cf2565b60405180910390f35b6103856004803603810190610380919061207f565b610a14565b005b6103a1600480360381019061039c91906122c2565b610adc565b6040516103ae9190611c47565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061048257507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610492575061049182610b70565b5b9050919050565b6060600080546104a890612331565b80601f01602080910402602001604051908101604052809291908181526020018280546104d490612331565b80156105215780601f106104f657610100808354040283529160200191610521565b820191906000526020600020905b81548152906001019060200180831161050457829003601f168201915b5050505050905090565b600061053682610bda565b5061054082610c62565b9050919050565b6105598282610554610c9f565b610ca7565b5050565b606060006007805461056e90612331565b90501161058a57604051806020016040528060008152506105ae565b60078260405160200161059e929190612436565b6040516020818303038152906040525b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036106275760006040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040161061e9190611db8565b60405180910390fd5b600061063b8383610636610c9f565b610cb9565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146106b1578382826040517f64283d7b0000000000000000000000000000000000000000000000000000000081526004016106a89392919061245a565b60405180910390fd5b50505050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461071157600080fd5b610724838361071f84610ed3565b610f47565b505050565b6107448383836040518060200160405280600081525061098e565b505050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107a357600080fd5b6107b46107af82610ed3565b6110b4565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16146107eb57600080fd5b6107fc6107f782610ed3565b6110f1565b5050565b600061080b82610bda565b9050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036108855760006040517f89c62b6400000000000000000000000000000000000000000000000000000000815260040161087c9190611db8565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60006108df6108da83610ed3565b6110b4565b9050919050565b6060600180546108f590612331565b80601f016020809104026020016040519081016040528092919081815260200182805461092190612331565b801561096e5780601f106109435761010080835404028352916020019161096e565b820191906000526020600020905b81548152906001019060200180831161095157829003601f168201915b5050505050905090565b61098a610983610c9f565b8383611177565b5050565b6109998484846105b5565b6109a5848484846112e6565b50505050565b60606109b682610bda565b5060006109c161149d565b905060008151116109e15760405180602001604052806000815250610a0c565b806109eb8461152f565b6040516020016109fc929190612491565b6040516020818303038152906040525b915050919050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a6e57600080fd5b610a8082610a7b83610ed3565b6115fd565b8173ffffffffffffffffffffffffffffffffffffffff167fd564dcd93802bcef98cf67d3f543fcfd6deec61e552129a8d4bdb72817d4681b82610ac28461055d565b604051610ad09291906124b5565b60405180910390a25050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600080610be6836110b4565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610c5957826040517f7e273289000000000000000000000000000000000000000000000000000000008152600401610c509190612117565b60405180910390fd5b80915050919050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600033905090565b610cb483838360016116f6565b505050565b600080610cc5846110b4565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614610d0757610d068184866118bb565b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610d9857610d496000856000806116f6565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614610e1b576001600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b846002600086815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b6000808290506000805b8251811015610f3c576030838281518110610efb57610efa6124ec565b5b602001015160f81c60f81b60f81c60ff16610f16919061254a565b600a83610f23919061257e565b610f2d91906125c0565b91508080600101915050610edd565b508092505050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610fb95760006040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401610fb09190611db8565b60405180910390fd5b6000610fc783836000610cb9565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361103a57816040517f7e2732890000000000000000000000000000000000000000000000000000000081526004016110319190612117565b60405180910390fd5b8373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146110ae578382826040517f64283d7b0000000000000000000000000000000000000000000000000000000081526004016110a59392919061245a565b60405180910390fd5b50505050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006111006000836000610cb9565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361117357816040517f7e27328900000000000000000000000000000000000000000000000000000000815260040161116a9190612117565b60405180910390fd5b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036111e857816040517f5b08ba180000000000000000000000000000000000000000000000000000000081526004016111df9190611db8565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516112d99190611c47565b60405180910390a3505050565b60008373ffffffffffffffffffffffffffffffffffffffff163b1115611497578273ffffffffffffffffffffffffffffffffffffffff1663150b7a0261132a610c9f565b8685856040518563ffffffff1660e01b815260040161134c9493929190612649565b6020604051808303816000875af192505050801561138857506040513d601f19601f8201168201806040525081019061138591906126aa565b60015b61140c573d80600081146113b8576040519150601f19603f3d011682016040523d82523d6000602084013e6113bd565b606091505b50600081510361140457836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016113fb9190611db8565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461149557836040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040161148c9190611db8565b60405180910390fd5b505b50505050565b6060600780546114ac90612331565b80601f01602080910402602001604051908101604052809291908181526020018280546114d890612331565b80156115255780601f106114fa57610100808354040283529160200191611525565b820191906000526020600020905b81548152906001019060200180831161150857829003601f168201915b5050505050905090565b60606000600161153e8461197f565b01905060008167ffffffffffffffff81111561155d5761155c611e49565b5b6040519080825280601f01601f19166020018201604052801561158f5781602001600182028036833780820191505090505b509050600082602001820190505b6001156115f2578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a85816115e6576115e56126d7565b5b0494506000850361159d575b819350505050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361166f5760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016116669190611db8565b60405180910390fd5b600061167d83836000610cb9565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146116f15760006040517f73c6ac6e0000000000000000000000000000000000000000000000000000000081526004016116e89190611db8565b60405180910390fd5b505050565b808061172f5750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b1561186357600061173f84610bda565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141580156117aa57508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b80156117bd57506117bb8184610adc565b155b156117ff57826040517fa9fbf51f0000000000000000000000000000000000000000000000000000000081526004016117f69190611db8565b60405180910390fd5b811561186157838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b836004600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b6118c6838383611ad2565b61197a57600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361193b57806040517f7e2732890000000000000000000000000000000000000000000000000000000081526004016119329190612117565b60405180910390fd5b81816040517f177e802f000000000000000000000000000000000000000000000000000000008152600401611971929190612706565b60405180910390fd5b505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083106119dd577a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083816119d3576119d26126d7565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611a1a576d04ee2d6d415b85acef81000000008381611a1057611a0f6126d7565b5b0492506020810190505b662386f26fc100008310611a4957662386f26fc100008381611a3f57611a3e6126d7565b5b0492506010810190505b6305f5e1008310611a72576305f5e1008381611a6857611a676126d7565b5b0492506008810190505b6127108310611a97576127108381611a8d57611a8c6126d7565b5b0492506004810190505b60648310611aba5760648381611ab057611aaf6126d7565b5b0492506002810190505b600a8310611ac9576001810190505b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614158015611b8a57508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480611b4b5750611b4a8484610adc565b5b80611b8957508273ffffffffffffffffffffffffffffffffffffffff16611b7183610c62565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611bdc81611ba7565b8114611be757600080fd5b50565b600081359050611bf981611bd3565b92915050565b600060208284031215611c1557611c14611b9d565b5b6000611c2384828501611bea565b91505092915050565b60008115159050919050565b611c4181611c2c565b82525050565b6000602082019050611c5c6000830184611c38565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611c9c578082015181840152602081019050611c81565b60008484015250505050565b6000601f19601f8301169050919050565b6000611cc482611c62565b611cce8185611c6d565b9350611cde818560208601611c7e565b611ce781611ca8565b840191505092915050565b60006020820190508181036000830152611d0c8184611cb9565b905092915050565b6000819050919050565b611d2781611d14565b8114611d3257600080fd5b50565b600081359050611d4481611d1e565b92915050565b600060208284031215611d6057611d5f611b9d565b5b6000611d6e84828501611d35565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611da282611d77565b9050919050565b611db281611d97565b82525050565b6000602082019050611dcd6000830184611da9565b92915050565b611ddc81611d97565b8114611de757600080fd5b50565b600081359050611df981611dd3565b92915050565b60008060408385031215611e1657611e15611b9d565b5b6000611e2485828601611dea565b9250506020611e3585828601611d35565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611e8182611ca8565b810181811067ffffffffffffffff82111715611ea057611e9f611e49565b5b80604052505050565b6000611eb3611b93565b9050611ebf8282611e78565b919050565b600067ffffffffffffffff821115611edf57611ede611e49565b5b611ee882611ca8565b9050602081019050919050565b82818337600083830152505050565b6000611f17611f1284611ec4565b611ea9565b905082815260208101848484011115611f3357611f32611e44565b5b611f3e848285611ef5565b509392505050565b600082601f830112611f5b57611f5a611e3f565b5b8135611f6b848260208601611f04565b91505092915050565b600060208284031215611f8a57611f89611b9d565b5b600082013567ffffffffffffffff811115611fa857611fa7611ba2565b5b611fb484828501611f46565b91505092915050565b600080600060608486031215611fd657611fd5611b9d565b5b6000611fe486828701611dea565b9350506020611ff586828701611dea565b925050604061200686828701611d35565b9150509250925092565b60008060006060848603121561202957612028611b9d565b5b600061203786828701611dea565b935050602061204886828701611dea565b925050604084013567ffffffffffffffff81111561206957612068611ba2565b5b61207586828701611f46565b9150509250925092565b6000806040838503121561209657612095611b9d565b5b60006120a485828601611dea565b925050602083013567ffffffffffffffff8111156120c5576120c4611ba2565b5b6120d185828601611f46565b9150509250929050565b6000602082840312156120f1576120f0611b9d565b5b60006120ff84828501611dea565b91505092915050565b61211181611d14565b82525050565b600060208201905061212c6000830184612108565b92915050565b61213b81611c2c565b811461214657600080fd5b50565b60008135905061215881612132565b92915050565b6000806040838503121561217557612174611b9d565b5b600061218385828601611dea565b925050602061219485828601612149565b9150509250929050565b600067ffffffffffffffff8211156121b9576121b8611e49565b5b6121c282611ca8565b9050602081019050919050565b60006121e26121dd8461219e565b611ea9565b9050828152602081018484840111156121fe576121fd611e44565b5b612209848285611ef5565b509392505050565b600082601f83011261222657612225611e3f565b5b81356122368482602086016121cf565b91505092915050565b6000806000806080858703121561225957612258611b9d565b5b600061226787828801611dea565b945050602061227887828801611dea565b935050604061228987828801611d35565b925050606085013567ffffffffffffffff8111156122aa576122a9611ba2565b5b6122b687828801612211565b91505092959194509250565b600080604083850312156122d9576122d8611b9d565b5b60006122e785828601611dea565b92505060206122f885828601611dea565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061234957607f821691505b60208210810361235c5761235b612302565b5b50919050565b600081905092915050565b60008190508160005260206000209050919050565b6000815461238f81612331565b6123998186612362565b945060018216600081146123b457600181146123c9576123fc565b60ff19831686528115158202860193506123fc565b6123d28561236d565b60005b838110156123f4578154818901526001820191506020810190506123d5565b838801955050505b50505092915050565b600061241082611c62565b61241a8185612362565b935061242a818560208601611c7e565b80840191505092915050565b60006124428285612382565b915061244e8284612405565b91508190509392505050565b600060608201905061246f6000830186611da9565b61247c6020830185612108565b6124896040830184611da9565b949350505050565b600061249d8285612405565b91506124a98284612405565b91508190509392505050565b600060408201905081810360008301526124cf8185611cb9565b905081810360208301526124e38184611cb9565b90509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061255582611d14565b915061256083611d14565b92508282039050818111156125785761257761251b565b5b92915050565b600061258982611d14565b915061259483611d14565b92508282026125a281611d14565b915082820484148315176125b9576125b861251b565b5b5092915050565b60006125cb82611d14565b91506125d683611d14565b92508282019050808211156125ee576125ed61251b565b5b92915050565b600081519050919050565b600082825260208201905092915050565b600061261b826125f4565b61262581856125ff565b9350612635818560208601611c7e565b61263e81611ca8565b840191505092915050565b600060808201905061265e6000830187611da9565b61266b6020830186611da9565b6126786040830185612108565b818103606083015261268a8184612610565b905095945050505050565b6000815190506126a481611bd3565b92915050565b6000602082840312156126c0576126bf611b9d565b5b60006126ce84828501612695565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600060408201905061271b6000830185611da9565b6127286020830184612108565b939250505056fea264697066735822122011c1ccf0b57be2696623b478b8a7fc10b3c78a38f11c6118bd31fcf5affa660d64736f6c63430008180033";

    private static String librariesLinkedBinary;

    public static final String FUNC_APPROVE = "approve";

    public static final String FUNC_BALANCEOF = "balanceOf";

    public static final String FUNC_BURN = "burn";

    public static final String FUNC_GETAPPROVED = "getApproved";

    public static final String FUNC_ISAPPROVEDFORALL = "isApprovedForAll";

    public static final String FUNC_MINT = "mint";

    public static final String FUNC_NAME = "name";

    public static final String FUNC_NFTURI = "nftURI";

    public static final String FUNC_ownerOf = "ownerOf";

    public static final String FUNC_safeTransferFrom = "safeTransferFrom";

    public static final String FUNC_SETAPPROVALFORALL = "setApprovalForAll";

    public static final String FUNC_SUPPORTSINTERFACE = "supportsInterface";

    public static final String FUNC_SYMBOL = "symbol";

    public static final String FUNC_TOKENURI = "tokenURI";

    public static final String FUNC_TRANSFER = "transfer";

    public static final String FUNC_TRANSFERFROM = "transferFrom";

    public static final Event APPROVAL_EVENT = new Event("Approval",
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>(true) {}));
    ;

    public static final Event APPROVALFORALL_EVENT = new Event("ApprovalForAll",
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Bool>() {}));
    ;

    public static final Event MINTRESULT_EVENT = new Event("MintResult",
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}));
    ;

    public static final Event TRANSFER_EVENT = new Event("Transfer",
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>(true) {}));
    ;

    @Deprecated
    protected EquipmentNFTContract(String contractAddress, Web3j web3j, Credentials credentials,
                                   BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected EquipmentNFTContract(String contractAddress, Web3j web3j, Credentials credentials,
                                   ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected EquipmentNFTContract(String contractAddress, Web3j web3j,
                                   TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected EquipmentNFTContract(String contractAddress, Web3j web3j,
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
            typedResponse.approved = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.tokenId = (BigInteger) eventValues.getIndexedValues().get(2).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ApprovalEventResponse getApprovalEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(APPROVAL_EVENT, log);
        ApprovalEventResponse typedResponse = new ApprovalEventResponse();
        typedResponse.log = log;
        typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.approved = (String) eventValues.getIndexedValues().get(1).getValue();
        typedResponse.tokenId = (BigInteger) eventValues.getIndexedValues().get(2).getValue();
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

    public static List<ApprovalForAllEventResponse> getApprovalForAllEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(APPROVALFORALL_EVENT, transactionReceipt);
        ArrayList<ApprovalForAllEventResponse> responses = new ArrayList<ApprovalForAllEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ApprovalForAllEventResponse typedResponse = new ApprovalForAllEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.operator = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.approved = (Boolean) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ApprovalForAllEventResponse getApprovalForAllEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(APPROVALFORALL_EVENT, log);
        ApprovalForAllEventResponse typedResponse = new ApprovalForAllEventResponse();
        typedResponse.log = log;
        typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.operator = (String) eventValues.getIndexedValues().get(1).getValue();
        typedResponse.approved = (Boolean) eventValues.getNonIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<ApprovalForAllEventResponse> approvalForAllEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getApprovalForAllEventFromLog(log));
    }

    public Flowable<ApprovalForAllEventResponse> approvalForAllEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(APPROVALFORALL_EVENT));
        return approvalForAllEventFlowable(filter);
    }

    public static List<MintResultEventResponse> getMintResultEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(MINTRESULT_EVENT, transactionReceipt);
        ArrayList<MintResultEventResponse> responses = new ArrayList<MintResultEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            MintResultEventResponse typedResponse = new MintResultEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.ipfsCID = (String) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.nftURI = (String) eventValues.getNonIndexedValues().get(1).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static MintResultEventResponse getMintResultEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(MINTRESULT_EVENT, log);
        MintResultEventResponse typedResponse = new MintResultEventResponse();
        typedResponse.log = log;
        typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.ipfsCID = (String) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.nftURI = (String) eventValues.getNonIndexedValues().get(1).getValue();
        return typedResponse;
    }

    public Flowable<MintResultEventResponse> mintResultEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getMintResultEventFromLog(log));
    }

    public Flowable<MintResultEventResponse> mintResultEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(MINTRESULT_EVENT));
        return mintResultEventFlowable(filter);
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
            typedResponse.tokenId = (BigInteger) eventValues.getIndexedValues().get(2).getValue();
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
        typedResponse.tokenId = (BigInteger) eventValues.getIndexedValues().get(2).getValue();
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

    public RemoteFunctionCall<TransactionReceipt> approve(String to, BigInteger tokenId) {
        final Function function = new Function(
                FUNC_APPROVE,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, to),
                        new org.web3j.abi.datatypes.generated.Uint256(tokenId)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> balanceOf(String owner) {
        final Function function = new Function(FUNC_BALANCEOF,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, owner)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> burn(String _owner, String _ipfsCID) {
        final Function function = new Function(
                FUNC_BURN,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _owner),
                        new org.web3j.abi.datatypes.Utf8String(_ipfsCID)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> getApproved(BigInteger tokenId) {
        final Function function = new Function(FUNC_GETAPPROVED,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(tokenId)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<Boolean> isApprovedForAll(String owner, String operator) {
        final Function function = new Function(FUNC_ISAPPROVEDFORALL,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, owner),
                        new org.web3j.abi.datatypes.Address(160, operator)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<TransactionReceipt> mint(String _owner, String _ipfsCID) {
        final Function function = new Function(
                FUNC_MINT,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _owner),
                        new org.web3j.abi.datatypes.Utf8String(_ipfsCID)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> name() {
        final Function function = new Function(FUNC_NAME,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> nftURI(String _ipfsCID) {
        final Function function = new Function(FUNC_NFTURI,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(_ipfsCID)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> ownerOf(BigInteger tokenId) {
        final Function function = new Function(FUNC_ownerOf,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(tokenId)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> ownerOf(String _ipfsCID) {
        final Function function = new Function(FUNC_ownerOf,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(_ipfsCID)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> safeTransferFrom(String from, String to,
                                                                   BigInteger tokenId) {
        final Function function = new Function(
                FUNC_safeTransferFrom,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, from),
                        new org.web3j.abi.datatypes.Address(160, to),
                        new org.web3j.abi.datatypes.generated.Uint256(tokenId)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> safeTransferFrom(String from, String to,
                                                                   BigInteger tokenId, byte[] data) {
        final Function function = new Function(
                FUNC_safeTransferFrom,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, from),
                        new org.web3j.abi.datatypes.Address(160, to),
                        new org.web3j.abi.datatypes.generated.Uint256(tokenId),
                        new org.web3j.abi.datatypes.DynamicBytes(data)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> setApprovalForAll(String operator,
                                                                    Boolean approved) {
        final Function function = new Function(
                FUNC_SETAPPROVALFORALL,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, operator),
                        new org.web3j.abi.datatypes.Bool(approved)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Boolean> supportsInterface(byte[] interfaceId) {
        final Function function = new Function(FUNC_SUPPORTSINTERFACE,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Bytes4(interfaceId)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<String> symbol() {
        final Function function = new Function(FUNC_SYMBOL,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> tokenURI(BigInteger tokenId) {
        final Function function = new Function(FUNC_TOKENURI,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(tokenId)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> transfer(String _from, String _to,
                                                           String _ipfsCID) {
        final Function function = new Function(
                FUNC_TRANSFER,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _from),
                        new org.web3j.abi.datatypes.Address(160, _to),
                        new org.web3j.abi.datatypes.Utf8String(_ipfsCID)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> transferFrom(String from, String to,
                                                               BigInteger tokenId) {
        final Function function = new Function(
                FUNC_TRANSFERFROM,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, from),
                        new org.web3j.abi.datatypes.Address(160, to),
                        new org.web3j.abi.datatypes.generated.Uint256(tokenId)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static EquipmentNFTContract load(String contractAddress, Web3j web3j,
                                            Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new EquipmentNFTContract(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static EquipmentNFTContract load(String contractAddress, Web3j web3j,
                                            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new EquipmentNFTContract(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static EquipmentNFTContract load(String contractAddress, Web3j web3j,
                                            Credentials credentials, ContractGasProvider contractGasProvider) {
        return new EquipmentNFTContract(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static EquipmentNFTContract load(String contractAddress, Web3j web3j,
                                            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new EquipmentNFTContract(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<EquipmentNFTContract> deploy(Web3j web3j, Credentials credentials,
                                                          ContractGasProvider contractGasProvider, String _base) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(_base)));
        return deployRemoteCall(EquipmentNFTContract.class, web3j, credentials, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    public static RemoteCall<EquipmentNFTContract> deploy(Web3j web3j,
                                                          TransactionManager transactionManager, ContractGasProvider contractGasProvider,
                                                          String _base) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(_base)));
        return deployRemoteCall(EquipmentNFTContract.class, web3j, transactionManager, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<EquipmentNFTContract> deploy(Web3j web3j, Credentials credentials,
                                                          BigInteger gasPrice, BigInteger gasLimit, String _base) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(_base)));
        return deployRemoteCall(EquipmentNFTContract.class, web3j, credentials, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<EquipmentNFTContract> deploy(Web3j web3j,
                                                          TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit,
                                                          String _base) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(_base)));
        return deployRemoteCall(EquipmentNFTContract.class, web3j, transactionManager, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
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

        public String approved;

        public BigInteger tokenId;
    }

    public static class ApprovalForAllEventResponse extends BaseEventResponse {
        public String owner;

        public String operator;

        public Boolean approved;
    }

    public static class MintResultEventResponse extends BaseEventResponse {
        public String owner;

        public String ipfsCID;

        public String nftURI;
    }

    public static class TransferEventResponse extends BaseEventResponse {
        public String from;

        public String to;

        public BigInteger tokenId;
    }
}