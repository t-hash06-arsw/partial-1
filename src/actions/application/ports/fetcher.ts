import { StockAction } from '@actions/domain/entities/action.entity';

export type TimeInterval = '1min' | '5min' | '15min' | '30min' | '60min';

export abstract class StockActionsFetcherPort {
	abstract fetchIntradayActions(
		symbol: string,
		interval?: TimeInterval,
		month?: string,
	): Promise<StockAction[]>;

	abstract fetchDailyActions(symbol: string): Promise<StockAction[]>;

	abstract fetchWeeklyActions(symbol: string): Promise<StockAction[]>;

	abstract fetchMonthlyActions(symbol: string): Promise<StockAction[]>;
}
