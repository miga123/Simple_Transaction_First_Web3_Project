// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract FundMe {
    function fund() public payable  {

        
        require(msg.value > 1e18, "Didn't send enought!");  // 1e18 == 1 * 10 ** 18
        
    }

}
