import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import {AuthGuard} from "src/guards/JwtAuth.guard";
import {RolesGuard} from "src/guards/Roles.guard";
import {ApiBearerAuth, ApiQuery, ApiTags} from "@nestjs/swagger";
import {Roles} from "src/decorator/Role.decorator";
import {responseHandler} from "src/Until/responseUtil";
import {ApplyStatus, TimeFilter} from "src/share/Enum/Enum";

@Controller('dashboard')
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('Dashboard')
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @Roles('admin')
  @ApiQuery({
    name: 'timeFilter',
    enum: TimeFilter,
    description: 'Thời gian lọc (Tuần, Tháng, Quý, Năm)',
  })
  async summaryStatistic(@Query('timeFilter') timeFilter: TimeFilter) {
    try {
      const result = await this.dashboardService.getSummaryStatistic(timeFilter);
      return responseHandler.ok(result);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Get('summary-financial')
  @Roles('admin')
  @ApiQuery({
    name: 'timeFilter',
    enum: TimeFilter,
    description: 'Thời gian lọc (Tuần, Tháng, Quý, Năm)',
  })
  async getFinancialSummary(@Query('timeFilter') timeFilter: TimeFilter) {
    try {
      const result = await this.dashboardService.getFinancialSummaryByTime(timeFilter);
      return responseHandler.ok(result);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Get('top-products')
  @Roles('admin')
  @ApiQuery({
    name: 'timeFilter',
    enum: TimeFilter,
    description: 'Thời gian lọc (Tuần, Tháng, Quý, Năm)',
  })
  async getTopProducts(
      @Query('timeFilter') timeFilter: TimeFilter
  ) {
    try {
      const topProducts = await this.dashboardService.getTopProductsByRevenue(timeFilter);
      return responseHandler.ok(topProducts);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Get('top-customers')
  @Roles('admin')
  @ApiQuery({
    name: 'timeFilter',
    enum: TimeFilter,
    description: 'Thời gian lọc (Tuần, Tháng, Quý, Năm)',
  })
  async getTopCustomers(
      @Query('timeFilter') timeFilter: TimeFilter
  ) {
    try {
      const topCustomers = await this.dashboardService.getTopCustomersByRevenue(timeFilter);
      return topCustomers;
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Get('revenue-by-supplier')
  @Roles('admin')
  @ApiQuery({
    name: 'timeFilter',
    enum: TimeFilter,
    description: 'Thời gian lọc (Tuần, Tháng, Quý, Năm)',
  })
  async getRevenueBySupplier(
      @Query('timeFilter') timeFilter: TimeFilter
  ) {
    try {
      const revenueBySupplier = await this.dashboardService.getRevenueBySupplier(timeFilter);
      return responseHandler.ok(revenueBySupplier);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Get('revenue-by-category')
  @Roles('admin')
  @ApiQuery({
    name: 'timeFilter',
    enum: TimeFilter,
    description: 'Thời gian lọc (Tuần, Tháng, Quý, Năm)',
  })
  async getRevenueByCategory(
      @Query('timeFilter') timeFilter: TimeFilter
  ) {
    try {
      const revenueByCategory = await this.dashboardService.getRevenueByCategory(timeFilter);
      return responseHandler.ok(revenueByCategory);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }
}
