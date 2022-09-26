// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract etherWallet {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    fallback() external payable {}

    modifier onlyOwner() {
        require(msg.sender == owner, "Sorry You are not the owner");
        _;
    }
    

    function withdraw(uint _amount) external onlyOwner {
        //require(msg.sender == owner, "Sorry You are not the owner");
        owner.transfer(_amount);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
     
    
        
    

}