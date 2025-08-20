//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract is Ownable {
    uint256 public counter;

    constructor() Ownable(0xcdF9516448BeB88E12a81171bFeEe072ea479579) {}

    function deposit() public payable {
      console.log(msg.sender, "deposited", msg.value);
    }

    function withdraw() public onlyOwner {
      (bool sent, bytes memory data) = msg.sender.call{value: address(this).balance}("");
      require(sent, "Failed to send Ether");
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {
      deposit();
    }
}
