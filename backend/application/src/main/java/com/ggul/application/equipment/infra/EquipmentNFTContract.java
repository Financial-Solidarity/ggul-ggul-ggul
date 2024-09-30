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
    public static final String BINARY = "0x60806040523480156200001157600080fd5b5060405162002bf538038062002bf58339818101604052810190620000379190620002b6565b6040518060400160405280600981526020017f45717569706d656e7400000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f4e465400000000000000000000000000000000000000000000000000000000008152508160009081620000b4919062000552565b508060019081620000c6919062000552565b50505033600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600790816200011b919062000552565b505062000639565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200018c8262000141565b810181811067ffffffffffffffff82111715620001ae57620001ad62000152565b5b80604052505050565b6000620001c362000123565b9050620001d1828262000181565b919050565b600067ffffffffffffffff821115620001f457620001f362000152565b5b620001ff8262000141565b9050602081019050919050565b60005b838110156200022c5780820151818401526020810190506200020f565b60008484015250505050565b60006200024f6200024984620001d6565b620001b7565b9050828152602081018484840111156200026e576200026d6200013c565b5b6200027b8482856200020c565b509392505050565b600082601f8301126200029b576200029a62000137565b5b8151620002ad84826020860162000238565b91505092915050565b600060208284031215620002cf57620002ce6200012d565b5b600082015167ffffffffffffffff811115620002f057620002ef62000132565b5b620002fe8482850162000283565b91505092915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200035a57607f821691505b60208210810362000370576200036f62000312565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620003da7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200039b565b620003e686836200039b565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620004336200042d6200042784620003fe565b62000408565b620003fe565b9050919050565b6000819050919050565b6200044f8362000412565b620004676200045e826200043a565b848454620003a8565b825550505050565b600090565b6200047e6200046f565b6200048b81848462000444565b505050565b5b81811015620004b357620004a760008262000474565b60018101905062000491565b5050565b601f8211156200050257620004cc8162000376565b620004d7846200038b565b81016020851015620004e7578190505b620004ff620004f6856200038b565b83018262000490565b50505b505050565b600082821c905092915050565b6000620005276000198460080262000507565b1980831691505092915050565b600062000542838362000514565b9150826002028217905092915050565b6200055d8262000307565b67ffffffffffffffff81111562000579576200057862000152565b5b62000585825462000341565b62000592828285620004b7565b600060209050601f831160018114620005ca5760008415620005b5578287015190505b620005c1858262000534565b86555062000631565b601f198416620005da8662000376565b60005b828110156200060457848901518255600182019150602085019450602081019050620005dd565b8683101562000624578489015162000620601f89168262000514565b8355505b6001600288020188555050505b505050505050565b6125ac80620006496000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80636352211e11610097578063b88d4fde11610066578063b88d4fde146102bd578063c87b56dd146102d9578063d0def52114610309578063e985e9c51461032557610100565b80636352211e1461022357806370a082311461025357806395d89b4114610283578063a22cb465146102a157610100565b806317987ca5116100d357806317987ca51461019f57806323b872dd146101cf578063397bfa92146101eb57806342842e0e1461020757610100565b806301ffc9a71461010557806306fdde0314610135578063081812fc14610153578063095ea7b314610183575b600080fd5b61011f600480360381019061011a9190611a46565b610355565b60405161012c9190611a8e565b60405180910390f35b61013d610437565b60405161014a9190611b39565b60405180910390f35b61016d60048036038101906101689190611b91565b6104c9565b60405161017a9190611bff565b60405180910390f35b61019d60048036038101906101989190611c46565b6104e5565b005b6101b960048036038101906101b49190611dbb565b6104fb565b6040516101c69190611b39565b60405180910390f35b6101e960048036038101906101e49190611e04565b610553565b005b61020560048036038101906102009190611e57565b610655565b005b610221600480360381019061021c9190611e04565b6106c7565b005b61023d60048036038101906102389190611b91565b6106e7565b60405161024a9190611bff565b60405180910390f35b61026d60048036038101906102689190611ec6565b6106f9565b60405161027a9190611f02565b60405180910390f35b61028b6107b3565b6040516102989190611b39565b60405180910390f35b6102bb60048036038101906102b69190611f49565b610845565b005b6102d760048036038101906102d2919061202a565b61085b565b005b6102f360048036038101906102ee9190611b91565b610878565b6040516103009190611b39565b60405180910390f35b610323600480360381019061031e91906120ad565b6108e1565b005b61033f600480360381019061033a9190612109565b6109a9565b60405161034c9190611a8e565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061042057507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610430575061042f82610a3d565b5b9050919050565b60606000805461044690612178565b80601f016020809104026020016040519081016040528092919081815260200182805461047290612178565b80156104bf5780601f10610494576101008083540402835291602001916104bf565b820191906000526020600020905b8154815290600101906020018083116104a257829003601f168201915b5050505050905090565b60006104d482610aa7565b506104de82610b2f565b9050919050565b6104f782826104f2610b6c565b610b74565b5050565b606060006007805461050c90612178565b905011610528576040518060200160405280600081525061054c565b60078260405160200161053c92919061227d565b6040516020818303038152906040525b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036105c55760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016105bc9190611bff565b60405180910390fd5b60006105d983836105d4610b6c565b610b86565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461064f578382826040517f64283d7b000000000000000000000000000000000000000000000000000000008152600401610646939291906122a1565b60405180910390fd5b50505050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146106af57600080fd5b6106c283836106bd84610da0565b610e14565b505050565b6106e28383836040518060200160405280600081525061085b565b505050565b60006106f282610aa7565b9050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361076c5760006040517f89c62b640000000000000000000000000000000000000000000000000000000081526004016107639190611bff565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6060600180546107c290612178565b80601f01602080910402602001604051908101604052809291908181526020018280546107ee90612178565b801561083b5780601f106108105761010080835404028352916020019161083b565b820191906000526020600020905b81548152906001019060200180831161081e57829003601f168201915b5050505050905090565b610857610850610b6c565b8383610f81565b5050565b610866848484610553565b610872848484846110f0565b50505050565b606061088382610aa7565b50600061088e6112a7565b905060008151116108ae57604051806020016040528060008152506108d9565b806108b884611339565b6040516020016108c99291906122d8565b6040516020818303038152906040525b915050919050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461093b57600080fd5b61094d8261094883610da0565b611407565b8173ffffffffffffffffffffffffffffffffffffffff167fd564dcd93802bcef98cf67d3f543fcfd6deec61e552129a8d4bdb72817d4681b8261098f846104fb565b60405161099d9291906122fc565b60405180910390a25050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600080610ab383611500565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610b2657826040517f7e273289000000000000000000000000000000000000000000000000000000008152600401610b1d9190611f02565b60405180910390fd5b80915050919050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600033905090565b610b81838383600161153d565b505050565b600080610b9284611500565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614610bd457610bd3818486611702565b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610c6557610c1660008560008061153d565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614610ce8576001600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b846002600086815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b6000808290506000805b8251811015610e09576030838281518110610dc857610dc7612333565b5b602001015160f81c60f81b60f81c60ff16610de39190612391565b600a83610df091906123c5565b610dfa9190612407565b91508080600101915050610daa565b508092505050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e865760006040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401610e7d9190611bff565b60405180910390fd5b6000610e9483836000610b86565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610f0757816040517f7e273289000000000000000000000000000000000000000000000000000000008152600401610efe9190611f02565b60405180910390fd5b8373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610f7b578382826040517f64283d7b000000000000000000000000000000000000000000000000000000008152600401610f72939291906122a1565b60405180910390fd5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610ff257816040517f5b08ba18000000000000000000000000000000000000000000000000000000008152600401610fe99190611bff565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516110e39190611a8e565b60405180910390a3505050565b60008373ffffffffffffffffffffffffffffffffffffffff163b11156112a1578273ffffffffffffffffffffffffffffffffffffffff1663150b7a02611134610b6c565b8685856040518563ffffffff1660e01b81526004016111569493929190612490565b6020604051808303816000875af192505050801561119257506040513d601f19601f8201168201806040525081019061118f91906124f1565b60015b611216573d80600081146111c2576040519150601f19603f3d011682016040523d82523d6000602084013e6111c7565b606091505b50600081510361120e57836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016112059190611bff565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461129f57836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016112969190611bff565b60405180910390fd5b505b50505050565b6060600780546112b690612178565b80601f01602080910402602001604051908101604052809291908181526020018280546112e290612178565b801561132f5780601f106113045761010080835404028352916020019161132f565b820191906000526020600020905b81548152906001019060200180831161131257829003601f168201915b5050505050905090565b606060006001611348846117c6565b01905060008167ffffffffffffffff81111561136757611366611c90565b5b6040519080825280601f01601f1916602001820160405280156113995781602001600182028036833780820191505090505b509050600082602001820190505b6001156113fc578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a85816113f0576113ef61251e565b5b049450600085036113a7575b819350505050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036114795760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016114709190611bff565b60405180910390fd5b600061148783836000610b86565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146114fb5760006040517f73c6ac6e0000000000000000000000000000000000000000000000000000000081526004016114f29190611bff565b60405180910390fd5b505050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b80806115765750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b156116aa57600061158684610aa7565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141580156115f157508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b8015611604575061160281846109a9565b155b1561164657826040517fa9fbf51f00000000000000000000000000000000000000000000000000000000815260040161163d9190611bff565b60405180910390fd5b81156116a857838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b836004600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b61170d838383611919565b6117c157600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361178257806040517f7e2732890000000000000000000000000000000000000000000000000000000081526004016117799190611f02565b60405180910390fd5b81816040517f177e802f0000000000000000000000000000000000000000000000000000000081526004016117b892919061254d565b60405180910390fd5b505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611824577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000838161181a5761181961251e565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611861576d04ee2d6d415b85acef810000000083816118575761185661251e565b5b0492506020810190505b662386f26fc10000831061189057662386f26fc1000083816118865761188561251e565b5b0492506010810190505b6305f5e10083106118b9576305f5e10083816118af576118ae61251e565b5b0492506008810190505b61271083106118de5761271083816118d4576118d361251e565b5b0492506004810190505b6064831061190157606483816118f7576118f661251e565b5b0492506002810190505b600a8310611910576001810190505b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141580156119d157508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480611992575061199184846109a9565b5b806119d057508273ffffffffffffffffffffffffffffffffffffffff166119b883610b2f565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611a23816119ee565b8114611a2e57600080fd5b50565b600081359050611a4081611a1a565b92915050565b600060208284031215611a5c57611a5b6119e4565b5b6000611a6a84828501611a31565b91505092915050565b60008115159050919050565b611a8881611a73565b82525050565b6000602082019050611aa36000830184611a7f565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611ae3578082015181840152602081019050611ac8565b60008484015250505050565b6000601f19601f8301169050919050565b6000611b0b82611aa9565b611b158185611ab4565b9350611b25818560208601611ac5565b611b2e81611aef565b840191505092915050565b60006020820190508181036000830152611b538184611b00565b905092915050565b6000819050919050565b611b6e81611b5b565b8114611b7957600080fd5b50565b600081359050611b8b81611b65565b92915050565b600060208284031215611ba757611ba66119e4565b5b6000611bb584828501611b7c565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611be982611bbe565b9050919050565b611bf981611bde565b82525050565b6000602082019050611c146000830184611bf0565b92915050565b611c2381611bde565b8114611c2e57600080fd5b50565b600081359050611c4081611c1a565b92915050565b60008060408385031215611c5d57611c5c6119e4565b5b6000611c6b85828601611c31565b9250506020611c7c85828601611b7c565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611cc882611aef565b810181811067ffffffffffffffff82111715611ce757611ce6611c90565b5b80604052505050565b6000611cfa6119da565b9050611d068282611cbf565b919050565b600067ffffffffffffffff821115611d2657611d25611c90565b5b611d2f82611aef565b9050602081019050919050565b82818337600083830152505050565b6000611d5e611d5984611d0b565b611cf0565b905082815260208101848484011115611d7a57611d79611c8b565b5b611d85848285611d3c565b509392505050565b600082601f830112611da257611da1611c86565b5b8135611db2848260208601611d4b565b91505092915050565b600060208284031215611dd157611dd06119e4565b5b600082013567ffffffffffffffff811115611def57611dee6119e9565b5b611dfb84828501611d8d565b91505092915050565b600080600060608486031215611e1d57611e1c6119e4565b5b6000611e2b86828701611c31565b9350506020611e3c86828701611c31565b9250506040611e4d86828701611b7c565b9150509250925092565b600080600060608486031215611e7057611e6f6119e4565b5b6000611e7e86828701611c31565b9350506020611e8f86828701611c31565b925050604084013567ffffffffffffffff811115611eb057611eaf6119e9565b5b611ebc86828701611d8d565b9150509250925092565b600060208284031215611edc57611edb6119e4565b5b6000611eea84828501611c31565b91505092915050565b611efc81611b5b565b82525050565b6000602082019050611f176000830184611ef3565b92915050565b611f2681611a73565b8114611f3157600080fd5b50565b600081359050611f4381611f1d565b92915050565b60008060408385031215611f6057611f5f6119e4565b5b6000611f6e85828601611c31565b9250506020611f7f85828601611f34565b9150509250929050565b600067ffffffffffffffff821115611fa457611fa3611c90565b5b611fad82611aef565b9050602081019050919050565b6000611fcd611fc884611f89565b611cf0565b905082815260208101848484011115611fe957611fe8611c8b565b5b611ff4848285611d3c565b509392505050565b600082601f83011261201157612010611c86565b5b8135612021848260208601611fba565b91505092915050565b60008060008060808587031215612044576120436119e4565b5b600061205287828801611c31565b945050602061206387828801611c31565b935050604061207487828801611b7c565b925050606085013567ffffffffffffffff811115612095576120946119e9565b5b6120a187828801611ffc565b91505092959194509250565b600080604083850312156120c4576120c36119e4565b5b60006120d285828601611c31565b925050602083013567ffffffffffffffff8111156120f3576120f26119e9565b5b6120ff85828601611d8d565b9150509250929050565b600080604083850312156121205761211f6119e4565b5b600061212e85828601611c31565b925050602061213f85828601611c31565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061219057607f821691505b6020821081036121a3576121a2612149565b5b50919050565b600081905092915050565b60008190508160005260206000209050919050565b600081546121d681612178565b6121e081866121a9565b945060018216600081146121fb576001811461221057612243565b60ff1983168652811515820286019350612243565b612219856121b4565b60005b8381101561223b5781548189015260018201915060208101905061221c565b838801955050505b50505092915050565b600061225782611aa9565b61226181856121a9565b9350612271818560208601611ac5565b80840191505092915050565b600061228982856121c9565b9150612295828461224c565b91508190509392505050565b60006060820190506122b66000830186611bf0565b6122c36020830185611ef3565b6122d06040830184611bf0565b949350505050565b60006122e4828561224c565b91506122f0828461224c565b91508190509392505050565b600060408201905081810360008301526123168185611b00565b9050818103602083015261232a8184611b00565b90509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061239c82611b5b565b91506123a783611b5b565b92508282039050818111156123bf576123be612362565b5b92915050565b60006123d082611b5b565b91506123db83611b5b565b92508282026123e981611b5b565b91508282048414831517612400576123ff612362565b5b5092915050565b600061241282611b5b565b915061241d83611b5b565b925082820190508082111561243557612434612362565b5b92915050565b600081519050919050565b600082825260208201905092915050565b60006124628261243b565b61246c8185612446565b935061247c818560208601611ac5565b61248581611aef565b840191505092915050565b60006080820190506124a56000830187611bf0565b6124b26020830186611bf0565b6124bf6040830185611ef3565b81810360608301526124d18184612457565b905095945050505050565b6000815190506124eb81611a1a565b92915050565b600060208284031215612507576125066119e4565b5b6000612515848285016124dc565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006040820190506125626000830185611bf0565b61256f6020830184611ef3565b939250505056fea2646970667358221220e0e7fc3261f15e967905521906fac0b675bf724600fd0e60ae5556cf08bc8c6164736f6c63430008180033";

    private static String librariesLinkedBinary;

    public static final String FUNC_APPROVE = "approve";

    public static final String FUNC_BALANCEOF = "balanceOf";

    public static final String FUNC_GETAPPROVED = "getApproved";

    public static final String FUNC_ISAPPROVEDFORALL = "isApprovedForAll";

    public static final String FUNC_MINT = "mint";

    public static final String FUNC_NAME = "name";

    public static final String FUNC_NFTURI = "nftURI";

    public static final String FUNC_OWNEROF = "ownerOf";

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

    public RemoteFunctionCall<String> nftURI(String ipfsCID) {
        final Function function = new Function(FUNC_NFTURI,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(ipfsCID)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> ownerOf(BigInteger tokenId) {
        final Function function = new Function(FUNC_OWNEROF,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(tokenId)),
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
