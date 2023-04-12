<script lang="ts">
    import type {LayoutData} from './$types';
    import PageTransition from "../../lib/components/PageTransition.svelte";

    export let data: LayoutData;
</script>

<PageTransition pathname={data.pathname}>
    <slot/>
</PageTransition>
