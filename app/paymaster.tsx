import { IPaymaster, BiconomyPaymaster } from '@biconomy/paymaster-ts';

// B3tter Paymaster Implementation
// Allows B3tter uses to complete gasless transactions
// For Earning crypto, cashing out and sharing data
// Wallet funded by sponsors allows gasless user actvity
const paymaster: IPaymaster = new BiconomyPaymaster({
  paymasterUrl: 'https://paymaster.biconomy.io/api/v1/137/ddilZkuaZ.990e37a0-a2af-4df6-9cc0-55c9d9e7ac39', // you can get this value from biconomy dashboard. https://dashboard.biconomy.io
});
