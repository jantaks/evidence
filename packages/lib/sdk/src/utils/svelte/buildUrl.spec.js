import { describe, expect, it, vi } from 'vitest';
/** @type {undefined | string} */
let basePath = undefined;

vi.mock('$evidence/config', () => ({
	config: {
		deployment: {
			get basePath() {
				return basePath;
			}
		}
	}
}));
import { buildUrl } from './buildUrl.js';
describe('buildUrl', () => {
	it('should return path if basePath is not set', () => {
		basePath = undefined;
		expect(buildUrl('/test')).toBe('/test');
	});
	it('should return path with basePath if basePath is set', () => {
		basePath = '/base';
		expect(buildUrl('/test')).toBe('/base/test');
	});
	it('should leave absolute paths as is', () => {
		basePath = '/base';
		expect(buildUrl('https://example.com/test')).toBe('https://example.com/test');
	});
	it('should always delimit with only one /', () => {
		basePath = '/base/';
		expect(buildUrl('/test')).toBe('/base/test');
	});
	it('should always start with /', () => {
		basePath = 'base';
		expect(buildUrl('/test')).toBe('/base/test');
	});
	it('should pass through undefined', () => {
		basePath = '/base';
		expect(buildUrl(undefined)).toBe(undefined);
	});
	it('should not double up the base path', () => {
		basePath = '/base';
		expect(buildUrl('/base/test')).toBe('/base/test');
	});
	it('should leave links untouched when in dev mode', () => {
		const prevDev = import.meta.env.DEV;
		const prevMode = import.meta.env.MODE;
		import.meta.env.DEV = false;
		import.meta.env.MODE = 'build';
		basePath = '/base';
		expect(buildUrl('/test')).toBe('/base/test');
		import.meta.env.DEV = prevDev;
		import.meta.env.MODE = prevMode;
	});
});
