<template>
    <div class="filters">
        <pre>
            {{ appliedFilters }}
        </pre>
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
        ...mapState(['possibleFilters', 'appliedFilters']),
    },
};
</script>

<style lang="scss" scoped>
    .filters {
        position: sticky;
        top: 2rem;
    }
</style>
