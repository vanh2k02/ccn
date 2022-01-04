import {
    SigningStargateClient
} from "@cosmjs/stargate";
const chainId = process.env.VUE_APP_CHAIN_ID;
const coinDenom = process.env.VUE_APP_DENOM;
const coinMinimalDenom = process.env.VUE_APP_COIN_MINIMAL_DENOM;
const prefix = process.env.VUE_APP_PREFIX;
export class KelprWallet {
    constructor (client = null) {
        this.client = client
    }
    static async connectWallet() {
        if (!window.getOfflineSigner || !window.keplr) {
            throw new Error("Please install keplr extension")
        } else {
            if (window.keplr.experimentalSuggestChain) {
                try {
                    await window.keplr.experimentalSuggestChain({
                        chainId: chainId,
                        chainName: 'Secret Testnet',
                        rpc: process.env.VUE_APP_RPC,
                        rest: process.env.VUE_APP_REST,
                        bip44: {
                            coinType: 529,
                        },
                        coinType: 529,
                        stakeCurrency: {
                            coinDenom: coinDenom,
                            coinMinimalDenom: coinMinimalDenom,
                            coinDecimals: 6,
                        },
                        bech32Config: {
                            bech32PrefixAccAddr: prefix,
                            bech32PrefixAccPub: `${prefix}pub`,
                            bech32PrefixValAddr: `${prefix}valoper`,
                            bech32PrefixValPub: `${prefix}valoperpub`,
                            bech32PrefixConsAddr: `${prefix}valcons`,
                            bech32PrefixConsPub: `${prefix}valconspub`,
                        },
                        currencies: [
                            {
                                coinDenom: coinDenom,
                                coinMinimalDenom: coinMinimalDenom,
                                coinDecimals: 6,
                            },
                        ],
                        feeCurrencies: [
                            {
                                coinDenom: coinDenom,
                                coinMinimalDenom: coinMinimalDenom,
                                coinDecimals: 6,
                            },
                        ],
                        gasPriceStep: {
                            low: 0.1,
                            average: 0.25,
                            high: 0.4,
                        },
                        features: ['secretwasm'],
                    });
                    await window.keplr.enable(chainId);

                    // @ts-ignore
                    const keplrOfflineSigner = window.getOfflineSigner(chainId);
                    const accounts = await keplrOfflineSigner.getAccounts();
                    
                    const address = accounts[0].address;
                    setAddress(address);
                } catch (error) {
                    throw new Error(error.message)
                }
            } else {
                throw new Error("Please use the recent version of keplr extension")
            }
        }
    }

    static getKeplrWallet(){
        const keplrOfflineSigner = window.getOfflineSigner(chainId);
        const client =  SigningStargateClient.connectWithSigner(
                        process.env.VUE_APP_REST,
                        keplrOfflineSigner,
                    );
        const keplrWallet = new KelprWallet(client)
        return keplrWallet
    }

    getClient() {
        return this.client
    }

    static setAddress(address) {
        return localStorage.setItem("address", address);
    }

    static getAddress() {
        return localStorage.getItem("address", "");
    }

    async delegateTokens(delegatorAddress, validatorAddress, amount, fee, memo = "") {
        return await this.getClient().delegateTokens(delegatorAddress, validatorAddress, amount, fee, memo)
    }
}

