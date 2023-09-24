// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract B3tter {
    // Mapping of IPFS hashes to file data
    mapping(string => bytes) private ipfsHashToData;
    // Mapping of IPFS hashes to encryption keys
    mapping(string => bytes32) private ipfsHashToEncryptionKey;

    // Mapping of IPFS hashes to access control data
    mapping(string => AccessControl) private ipfsHashToAccessControl;

    // Event to log file uploads
    event FileUploaded(string ipfsHash);
    // Event to log changes in access control
    event AccessControlChanged(string ipfsHash, address indexed newInsurance, address indexed newPhysician, address indexed newEmergencyContact);

    struct AccessControl {
        address insurance;
        address primaryCarePhysician;
        address emergencyContact;
    }

    /// @notice Uploads an encrypted file to IPFS with initial access control.
    /// @param ipfsHash The IPFS hash of the file.
    /// @param encryptedFile The encrypted file data.
    /// @param encryptionKey The encryption key for the file.
    /// @param insurance The insurance company's address.
    /// @param primaryCarePhysician The primary care physician's address.
    /// @param emergencyContact The emergency contact's address.
    function uploadEncryptedFile(
        string calldata ipfsHash,
        bytes calldata encryptedFile,
        bytes32 encryptionKey,
        address insurance,
        address primaryCarePhysician,
        address emergencyContact
    ) public {
        // Store the encrypted file data
        ipfsHashToData[ipfsHash] = encryptedFile;
        // Store the encryption key
        ipfsHashToEncryptionKey[ipfsHash] = encryptionKey;

        // Set the initial access control
        AccessControl storage accessControl = ipfsHashToAccessControl[ipfsHash];
        accessControl.insurance = insurance;
        accessControl.primaryCarePhysician = primaryCarePhysician;
        accessControl.emergencyContact = emergencyContact;

        emit FileUploaded(ipfsHash);
        emit AccessControlChanged(ipfsHash, insurance, primaryCarePhysician, emergencyContact);
    }

    /// @notice Downloads and decrypts a file from IPFS.
    /// @param ipfsHash The IPFS hash of the file.
    /// @return The decrypted file data.
    function downloadDecryptedFile(string calldata ipfsHash) public view returns (bytes memory) {
        // Retrieve the encrypted file data
        bytes memory encryptedFile = ipfsHashToData[ipfsHash];
        // Retrieve the encryption key
        bytes32 encryptionKey = ipfsHashToEncryptionKey[ipfsHash];
        // Verify access control (check sender's address against access control list)
        require(
            msg.sender == ipfsHashToAccessControl[ipfsHash].insurance ||
            msg.sender == ipfsHashToAccessControl[ipfsHash].primaryCarePhysician ||
            msg.sender == ipfsHashToAccessControl[ipfsHash].emergencyContact,
            "Access denied"
        );
        // Decrypt the file using XOR for demo
        // Supported by another layer of encryption in dapp backend logic with lit protocol
        bytes memory decryptedFile = decryptFile(encryptedFile, encryptionKey);
        return decryptedFile;
    }

    /// @notice Uploads file data to IPFS and returns the IPFS hash.
    /// @param ipfsHash The IPFS hash to be returned (used for demo).
    /// @param fileData The file data to be uploaded to IPFS.
    /// @return The IPFS hash.
    function uploadToIPFS(string calldata ipfsHash, bytes calldata fileData) internal pure returns (string memory) {
        // Return a dummy IPFS hash for demo
        return ipfsHash;
    }

    /// @notice Downloads file data from IPFS.
    /// @param ipfsHash The IPFS hash of the file to be downloaded.
    /// @return The file data downloaded from IPFS.
    function downloadFromIPFS(string calldata ipfsHash) internal pure returns (bytes memory) {
        // Return dummy file data for demo purposes.
        bytes memory file = bytes("This is an encrypted B3tter file from IPFS.");
        return file;
    }

    /// @notice Decrypts an encrypted file using XOR (for demo).
    /// @param encryptedFile The encrypted file data.
    /// @param encryptionKey The encryption key.
    /// @return The decrypted file data.
    function decryptFile(bytes memory encryptedFile, bytes32 encryptionKey) internal pure returns (bytes memory) {
        // XOR used as a simple encryption method
        bytes memory decryptedFile = new bytes(encryptedFile.length);
        for (uint256 i = 0; i < encryptedFile.length; i++) {
            decryptedFile[i] = bytes1(uint8(encryptedFile[i])) ^ bytes1(uint8(encryptionKey[i % 32]));
        }
        return decryptedFile;
    }
}

