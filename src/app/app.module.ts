import { StockActionsModule } from '@actions/module/actions.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [StockActionsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
