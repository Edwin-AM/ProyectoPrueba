<template>
    <div class="breadcrumb flex items-end border-b border-gray-300 pb-4 mb-6">
        <ul>
            <li
                class="border-gray-400 inline pr-2 dark:text-gray-400"
                v-for="(breadcrumb, idx) in breadcrumbList"
                :key="idx"
                @click="routeTo(idx)"
                :class="{ linked: !!breadcrumb.link }"
            >
                {{ breadcrumb.name }}>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumb',
    data() {
        return {
            breadcrumbList: [],
        }
    },
    mounted() {
        this.updateList()
    },
    watch: {
        $route() {
            this.updateList()
        },
    },
    methods: {
        routeTo(pRouteTo) {
            if (this.breadcrumbList[pRouteTo].link)
                this.$router.push(this.breadcrumbList[pRouteTo].link)
        },
        updateList() {
            this.breadcrumbList = this.$route.meta.breadcrumb
        },
    },
}
</script>

<style>
.linked {
    cursor: pointer;
    font-size: 1em;
    font-weight: normal;
}
</style>

<!--<script setup>
const props = defineProps({
    parentTitle: String,
    subParentTitle: String
})
</script>

<template>
    <div class="breadcrumb flex items-end border-b border-gray-300 pb-4 mb-6">
        <ul>
            <li class="border-r border-gray-400 inline pr-2 dark:text-gray-400"><a class="hover:text-gray-800" href=""> {{ props.parentTitle }}</a></li>
            <li class="inline pl-2 dark:text-gray-400"> {{ props.subParentTitle }}</li>
        </ul>
    </div>
</template>-->



