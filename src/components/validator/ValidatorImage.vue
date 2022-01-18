<template>
    <div class="icon">
        <img :src="imageUrl" style="max-width: 100%;height: auto">
    </div>
</template>
<script>
export default {
    props: {
        identity: {
            type:String,
            default:''
        }
    },
    data() {
        return {
            imageUrl: ""
        }
    },
    mounted() {
        this.getKeyBaseImage()
    },
    methods: {
        async getKeyBaseImage() {
            const response = await this.axios.get(`https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${this.identity}&fields=pictures`)
            this.imageUrl = response.data.them[0].pictures.primary.url
        },
    }
}

</script>
