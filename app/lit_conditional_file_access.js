import { LitJsSdk, LitNodeClient } from "@lit-protocol/lit-node-client";
import { LitAction } from "@lit-protocol/lit-actions";
import { TLSNotary } from "@tlsnotary/rust";

const litJsSdk = new LitJsSdk();
const litNodeClient = new LitNodeClient();
const tlsNotary = new TLSNotary();

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

// Prove that you visited a particular website using TLS Notary.
const proofOfVisit = await tlsNotary.proveVisit("https://example.com");

// Add the proof of visit to the Lit Access Control Condition.
thirdPartyAgreementAccessControlCondition.proofOfVisit = proofOfVisit;

// Encrypt the IPFS object using the Lit Node SDK.
const encryptedIPFSObject = await litNodeClient.encrypt(ipfsHash, thirdPartyAgreementAccessControlCondition);

// Store the encrypted IPFS object and the Lit Access Control Condition on IPFS.
const encryptedIPFSObjectIpfsHash = await litNodeClient.saveFile(encryptedIPFSObject);
const accessControlConditionIpfsHash = await litNodeClient.saveFile(thirdPartyAgreementAccessControlCondition);

// Share the IPFS hash of the encrypted IPFS object with the third parties.

// When a third party wants to access the IPFS object or make changes to it, they will need to:
// 1. Get an AuthSig from the Lit Node SDK.
// 2. Decrypt the IPFS object using the Lit Node SDK.

// Get an AuthSig from the Lit Node SDK for accessing the updated IPFS object.
const authSigForAccessingUpdatedObject = await litNodeClient.getAuthSig();

// Decrypt the updated IPFS object using the Lit Node SDK.
const decryptedUpdatedIPFSObject = await litNodeClient.decrypt(
  updatedEncryptedIPFSObjectIpfsHash,
  authSigForAccessingUpdatedObject
);
