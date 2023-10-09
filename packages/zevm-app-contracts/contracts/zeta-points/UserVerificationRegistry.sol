// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract UserVerificationRegistry {
    // Records the timestamp when a particular user gets verified.
    mapping(address => uint256) public userVerificationTimestamps;

    event UserVerified(address indexed userAddress, uint256 verifiedAt);

    function markAsVerified() external {
        userVerificationTimestamps[msg.sender] = block.timestamp;
        emit UserVerified(msg.sender, block.timestamp);
    }

    function hasBeenVerified(address userAddress) external view returns (bool) {
        return userVerificationTimestamps[userAddress] > 0;
    }

    function getLastVerifiedTimestamp(address userAddress) external view returns (uint256) {
        return userVerificationTimestamps[userAddress];
    }
}