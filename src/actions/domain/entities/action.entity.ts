export interface StockAction {
	id: string;
	symbol: string;
	date: Date;
	open: number;
	high: number;
	low: number;
	close: number;
}
