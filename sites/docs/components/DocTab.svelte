<script>
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	let activeTab = 'preview';

	const tabs = ['preview', 'code'];
	let tabButtons = [];

	function setTab(tab, index) {
		activeTab = tab;
		updateActiveBorder(index);
	}

	const [send, receive] = crossfade({
		duration: 200,
		easing: cubicInOut
	});
</script>

<div class="doc-tab mt-2">
	<div class="flex justify-end">
		<div class="flex gap-1 bg-gray-100 rounded-md p-1 shadow-inner">
			{#each tabs as tab, index}
				<div class="relative">
					<button
						class="relative z-10 py-1 px-2 transition-colors duration-300 text-xs font-medium ease-in-out capitalize tracking-wide focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 rounded-md hover:text-gray-950 {activeTab ===
						tab
							? 'text-gray-950'
							: 'text-gray-600'}"
						on:click={() => setTab(tab, index)}
						bind:this={tabButtons[index]}
					>
						{tab}
					</button>
					{#if activeTab === tab}
						<div
							class="absolute bottom-0 left-0 w-full h-full rounded border bg-white shadow-sm z-0"
							in:send={{ key: 'trigger' }}
							out:receive={{ key: 'trigger' }}
						/>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- Preview and code tabs -->
	<div>
		<div
			class={activeTab !== 'preview' ? 'h-[0px]' : 'mb-3 mt-2'}
			class:invisible={activeTab !== 'preview'}
		>
			<slot name="preview" />
		</div>
		<div
			class="overflow-auto md-preview {activeTab !== 'code' ? 'h-[0px]' : 'mt-2'}"
			class:invisible={activeTab !== 'code'}
		>
			<slot />
		</div>
	</div>
</div>

<style>
	/* Styles codeblocks inside doctabs */
	:global(.md-preview > div:first-of-type) {
		margin: 0;
	}
</style>
