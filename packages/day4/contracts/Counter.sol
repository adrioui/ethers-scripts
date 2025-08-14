// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Counter {
    uint256 public count;
    address public boss;

    constructor(uint256 _initialCount) {
      count = _initialCount;
      boss = msg.sender;
    }

    // Modifier to check that the caller is the owner of
    // the contract.
    modifier onlyBoss() {
        require(msg.sender == boss, "Sorry, you're not the boss");
        // Underscore is a special character only used inside
        // a function modifier and it tells Solidity to
        // execute the rest of the code.
        _;
    }

    // Function to get the current count
    function get() public view returns (uint256) {
      return count;
    }

    // Function to increment count by 1
    function inc() public {
      count += 1;
    }

    function superInc() public onlyBoss {
      count += 10;
    }

    // Function to decrement count by 1
    function dec() public onlyBoss {
      // This function will fail if count = 0
      count -= 1;
    }
}

