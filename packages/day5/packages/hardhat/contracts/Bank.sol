//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract Bank {
    mapping (address => uint256) public balance;

    function deposit() public payable {
      console.log(msg.sender, "DEPOSIT", msg.value, tx.origin);
      balance[msg.sender] += msg.value;
    }

    function withdraw() public {
      (bool sent, bytes memory data) = msg.sender.call{value: balance[msg.sender]}("");
      require(sent, "Failed to send Ether");
      balance[msg.sender] = 0;
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {
      deposit();
    }
}
