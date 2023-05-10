<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/admin/recipients" on:click={drawerClose}>Recipients</a></li>
		<li><a href="/admin/gdt" on:click={drawerClose}>GDT</a></li>
		<li><a href="/admin/email" on:click={drawerClose}>Email</a></li>
		<li><a href="/admin/validate" on:click={drawerClose}>Validate</a></li>
	</ul>
</nav>
