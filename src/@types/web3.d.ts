// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Web3 from 'web3';

declare module 'web3' {
  export class Contract {
    constructor(jsonInterface: AbiItem[], address?: string, options?: ContractOptions);

    static setProvider(provider: provider, accounts?: Accounts): void;

    defaultAccount: string | null;

    defaultBlock: BlockNumber;

    defaultCommon: Common;

    defaultHardfork: hardfork;

    defaultChain: chain;

    transactionPollingTimeout: number;

    transactionConfirmationBlocks: number;

    transactionBlockTimeout: number;

    handleRevert: boolean;

    options: Options;

    clone(): Contract;

    deploy(options: DeployOptions): ContractSendMethod;

    methods: any;

    once(event: string, callback: (error: Error, event: EventData) => void): void;

    once(
      event: string,
      options: EventOptions,
      callback: (error: Error, event: EventData) => void
    ): void;

    events: any;

    getPastEvents(event: string): Promise<EventData[]>;

    getPastEvents(
      event: string,
      options: PastEventOptions,
      callback: (error: Error, events: EventData[]) => void
    ): Promise<EventData[]>;

    getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;

    getPastEvents(
      event: string,
      callback: (error: Error, events: EventData[]) => void
    ): Promise<EventData[]>;
  }
}
