// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

contract momo {
    uint256 public totalDonations;
    address public owner;

    struct donation {
        address Addr;
        string name;
        string message;
        uint256 donation;
    }
    
    donation[] private donations;

    constructor(address _owner) {
        owner = payable(_owner);
    }

    function donate(string memory _message, string memory _name) external payable {
        totalDonations += 1;
        donations.push(donation(msg.sender, _name, _message, msg.value));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = payable(owner).call{value: address(this).balance}("");
        require(success, "Not Owner");
    }

    function getDonations() external view returns (donation[] memory) {
        return donations;
    }
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    receive() external payable {
    }
}

