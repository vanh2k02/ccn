<template>
    <div class="modal-body">
        <div class="content-stake">
            <div class="title-popup-stake">Redelegate</div>
            <div class="form-token">
                <div class="form-group">
                    <div class="dropdown"><a :class="{'js-link active':dropdown,'js-link':!dropdown}" href="#"
                                             @click="clickDropdown()">Select validator from<i
                        class="fa fa-angle-down"></i></a>
                        <ul class="js-dropdown-list" :style="{display: style}">
                            <li>
                                <div class="item-stake">
                                    <div class="icon"></div>
                                    <div class="name">Bro_n_Bro</div>
                                </div>
                            </li>
                            <li>
                                <div class="item-stake">
                                    <div class="icon"></div>
                                    <div class="name">Bro_n_Bro</div>
                                </div>
                            </li>
                            <li>
                                <div class="item-stake">
                                    <div class="icon"></div>
                                    <div class="name">Bro_n_Bro</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group">
                    <div class="dropdown"><a :class="{'js-link active':dropdown,'js-link':!dropdown}" href="#"
                                             @click="clickDropdown2">Select validator to<i class="fa fa-angle-down"></i></a>
                        <ul class="js-dropdown-lists" :style="{display: style2}">
                            <li>
                                <div class="item-stake">
                                    <div class="icon"></div>
                                    <div class="name">Bro_n_Bro</div>
                                </div>
                            </li>
                            <li>
                                <div class="item-stake">
                                    <div class="icon"></div>
                                    <div class="name">Bro_n_Bro</div>
                                </div>
                            </li>
                            <li>
                                <div class="item-stake">
                                    <div class="icon"></div>
                                    <div class="name">Bro_n_Bro</div>
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
    name: "ModalRelegate",
    data: function () {
        return {
            dropdown: false,
            dropdown2: false,
            style: 'none',
            style2: 'none'
        }
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
        },
        clickDropdown2() {
            if (this.dropdown2 === true) {
                this.style2 = 'none'
                this.dropdown2 = false
            } else {
                this.style2 = 'block'
                this.dropdown2 = true
            }
        }
    }
}
</script>

<style scoped>

</style>
