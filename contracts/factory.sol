// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "./momo.sol";

contract factory{

    struct deployedContract {
        address contractAddress;
        address owner;
    }

    deployedContract[] private deployedContracts;
    
    function createContract() external {
        // require(deployedContracts[msg.sender] == address(0), "Contract already deployed");
        address newContract = address(new momo(msg.sender));
        allDeployedContracts.push(deployedContract(newContract, msg.sender));
    }

    function getDeployedContract() external view returns (address) {
        return deployedContracts[msg.sender];
    }

    function allDeployedContracts(address _address) external view returns (address) {
        return deployedContracts[_address];
    }
}