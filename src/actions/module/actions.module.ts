import { StockActionsFetcherPort } from '@actions/application/ports/fetcher';
import { HttpPort } from '@actions/application/ports/http.port';
import { AlphaVantageAdapter } from '@actions/infrastructure/adapters/alphavantage.adapter';
import { FetchAdapter } from '@actions/infrastructure/adapters/http.adapter';
import { StockActionsRestController } from '@actions/infrastructure/http/actions.controller';
import { Module } from '@nestjs/common';

@Module({
	providers: [
		{
			useClass: FetchAdapter,
			provide: HttpPort,
		},
		{
			useClass: AlphaVantageAdapter,
			provide: StockActionsFetcherPort,
		},
	],
	controllers: [StockActionsRestController],
})
export class StockActionsModule {}
