<template>
    <div class="filters">
        <g-box v-for="filter in possibleFilters"
               :key="filter.key">
            <component :filter="filter" :is="`filter-${filter.type}`"/>
        </g-box>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['possibleFilters']),
    },
};
</script>

<style lang="scss" scoped>
    .filters {
        position: sticky;
        top: $header-height + $gutter;
    }
</style>
