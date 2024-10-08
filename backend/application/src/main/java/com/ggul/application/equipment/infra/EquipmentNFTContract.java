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
    public static final String BINARY = "0x60806040523480156200001157600080fd5b5060405162002ede38038062002ede8339818101604052810190620000379190620002b6565b6040518060400160405280600981526020017f45717569706d656e7400000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f4e465400000000000000000000000000000000000000000000000000000000008152508160009081620000b4919062000552565b508060019081620000c6919062000552565b50505033600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600790816200011b919062000552565b505062000639565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200018c8262000141565b810181811067ffffffffffffffff82111715620001ae57620001ad62000152565b5b80604052505050565b6000620001c362000123565b9050620001d1828262000181565b919050565b600067ffffffffffffffff821115620001f457620001f362000152565b5b620001ff8262000141565b9050602081019050919050565b60005b838110156200022c5780820151818401526020810190506200020f565b60008484015250505050565b60006200024f6200024984620001d6565b620001b7565b9050828152602081018484840111156200026e576200026d6200013c565b5b6200027b8482856200020c565b509392505050565b600082601f8301126200029b576200029a62000137565b5b8151620002ad84826020860162000238565b91505092915050565b600060208284031215620002cf57620002ce6200012d565b5b600082015167ffffffffffffffff811115620002f057620002ef62000132565b5b620002fe8482850162000283565b91505092915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200035a57607f821691505b60208210810362000370576200036f62000312565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620003da7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200039b565b620003e686836200039b565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620004336200042d6200042784620003fe565b62000408565b620003fe565b9050919050565b6000819050919050565b6200044f8362000412565b620004676200045e826200043a565b848454620003a8565b825550505050565b600090565b6200047e6200046f565b6200048b81848462000444565b505050565b5b81811015620004b357620004a760008262000474565b60018101905062000491565b5050565b601f8211156200050257620004cc8162000376565b620004d7846200038b565b81016020851015620004e7578190505b620004ff620004f6856200038b565b83018262000490565b50505b505050565b600082821c905092915050565b6000620005276000198460080262000507565b1980831691505092915050565b600062000542838362000514565b9150826002028217905092915050565b6200055d8262000307565b67ffffffffffffffff81111562000579576200057862000152565b5b62000585825462000341565b62000592828285620004b7565b600060209050601f831160018114620005ca5760008415620005b5578287015190505b620005c1858262000534565b86555062000631565b601f198416620005da8662000376565b60005b828110156200060457848901518255600182019150602085019450602081019050620005dd565b8683101562000624578489015162000620601f89168262000514565b8355505b6001600288020188555050505b505050505050565b61289580620006496000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c80636352211e116100ad578063b88d4fde11610071578063b88d4fde1461032a578063c2bc905e14610346578063c87b56dd14610362578063d0def52114610392578063e985e9c5146103ae57610121565b80636352211e1461026057806370a0823114610290578063920ffa26146102c057806395d89b41146102f0578063a22cb4651461030e57610121565b806317987ca5116100f457806317987ca5146101c057806323b872dd146101f0578063397bfa921461020c57806342842e0e146102285780635d9ef52e1461024457610121565b806301ffc9a71461012657806306fdde0314610156578063081812fc14610174578063095ea7b3146101a4575b600080fd5b610140600480360381019061013b9190611d2f565b6103de565b60405161014d9190611d77565b60405180910390f35b61015e6104c0565b60405161016b9190611e22565b60405180910390f35b61018e60048036038101906101899190611e7a565b610552565b60405161019b9190611ee8565b60405180910390f35b6101be60048036038101906101b99190611f2f565b61056e565b005b6101da60048036038101906101d591906120a4565b610584565b6040516101e79190611e22565b60405180910390f35b61020a600480360381019061020591906120ed565b6105dc565b005b61022660048036038101906102219190612140565b6106de565b005b610242600480360381019061023d91906120ed565b6107a4565b005b61025e600480360381019061025991906121af565b6107c4565b005b61027a60048036038101906102759190611e7a565b61087b565b6040516102879190611ee8565b60405180910390f35b6102aa60048036038101906102a5919061220b565b61088d565b6040516102b79190612247565b60405180910390f35b6102da60048036038101906102d591906120a4565b610947565b6040516102e79190611ee8565b60405180910390f35b6102f8610961565b6040516103059190611e22565b60405180910390f35b6103286004803603810190610323919061228e565b6109f3565b005b610344600480360381019061033f919061236f565b610a09565b005b610360600480360381019061035b919061220b565b610a26565b005b61037c60048036038101906103779190611e7a565b610adb565b6040516103899190611e22565b60405180910390f35b6103ac60048036038101906103a791906121af565b610b44565b005b6103c860048036038101906103c391906123f2565b610c0c565b6040516103d59190611d77565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806104a957507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806104b957506104b882610ca0565b5b9050919050565b6060600080546104cf90612461565b80601f01602080910402602001604051908101604052809291908181526020018280546104fb90612461565b80156105485780601f1061051d57610100808354040283529160200191610548565b820191906000526020600020905b81548152906001019060200180831161052b57829003601f168201915b5050505050905090565b600061055d82610d0a565b5061056782610d92565b9050919050565b610580828261057b610dcf565b610dd7565b5050565b606060006007805461059590612461565b9050116105b157604051806020016040528060008152506105d5565b6007826040516020016105c5929190612566565b6040516020818303038152906040525b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361064e5760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016106459190611ee8565b60405180910390fd5b6000610662838361065d610dcf565b610de9565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146106d8578382826040517f64283d7b0000000000000000000000000000000000000000000000000000000081526004016106cf9392919061258a565b60405180910390fd5b50505050565b600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16806107835750600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b61078c57600080fd5b61079f838361079a84611003565b611077565b505050565b6107bf83838360405180602001604052806000815250610a09565b505050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461081e57600080fd5b61082f61082a82611003565b6111e4565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161461086657600080fd5b61087761087282611003565b611221565b5050565b600061088682610d0a565b9050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036109005760006040517f89c62b640000000000000000000000000000000000000000000000000000000081526004016108f79190611ee8565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600061095a61095583611003565b6111e4565b9050919050565b60606001805461097090612461565b80601f016020809104026020016040519081016040528092919081815260200182805461099c90612461565b80156109e95780601f106109be576101008083540402835291602001916109e9565b820191906000526020600020905b8154815290600101906020018083116109cc57829003601f168201915b5050505050905090565b610a056109fe610dcf565b83836112a7565b5050565b610a148484846105dc565b610a2084848484611416565b50505050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a8057600080fd5b6001600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b6060610ae682610d0a565b506000610af16115cd565b90506000815111610b115760405180602001604052806000815250610b3c565b80610b1b8461165f565b604051602001610b2c9291906125c1565b6040516020818303038152906040525b915050919050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b9e57600080fd5b610bb082610bab83611003565b61172d565b8173ffffffffffffffffffffffffffffffffffffffff167fd564dcd93802bcef98cf67d3f543fcfd6deec61e552129a8d4bdb72817d4681b82610bf284610584565b604051610c009291906125e5565b60405180910390a25050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600080610d16836111e4565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610d8957826040517f7e273289000000000000000000000000000000000000000000000000000000008152600401610d809190612247565b60405180910390fd5b80915050919050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600033905090565b610de48383836001611826565b505050565b600080610df5846111e4565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614610e3757610e368184866119eb565b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610ec857610e79600085600080611826565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614610f4b576001600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b846002600086815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b6000808290506000805b825181101561106c57603083828151811061102b5761102a61261c565b5b602001015160f81c60f81b60f81c60ff16611046919061267a565b600a8361105391906126ae565b61105d91906126f0565b9150808060010191505061100d565b508092505050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036110e95760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016110e09190611ee8565b60405180910390fd5b60006110f783836000610de9565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361116a57816040517f7e2732890000000000000000000000000000000000000000000000000000000081526004016111619190612247565b60405180910390fd5b8373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146111de578382826040517f64283d7b0000000000000000000000000000000000000000000000000000000081526004016111d59392919061258a565b60405180910390fd5b50505050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006112306000836000610de9565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036112a357816040517f7e27328900000000000000000000000000000000000000000000000000000000815260040161129a9190612247565b60405180910390fd5b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361131857816040517f5b08ba1800000000000000000000000000000000000000000000000000000000815260040161130f9190611ee8565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516114099190611d77565b60405180910390a3505050565b60008373ffffffffffffffffffffffffffffffffffffffff163b11156115c7578273ffffffffffffffffffffffffffffffffffffffff1663150b7a0261145a610dcf565b8685856040518563ffffffff1660e01b815260040161147c9493929190612779565b6020604051808303816000875af19250505080156114b857506040513d601f19601f820116820180604052508101906114b591906127da565b60015b61153c573d80600081146114e8576040519150601f19603f3d011682016040523d82523d6000602084013e6114ed565b606091505b50600081510361153457836040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040161152b9190611ee8565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146115c557836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016115bc9190611ee8565b60405180910390fd5b505b50505050565b6060600780546115dc90612461565b80601f016020809104026020016040519081016040528092919081815260200182805461160890612461565b80156116555780601f1061162a57610100808354040283529160200191611655565b820191906000526020600020905b81548152906001019060200180831161163857829003601f168201915b5050505050905090565b60606000600161166e84611aaf565b01905060008167ffffffffffffffff81111561168d5761168c611f79565b5b6040519080825280601f01601f1916602001820160405280156116bf5781602001600182028036833780820191505090505b509050600082602001820190505b600115611722578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a858161171657611715612807565b5b049450600085036116cd575b819350505050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361179f5760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016117969190611ee8565b60405180910390fd5b60006117ad83836000610de9565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146118215760006040517f73c6ac6e0000000000000000000000000000000000000000000000000000000081526004016118189190611ee8565b60405180910390fd5b505050565b808061185f5750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b1561199357600061186f84610d0a565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141580156118da57508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b80156118ed57506118eb8184610c0c565b155b1561192f57826040517fa9fbf51f0000000000000000000000000000000000000000000000000000000081526004016119269190611ee8565b60405180910390fd5b811561199157838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b836004600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b6119f6838383611c02565b611aaa57600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611a6b57806040517f7e273289000000000000000000000000000000000000000000000000000000008152600401611a629190612247565b60405180910390fd5b81816040517f177e802f000000000000000000000000000000000000000000000000000000008152600401611aa1929190612836565b60405180910390fd5b505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611b0d577a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008381611b0357611b02612807565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611b4a576d04ee2d6d415b85acef81000000008381611b4057611b3f612807565b5b0492506020810190505b662386f26fc100008310611b7957662386f26fc100008381611b6f57611b6e612807565b5b0492506010810190505b6305f5e1008310611ba2576305f5e1008381611b9857611b97612807565b5b0492506008810190505b6127108310611bc7576127108381611bbd57611bbc612807565b5b0492506004810190505b60648310611bea5760648381611be057611bdf612807565b5b0492506002810190505b600a8310611bf9576001810190505b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614158015611cba57508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480611c7b5750611c7a8484610c0c565b5b80611cb957508273ffffffffffffffffffffffffffffffffffffffff16611ca183610d92565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611d0c81611cd7565b8114611d1757600080fd5b50565b600081359050611d2981611d03565b92915050565b600060208284031215611d4557611d44611ccd565b5b6000611d5384828501611d1a565b91505092915050565b60008115159050919050565b611d7181611d5c565b82525050565b6000602082019050611d8c6000830184611d68565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611dcc578082015181840152602081019050611db1565b60008484015250505050565b6000601f19601f8301169050919050565b6000611df482611d92565b611dfe8185611d9d565b9350611e0e818560208601611dae565b611e1781611dd8565b840191505092915050565b60006020820190508181036000830152611e3c8184611de9565b905092915050565b6000819050919050565b611e5781611e44565b8114611e6257600080fd5b50565b600081359050611e7481611e4e565b92915050565b600060208284031215611e9057611e8f611ccd565b5b6000611e9e84828501611e65565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611ed282611ea7565b9050919050565b611ee281611ec7565b82525050565b6000602082019050611efd6000830184611ed9565b92915050565b611f0c81611ec7565b8114611f1757600080fd5b50565b600081359050611f2981611f03565b92915050565b60008060408385031215611f4657611f45611ccd565b5b6000611f5485828601611f1a565b9250506020611f6585828601611e65565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611fb182611dd8565b810181811067ffffffffffffffff82111715611fd057611fcf611f79565b5b80604052505050565b6000611fe3611cc3565b9050611fef8282611fa8565b919050565b600067ffffffffffffffff82111561200f5761200e611f79565b5b61201882611dd8565b9050602081019050919050565b82818337600083830152505050565b600061204761204284611ff4565b611fd9565b90508281526020810184848401111561206357612062611f74565b5b61206e848285612025565b509392505050565b600082601f83011261208b5761208a611f6f565b5b813561209b848260208601612034565b91505092915050565b6000602082840312156120ba576120b9611ccd565b5b600082013567ffffffffffffffff8111156120d8576120d7611cd2565b5b6120e484828501612076565b91505092915050565b60008060006060848603121561210657612105611ccd565b5b600061211486828701611f1a565b935050602061212586828701611f1a565b925050604061213686828701611e65565b9150509250925092565b60008060006060848603121561215957612158611ccd565b5b600061216786828701611f1a565b935050602061217886828701611f1a565b925050604084013567ffffffffffffffff81111561219957612198611cd2565b5b6121a586828701612076565b9150509250925092565b600080604083850312156121c6576121c5611ccd565b5b60006121d485828601611f1a565b925050602083013567ffffffffffffffff8111156121f5576121f4611cd2565b5b61220185828601612076565b9150509250929050565b60006020828403121561222157612220611ccd565b5b600061222f84828501611f1a565b91505092915050565b61224181611e44565b82525050565b600060208201905061225c6000830184612238565b92915050565b61226b81611d5c565b811461227657600080fd5b50565b60008135905061228881612262565b92915050565b600080604083850312156122a5576122a4611ccd565b5b60006122b385828601611f1a565b92505060206122c485828601612279565b9150509250929050565b600067ffffffffffffffff8211156122e9576122e8611f79565b5b6122f282611dd8565b9050602081019050919050565b600061231261230d846122ce565b611fd9565b90508281526020810184848401111561232e5761232d611f74565b5b612339848285612025565b509392505050565b600082601f83011261235657612355611f6f565b5b81356123668482602086016122ff565b91505092915050565b6000806000806080858703121561238957612388611ccd565b5b600061239787828801611f1a565b94505060206123a887828801611f1a565b93505060406123b987828801611e65565b925050606085013567ffffffffffffffff8111156123da576123d9611cd2565b5b6123e687828801612341565b91505092959194509250565b6000806040838503121561240957612408611ccd565b5b600061241785828601611f1a565b925050602061242885828601611f1a565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061247957607f821691505b60208210810361248c5761248b612432565b5b50919050565b600081905092915050565b60008190508160005260206000209050919050565b600081546124bf81612461565b6124c98186612492565b945060018216600081146124e457600181146124f95761252c565b60ff198316865281151582028601935061252c565b6125028561249d565b60005b8381101561252457815481890152600182019150602081019050612505565b838801955050505b50505092915050565b600061254082611d92565b61254a8185612492565b935061255a818560208601611dae565b80840191505092915050565b600061257282856124b2565b915061257e8284612535565b91508190509392505050565b600060608201905061259f6000830186611ed9565b6125ac6020830185612238565b6125b96040830184611ed9565b949350505050565b60006125cd8285612535565b91506125d98284612535565b91508190509392505050565b600060408201905081810360008301526125ff8185611de9565b905081810360208301526126138184611de9565b90509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061268582611e44565b915061269083611e44565b92508282039050818111156126a8576126a761264b565b5b92915050565b60006126b982611e44565b91506126c483611e44565b92508282026126d281611e44565b915082820484148315176126e9576126e861264b565b5b5092915050565b60006126fb82611e44565b915061270683611e44565b925082820190508082111561271e5761271d61264b565b5b92915050565b600081519050919050565b600082825260208201905092915050565b600061274b82612724565b612755818561272f565b9350612765818560208601611dae565b61276e81611dd8565b840191505092915050565b600060808201905061278e6000830187611ed9565b61279b6020830186611ed9565b6127a86040830185612238565b81810360608301526127ba8184612740565b905095945050505050565b6000815190506127d481611d03565b92915050565b6000602082840312156127f0576127ef611ccd565b5b60006127fe848285016127c5565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600060408201905061284b6000830185611ed9565b6128586020830184612238565b939250505056fea264697066735822122089b469d8f7b9ef09492b716e2c5216f6302030f5059deea7ca71a0181427999f64736f6c63430008180033";

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

    public static final String FUNC_REGISTERTRANSFERALLOWEDCONTRACTLIST = "registerTransferAllowedContractList";

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

    public RemoteFunctionCall<TransactionReceipt> registerTransferAllowedContractList(
            String _contractAddress) {
        final Function function = new Function(
                FUNC_REGISTERTRANSFERALLOWEDCONTRACTLIST,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _contractAddress)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
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