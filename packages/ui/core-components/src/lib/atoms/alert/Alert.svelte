<script context="module">
	export const evidenceInclude = true;
</script>

<script>
	// Based on the alert from FlowBite: https://flowbite.com/docs/components/alerts/
	/**
	 * Defines the color of the alert
	 * @type {"default" | "info" | "danger" | "success" | "warning"}
	 */
	export let status = 'default';
</script>

<div class="alert {status}" role="alert">
	<div>
		<slot />
	</div>
</div>

<style lang="postcss">
	.alert {
		@apply p-2 mb-4 rounded text-gray-800 bg-gray-50 top-14;

		&.info {
			@apply text-blue-800 bg-blue-50;
		}
		&.danger {
			@apply text-red-800 bg-red-50;
		}
		&.success {
			@apply text-green-800 bg-green-50;
		}
		&.warning {
			@apply text-yellow-800 bg-yellow-50;
		}

		& :global(p) {
			@apply mb-0;
		}
	}
</style>
