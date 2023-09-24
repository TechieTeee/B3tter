import { LitJsSdk, LitNodeClient } from "@lit-protocol/lit-node-client";
import { LitAction } from "@lit-protocol/lit-actions";

const litJsSdk = new LitJsSdk();
const litNodeClient = new LitNodeClient();

// Create a Lit Action that checks if 2/3 of the third parties have agreed to access the IPFS object or make changes to it.
const isThirdPartyAgreementMetAction: LitAction = async (thirdPartyAddresses: string[]): Promise<boolean> => {
  // Get the number of third parties who have agreed to access the IPFS object or make changes to it.
  const numberOfThirdPartyAgreements = thirdPartyAddresses.filter((address) => litJsSdk.checkAgreement(address)).length;

  // Return true if 2/3 of the third parties have agreed to access the IPFS object or make changes to it.
  return numberOfThirdPartyAgreements >= (thirdPartyAddresses.length * 2) / 3;
};

// Create a Lit Access Control Condition that requires the Lit Action to return true in order to grant access to the IPFS object or make changes to it.
const thirdPartyAgreementAccessControlCondition = litJsSdk.createAccessControlCondition({
  action: isThirdPartyAgreementMetAction,
});

// Encrypt the IPFS object using the Lit Node SDK.
const encryptedIPFSObject = await litNodeClient.encrypt(ipfsHash, thirdPartyAgreementAccessControlCondition);

// Store the encrypted IPFS object and the Lit Access Control Condition on IPFS.
const encryptedIPFSObjectIpfsHash = await litNodeClient.saveFile(encryptedIPFSObject);
const accessControlConditionIpfsHash = await litNodeClient.saveFile(thirdPartyAgreementAccessControlCondition);

// Share the IPFS hash of the encrypted IPFS object with the third parties.

// When a third party wants to access the IPFS object or make changes to it, they will need to:
// 1. Get an AuthSig from the Lit Node SDK.
// 2. Decrypt the IPFS object using the Lit Node SDK.

// Get an AuthSig from the Lit Node SDK.
const authSig = await litNodeClient.getAuthSig();

// Decrypt the IPFS object using the Lit Node SDK.
const decryptedIPFSObject = await litNodeClient.decrypt(encryptedIPFSObjectIpfsHash, authSig);

// The decrypted IPFS object can now be accessed or modified.

// Here is an example of how to use the code above:

// Get the IPFS hash of the IPFS object that you want to protect.
const ipfsHash = "QmYbcCwzLBraGmgoyTKoGHyYRGHYPJi9sAsmuT4XLtNWCA";

// Get the addresses of the third parties who will have access to the IPFS object.
const thirdPartyAddresses = ["0x9D1a5EC58232A894eBFcB5e466E3075b23101B89", "0x50e2dac5e78B5905CB09495547452cEE64426db2", "0x1234567890abcdef1234567890abcdef12345678"];

// Encrypt the IPFS object and store the encrypted IPFS object and the Lit Access Control Condition on IPFS.
const encryptedIPFSObjectIpfsHash = await litNodeClient.encrypt(ipfsHash, thirdPartyAgreementAccessControlCondition);
const accessControlConditionIpfsHash = await litNodeClient.saveFile(thirdPartyAgreementAccessControlCondition);

// Share the IPFS hash of the encrypted IPFS object with the third parties.

// When a third party wants to access the IPFS object or make changes to it, they will need to:

// Get an AuthSig from the Lit Node SDK.
const authSig = await litNodeClient.getAuthSig();

// Decrypt the IPFS object using the Lit Node SDK.
const decryptedIPFSObject = await litNodeClient.decrypt(encryptedIPFSObjectIpfsHash, authSig);

// The decrypted IPFS object can now be accessed or modified.

// If you need to make changes to the IPFS object, you will need to:
// 1. Get an AuthSig from the Lit Node SDK.
// 2. Modify the IPFS object as needed.
// 3. Encrypt the modified IPFS object using the Lit Node SDK.

// Get an AuthSig from the Lit Node SDK.
const authSigForModification = await litNodeClient.getAuthSig();

// Modify the IPFS object (for example, update its content).
const modifiedIPFSObject = {
  // Your modified IPFS object data here...
};

// Encrypt the modified IPFS object using the Lit Node SDK.
const encryptedModifiedIPFSObject = await litNodeClient.encrypt(
  JSON.stringify(modifiedIPFSObject),
  thirdPartyAgreementAccessControlCondition
);

// Store the updated encrypted IPFS object on IPFS.
const updatedEncryptedIPFSObjectIpfsHash = await litNodeClient.saveFile(encryptedModifiedIPFSObject);

// Share the IPFS hash of the updated encrypted IPFS object with the third parties.

// When a third party wants to access the updated IPFS object, they will need to:
// 1. Get an AuthSig from the Lit Node SDK.
// 2. Decrypt the updated IPFS object using the Lit Node SDK.

// Get an AuthSig from the Lit Node SDK for accessing the updated IPFS object.
const authSigForAccessingUpdatedObject = await litNodeClient.getAuthSig();

// Decrypt the updated IPFS object using the Lit Node SDK.
const decryptedUpdatedIPFSObject = await litNodeClient.decrypt(
  updatedEncryptedIPFSObjectIpfsHash,
  authSigForAccessingUpdatedObject
);
