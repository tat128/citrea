// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BTCVault {
    mapping(address => uint256) public balances;
    address public bridge;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    
    modifier onlyBridge() {
        require(msg.sender == bridge, "Only bridge can call");
        _;
    }

    constructor(address _bridge) {
        bridge = _bridge;
    }

    // Called by bridge when BTC is locked on Bitcoin
    function deposit(address user, uint256 amount) external onlyBridge {
        balances[user] += amount;
        emit Deposit(user, amount);
    }

    // Called by bridge when BTC is released on Bitcoin
    function withdraw(address user, uint256 amount) external onlyBridge {
        require(balances[user] >= amount, "Insufficient balance");
        balances[user] -= amount;
        emit Withdraw(user, amount);
    }
} 