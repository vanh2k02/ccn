<template>
    <div class="modal-body">
        <div class="content-stake">
            <div class="title-popup-stake">Undelegate</div>
            <div class="form-token">
                <div class="form-group">
                    <div class="dropdown"><a :class="{'js-link active':dropdown,'js-link':!dropdown}" href="#"
                                             @click="clickDropdown()">Select validator<i
                        class="fa fa-angle-down"></i></a>
                        <ul class="js-dropdown-list" :style="{display: style}">
                            <li v-for="(stakedValidator,index) in stakedValidators" :key="index">
                                <div class="item-stake">
                                    <div class="icon"></div>
                                    <div class="name">{{ stakedValidator.description.moniker }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group">
                    <input class="form-control" type="password" required="" name="pass"
                           placeholder="Enter tokens to Stake"/>
                    <div class="text-max">Max</div>
                </div>
                <div class="form-group">
                    <div class="text-form"><span class="text">Max Available tokens:</span><span class="number">0</span>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-vote">STAKE</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalUndelegate",
    data: function () {
        return {
            dropdown: false,
            style: 'none'
        }
    },
    props: {
        stakedValidators: Array
    },
    methods: {
        clickDropdown() {
            if (this.dropdown === true) {
                this.style = 'none'
                this.dropdown = false
            } else {
                this.style = 'block'
                this.dropdown = true
            }
        }
    }
}
</script>

<style scoped>

</style>
