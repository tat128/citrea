// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SocialProfile {
    struct Profile {
        string username;
        string bio;
    }

    mapping(address => Profile) public profiles;

    event ProfileUpdated(address indexed user, string username, string bio);

    function setProfile(string calldata username, string calldata bio) external {
        profiles[msg.sender] = Profile(username, bio);
        emit ProfileUpdated(msg.sender, username, bio);
    }

    function getProfile(address user) external view returns (string memory, string memory) {
        Profile storage p = profiles[user];
        return (p.username, p.bio);
    }
} 