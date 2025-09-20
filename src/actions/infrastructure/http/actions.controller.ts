import {
	StockActionsFetcherPort,
	type TimeInterval,
} from '@actions/application/ports/fetcher';
import {
	BadRequestException,
	Controller,
	Get,
	Logger,
	Param,
	Query,
	ServiceUnavailableException,
} from '@nestjs/common';

@Controller('actions')
export class StockActionsRestController {
	private readonly logger = new Logger(StockActionsRestController.name);
	constructor(private readonly fetcher: StockActionsFetcherPort) {}

	@Get('/:symbol/intraday')
	async getIntradayActions(
		@Param('symbol') symbol: string,
		@Query('interval') interval?: TimeInterval,
		@Query('month') month?: string,
	) {
		if (!interval) {
			interval = '5min';
		}

		if (!month) {
			month = new Date().toISOString().slice(0, 7);
		}

		if (!['1min', '5min', '15min', '30min', '60min'].includes(interval)) {
			return new BadRequestException(
				'Invalid interval. Allowed values are 1min, 5min, 15min, 30min, 60min',
			);
		}

		if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
			return new BadRequestException(
				'Invalid month. Allowed format is YYYY-MM',
			);
		}

		try {
			const actions = await this.fetcher.fetchIntradayActions(
				symbol,
				interval,
				month,
			);
			return actions;
		} catch (error) {
			this.logger.error(error);
			return new ServiceUnavailableException(
				'Failed to fetch intraday actions',
			);
		}
	}

	@Get('/:symbol/daily')
	async getActions(@Param('symbol') symbol: string) {
		try {
			const actions = await this.fetcher.fetchDailyActions(symbol);

			return actions;
		} catch (error) {
			this.logger.error(error);
			return new ServiceUnavailableException('Failed to fetch daily actions');
		}
	}

	@Get('/:symbol/weekly')
	async getWeeklyActions(@Param('symbol') symbol: string) {
		try {
			const actions = await this.fetcher.fetchWeeklyActions(symbol);

			return actions;
		} catch (error) {
			this.logger.error(error);
			return new ServiceUnavailableException('Failed to fetch daily actions');
		}
	}

	@Get('/:symbol/monthly')
	async getMonthlyActions(@Param('symbol') symbol: string) {
		try {
			const actions = await this.fetcher.fetchMonthlyActions(symbol);

			return actions;
		} catch (error) {
			this.logger.error(error);
			return new ServiceUnavailableException('Failed to fetch daily actions');
		}
	}
}
