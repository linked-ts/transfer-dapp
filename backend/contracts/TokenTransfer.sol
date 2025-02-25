// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract TokenTransfer {
    event EthTransferred(address indexed sender, address indexed receiver, uint256 amount);
    event TokenTransferred(address indexed sender, address indexed receiver, address indexed token, uint256 amount);

    function sendETH(address payable _to) external payable {
        require(msg.value > 0, "Send some ETH");
        (bool success, ) = _to.call{value: msg.value}("");
        require(success, "ETH transfer failed");
        emit EthTransferred(msg.sender, _to, msg.value);
    }

    function sendTokens(address _token, address _to, uint256 _amount) external {
        IERC20 token = IERC20(_token);
        require(token.balanceOf(msg.sender) >= _amount, "Insufficient token balance");
        require(token.transfer(_to, _amount), "Token transfer failed");
        emit TokenTransferred(msg.sender, _to, _token, _amount);
    }

    receive() external payable {}
}