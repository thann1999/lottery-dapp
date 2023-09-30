import Web3 from 'web3';

import { ChainId } from '@root/constants';

import { web3 } from '../web3';

const SEPOLIA_ADDRESS = '0xD00EdCC5d830615A3e2fa1185835E36C6621b5f6';
const LINEA_ADDRESS = '0x75EbF3e59f8F7A1B9E8796DCdf92A0A8bcED838d';

const ABI = [
  {
    inputs: [],
    name: 'enter',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pickWinner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'getPlayers',
    outputs: [
      {
        internalType: 'address payable[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'players',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as any;

const contract: Record<number, any> = {
  [ChainId.Sepolia]: new web3.eth.Contract(ABI, SEPOLIA_ADDRESS),
  [ChainId.Linea]: new web3.eth.Contract(ABI, LINEA_ADDRESS),
};

export default contract;
