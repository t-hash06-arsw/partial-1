export class SymbolNotFoundError extends Error {
	constructor(symbol: string) {
		super(`Symbol ${symbol} not found`);
		this.name = 'SymbolNotFoundError';
	}
}
