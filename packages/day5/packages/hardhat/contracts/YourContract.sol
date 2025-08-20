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
  event Buy (address indexed buyer);

  uint256 public constant totalSupply = 1000;
  uint256 public totalCreated = 0;

  uint256 public constant CREATION_PRICE = 0.01 ether;
    
  mapping(address => uint256) public balances;

  constructor(address _owner) Ownable(_owner) {}

  // TODO implement vote to increase totalSupply
  // struct Vote {
  //   address voter;
  //   bool selection;
  // }
  //
  // Vote[] public votes;

  function create(uint256 quantity) public onlyOwner {
    require(quantity + totalCreated <= totalSupply, "totalSupply reached!");

    balances[msg.sender] += quantity;
    totalCreated += quantity;
  }

  function send(address to, uint256 quantity) public {
    require(balances[msg.sender] >= quantity, "You don't have enough"); // Extra gas

    balances[msg.sender] -= quantity;
    balances[to] += quantity;
  }

  function buy() public payable {
    require(msg.value == CREATION_PRICE, "Incorrect ETH amount");
    require(totalCreated < totalSupply, "totalSupply reached!");

    balances[msg.sender] += 1;
    totalCreated += 1;

    emit Buy(msg.sender);
  }

  function withdraw() public onlyOwner {
    (bool sent, bytes memory data) = owner().call{value: address(this).balance}("");
    require(sent, "Failed to send Ether");
  }

  // https://solidity-by-example.org/sending-ether/
  // Function to receive Ether. msg.data must be empty
  // If you want people to be able to send ETH to your contract, use this 
  receive() external payable {}
}
