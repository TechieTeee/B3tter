// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract BurnableWallet {

    // Mapping of wallet addresses to expiration times
    mapping(address => uint256) public walletToExpirationTime;

    constructor() {}

    /// @notice Creates a new burnable wallet address.
    /// @return The address of the new wallet.
    function createWallet() public returns (address) {
        // Create a new wallet address.
        address walletAddress = msg.sender;

        // Set the expiration time for the wallet.
        walletToExpirationTime[walletAddress] = block.timestamp + 24 hours;

        // Return the address of the new wallet.
        return walletAddress;
    }

    /// @notice Burns the given wallet address.
    /// @param walletAddress The address of the wallet to burn.
    function burnWallet(address walletAddress) public {
        // Verify that the wallet address exists.
        require(walletToExpirationTime[walletAddress] > 0, "Wallet address does not exist.");

        // Verify that the wallet has not expired.
        require(block.timestamp < walletToExpirationTime[walletAddress], "Wallet has expired.");

        // Delete the wallet information from the contract.
        delete walletToExpirationTime[walletAddress];
    }

    /// @notice Checks if the given wallet address is valid.
    /// @param walletAddress The address of the wallet to check.
    /// @return True if the wallet address is valid, false otherwise.
    function isValidWallet(address walletAddress) public view returns (bool) {
        return walletToExpirationTime[walletAddress] > 0 && block.timestamp < walletToExpirationTime[walletAddress];
    }
}
