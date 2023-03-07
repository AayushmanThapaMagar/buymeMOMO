// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "./momo.sol";

contract factory{
    mapping (address => mapping(string => address)) public donationContracts;
    
    function createContract(string memory _name) external {
        address newContract = address(new momo(msg.sender));
        donationContracts[msg.sender][_name] = newContract;
    }

    function getDeployedContract(address _ownerAddress, string memory_name) external view returns (address) {
        return donationContracts[_ownerAddress][_name];
    }
}