import {
	StockActionsFetcherPort,
	TimeInterval,
} from '@actions/application/ports/fetcher';
import { HttpPort } from '@actions/application/ports/http.port';
import { StockAction } from '@actions/domain/entities/action.entity';
import { Injectable } from '@nestjs/common';

type AlphaVantageResponse = {
	[key: string]: {
		[key: string]: {
			'1. open': string;
			'2. high': string;
			'3. low': string;
			'4. close': string;
			'5. volume': string;
		};
	};
};

@Injectable()
export class AlphaVantageAdapter extends StockActionsFetcherPort {
	constructor(private readonly httpClient: HttpPort) {
		super();
	}

	private async fetchActions(
		symbol: string,
		functionName: string,
		timeSeriesKey: string,
		interval?: TimeInterval,
	): Promise<StockAction[]> {
		const url = new URL('https://www.alphavantage.co/query');
		url.searchParams.append('function', functionName);
		url.searchParams.append('symbol', symbol);
		if (interval) {
			url.searchParams.append('interval', interval);
		}
		url.searchParams.append('apikey', 'demo');

		const response = await this.httpClient.get<AlphaVantageResponse>(
			url.toString(),
		);

		if (response.status !== 200) {
			throw new Error(`Error fetching actions for symbol ${symbol}`);
		}

		const data = response.data;
		console.log(data);

		const dates = Object.keys(data[timeSeriesKey]);

		return dates.map((date, index) => {
			const entry = data[timeSeriesKey][date];

			return {
				id: `${symbol}-${date}-${index}`,
				symbol,
				date: new Date(date),
				open: parseFloat(entry['1. open']),
				high: parseFloat(entry['2. high']),
				low: parseFloat(entry['3. low']),
				close: parseFloat(entry['4. close']),
				volume: parseInt(entry['5. volume'], 10),
			};
		});
	}

	async fetchIntradayActions(
		symbol: string,
		interval?: TimeInterval,
	): Promise<StockAction[]> {
		return this.fetchActions(
			symbol,
			'TIME_SERIES_INTRADAY',
			'Time Series (5min)',
			interval || '5min',
		);
	}

	async fetchDailyActions(symbol: string): Promise<StockAction[]> {
		return this.fetchActions(
			symbol,
			'TIME_SERIES_DAILY',
			'Time Series (Daily)',
		);
	}

	async fetchWeeklyActions(symbol: string): Promise<StockAction[]> {
		return this.fetchActions(
			symbol,
			'TIME_SERIES_WEEKLY',
			'Weekly Time Series',
		);
	}

	async fetchMonthlyActions(symbol: string): Promise<StockAction[]> {
		return this.fetchActions(
			symbol,
			'TIME_SERIES_MONTHLY',
			'Monthly Time Series',
		);
	}
}
