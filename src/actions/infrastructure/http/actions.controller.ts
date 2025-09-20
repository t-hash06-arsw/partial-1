import { Controller, Get } from '@nestjs/common';

@Controller('actions')
export class StockActionsRestController {
	@Get()
	getActions() {
		return { message: 'Stock Actions API is running' };
	}
}
