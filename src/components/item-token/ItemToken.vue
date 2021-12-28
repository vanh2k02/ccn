<template>
    <div>
        <div class="title">{{ title }}</div>
        <div class="number">{{ count }}</div>
    </div>

</template>

<script>
export default {
    name: "ItemToken",
    props: {
        title: String,
        count: String
    }
}
</script>

<style scoped>

</style>
