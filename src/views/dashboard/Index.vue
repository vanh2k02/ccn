<template>
    <div class="content-wallet">
        <div class="row">
            <Login />
            <div class="col-md-7 float-left">
                <div class="content-wall-left">
                    <div class="blocks-status">
                        <div class="status-items" v-for="(itemToken,index) in itemTokens" :key="index">
                            <ItemToken :title="itemToken.title" :count="itemToken.count"/>
                            <div class="list-link"><a href="#" v-for="(item,idx) in itemToken.function"
                                                        :key="idx" :class="item.class">{{
                                    item.titleFunction
                                }}</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-validate-detail">
            <div class="row">
                <div class="col-md-7">
                    <div class="cnt-wallet-left">
                        <div class="cnt-validator">
                            <div class="title-vali">
                                <div class="title title-tab">
                                    <ul>
                                        <li :class="activeClass('allValidators')"><a href="javascript:void(0)" @click="setActiveTab('allValidators')">All Validators</a></li>
                                        <li :class="activeClass('stakedValidators')"><a href="javascript:void(0)" @click="setActiveTab('stakedValidators')">Staked Validators</a></li>
                                    </ul>
                                </div>
                                <div class="link-see-all">See all ></div>
                            </div>
                            <div class="content-tab-vali">
                                <div class="content-tab" id="allvali" v-show="activeClass('allValidators') == 'active'">
                                    <div class="content-detail">
                                        <div class="cos-table-list">
                                            <div class="table-responsive">
                                                <table
                                                    class="table table-striped table-bordered table-hover text-center">
                                                    <thead>
                                                        <tr>
                                                            <th>Validator</th>
                                                            <th>Status</th>
                                                            <th>Voting Power</th>
                                                            <th>Commission</th>
                                                            <th>Tokens Staked</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="validator in allValidators" :key="validator">
                                                            <td>
                                                                <div class="td-acount">
                                                                    <div class="icon"></div>
                                                                    <span>{{ validator.validator }}</span>
                                                                </div>
                                                            </td>
                                                            <td><span class="status">{{validator.status}}</span>
                                                            </td>
                                                            <td>{{ validator.voting }}</td>
                                                            <td>{{ validator.commission }}</td>
                                                            <td>{{ validator.tokenStaked }}</td>
                                                            <td><a href="#">{{ validator.action }}</a></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content-tab" id="staked" v-show="activeClass('stakedValidators') == 'active'">
                                    <div class="content-detail">
                                        <div class="cos-table-list">
                                            <div class="table-responsive">
                                                <table
                                                    class="table table-striped table-bordered table-hover text-center">
                                                    <thead>
                                                        <tr>
                                                            <th>Validator</th>
                                                            <th>Status</th>
                                                            <th>Voting Power</th>
                                                            <th>Commission</th>
                                                            <th>Tokens Staked</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div class="td-acount">
                                                                    <div class="icon"></div>
                                                                    <span>Bro_n_Bro</span>
                                                                </div>
                                                            </td>
                                                            <td><span class="status">Active</span></td>
                                                            <td>78,233.10</td>
                                                            <td>5%</td>
                                                            <td>N/A</td>
                                                            <td><a href="#">DELEGATE</a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="td-acount">
                                                                    <div class="icon"></div>
                                                                    <span>Bro_n_Bro</span>
                                                                </div>
                                                            </td>
                                                            <td><span class="status">Active</span></td>
                                                            <td>78,233.10</td>
                                                            <td>5%</td>
                                                            <td>N/A</td>
                                                            <td><a href="#">DELEGATE</a></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="cnt-wallet-right">
                        <div class="cnt-validator">
                            <div class="title-vali">
                                <div class="title top-ac">Top Active Proposals</div>
                                <div class="link-see-all">See all ></div>
                            </div>
                            <div class="content-detail-vali">
                                <ul>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ItemToken from "@/components/item-token/ItemToken";
import {defaultItemToken, accountValidators} from "@/utils/config";
import Login from "@/components/login/Login";

export default {
    name: "Dashboard",
    components: {Login, ItemToken},
    data: function () {
        return {
            itemTokens: defaultItemToken,
            allValidators: accountValidators,
            activeTab: "allValidators",
        }
    },
    methods: {
        setActiveTab(tabId) {
            this.activeTab = tabId
        },
        activeClass(tabId){
            if (tabId == this.activeTab) {
                return 'active'
            } 
            return ''
        }
    }
}
</script>

<style scoped>

</style>
