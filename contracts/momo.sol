// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

contract momo {
    address payable onion;
    mapping(address => uint256) public donations;
    mapping(address => string) public messages;
    

    constructor(address _onion) {
        onion = payable(_onion);
    }

    // @dev Donate to the contract
    // @param _message Message to be stored
    function donate(string _message) external payable {
        donations[msg.sender] += msg.value;
        messages[msg.sender] = _message;
    }

    function withdraw() external onlyOnion {
        (bool success, ) = onion.call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }

    modifier onlyOnion() {
        require(msg.sender == onion);
        _;

    }

    receive() external payable {

    }
}