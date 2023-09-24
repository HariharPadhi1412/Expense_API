import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common/decorators';
import { ReportType } from './data';
import { AppService } from './app.service';
import { ParseEnumPipe, ParseUUIDPipe } from '@nestjs/common';
import { ReportDTO } from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReport(@Param('type', new ParseEnumPipe(ReportType)) type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getAllReport(reportType);
  }

  @Get(':id')
  getReportByID(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getReportByID(reportType, id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: ReportDTO,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.createReport(reportType, { amount, source });
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { source: string; amount: number },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }
}
