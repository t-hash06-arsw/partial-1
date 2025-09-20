import { HttpPort } from '@actions/application/ports/http.port';
import { FetchAdapter } from '@actions/infrastructure/adapters/fetch.adapter';
import { StockActionsRestController } from '@actions/infrastructure/http/actions.controller';
import { Module } from '@nestjs/common';

@Module({
	providers: [
		{
			useClass: FetchAdapter,
			provide: HttpPort,
		},
	],
	controllers: [StockActionsRestController],
})
export class StockActionsModule {}
