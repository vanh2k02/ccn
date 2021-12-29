import {QueryClient, setupDistributionExtension, setupGovExtension} from "@cosmjs/stargate";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {setupStakingExtension} from "@cosmjs/stargate/build/queries/staking";
import {setupBankExtension} from "@cosmjs/stargate/build/queries/bank";

const endpoint = process.env.VUE_APP_END_POINT
export class WalletHelper {
    constructor(queryClient = null) {
        this.queryClient = queryClient
    }

    static async connect() {
        const tmClient = await Tendermint34Client.connect(endpoint)
        const queryClient = new QueryClient(tmClient)
        return new WalletHelper(queryClient)
    }

    getQueryClient() {
        return this.queryClient
    }

    getGovExtension() {
        return setupGovExtension(this.getQueryClient())
    }

    getStakingExtension() {
        return setupStakingExtension(this.getQueryClient())
    }

    getDistributionExtension() {
        return setupDistributionExtension(this.getQueryClient())
    }

    getBankExtension() {
        return setupBankExtension(this.getQueryClient())
    }

    async getListProposal() {
        return await this.getGovExtension().gov.proposals(0, "", "")
    }

    async getDetailProposal(proposalId) {
        return await this.getGovExtension().gov.proposal(proposalId)
    }

    async getValidators(status) {
        return await this.getStakingExtension().staking.validators(status)
    }

    async getDetailValidator(status) {
        return await this.getStakingExtension().staking.validator(status)
    }

    async getRewards(addressValidations) {
        return await this.getDistributionExtension().distribution.delegationTotalRewards(addressValidations)
    }

    async getBalances(addressValidations) {
        return await this.getBankExtension().bank.allBalances(addressValidations)
    }

    async getUnbonding(addressValidations) {
        return await this.getStakingExtension().staking.delegatorUnbondingDelegations(addressValidations)
    }

    async getDelegation(addressValidations) {
        return await this.getStakingExtension().staking.delegatorDelegations(addressValidations)
    }
    async getStakedValidators(addressValidations){
        return await this.getStakingExtension().staking.delegatorValidators(addressValidations)
    }
}
