// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

contract donut {
    uint256 public totalDonations;
    address public onion;

    struct donation {
        address Addr;
        string name;
        string message;
        uint256 donation;
    }
    
    donation[] private donations;

    constructor() {
        onion = payable(msg.sender);
    }

    function donate(string memory _message, string memory _name) external payable {
        totalDonations += 1;
        donations.push(donation(msg.sender, _name, _message, msg.value));
    }

    function withdraw() external onlyOnion {
        (bool success, ) = payable(onion).call{value: address(this).balance}("");
        require(success, "Only Onion");
    }

    function getDonations() external view returns (donation[] memory) {
        return donations;
    }
    modifier onlyOnion() {
        require(msg.sender == onion);
        _;
    }
    receive() external payable {
    }
}

