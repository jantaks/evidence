import {
	initDB,
	setParquetURLs,
	updateSearchPath
} from '@evidence-dev/universal-sql/client-duckdb';
import { buildUrl } from '@evidence-dev/sdk/utils/svelte';

export async function initialize() {
	try {
		await initDB();
		const res = await fetch(buildUrl('/data/manifest.json')).then((r) => r.json());
		await setParquetURLs(res.renderedFiles ?? {});
		await updateSearchPath(Object.keys(res.renderedFiles ?? {}));
		if (!res.renderedFiles) console.error('No fixture data available!');
	} catch (e) {
		console.error('Failed to initialize USQL ', e);
	}
}
