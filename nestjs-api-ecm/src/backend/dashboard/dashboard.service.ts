import { Injectable } from '@nestjs/common';
import {OrderAllOrderDto} from "src/dto/orderDTO/order.allOrder.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {OrderEntity} from "src/entities/order_entity/oder.entity";
import {OrderRepository} from "src/repository/OrderRepository";
import {Order_productEntity} from "src/entities/order_entity/order_product.entity";
import {DataSource, Repository} from "typeorm";
import {TimeFilter} from "src/share/Enum/Enum";
import {endOfMonth, endOfWeek, endOfYear, startOfMonth, startOfWeek, startOfYear} from "date-fns";
import {OrderProductRepository} from "src/repository/OrderProductRepository";
import {ImportRepository} from "src/repository/ImportRepository";

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(OrderRepository)
        private readonly orderRepo: OrderRepository,
        @InjectRepository(OrderProductRepository)
        private readonly orderProductRepo: OrderProductRepository,
        @InjectRepository(ImportRepository)
        private readonly importRepo: ImportRepository
    ) {}

    async getSummaryStatistic(timeFilter: TimeFilter) {
        const { startDate, endDate } = this.timeFilterCreate(timeFilter);
        const { lastStartDate, lastEndDate } = this.lastTimeFilterCreate(startDate, endDate, timeFilter);

        const {
            currentRevenue,
            lastRevenue,
            currentQuantity,
            lastQuantity,
            currentTotalOrders,
            lastTotalOrders,
            currentTotalCustomers,
            lastTotalCustomers,
        } = await this.orderRepo.calculateStatsForTwoPeriods(startDate, endDate, lastStartDate, lastEndDate);


        return {
            thisTime: {
                revenue: currentRevenue,
                product: currentQuantity,
                customer: currentTotalCustomers,
                order: currentTotalOrders
            },
            lastTime: {
                revenue: lastRevenue,
                product: lastQuantity,
                customer: lastTotalCustomers,
                order: lastTotalOrders
            },
        };
    }

    async getFinancialSummaryByTime(timeFilter: TimeFilter) {
        const financialData = await this.orderRepo.getFinancialSummary(timeFilter);
        return financialData.map((data) => ({
            time_period: data.time_period,
            total_revenue: Number(data.total_revenue) || 0,
            total_cost: Number(data.total_cost) || 0,
            profit: Number(data.profit) || 0,
        }));
    }

    async getTop10ProductsByRevenue(timeFilter: TimeFilter) {
        const { startDate, endDate } = this.timeFilterCreate(timeFilter);
        const { lastStartDate, lastEndDate } = this.lastTimeFilterCreate(startDate, endDate, timeFilter);

        const top10Products = await this.orderProductRepo.getTop10ProductsByRevenue(startDate, endDate);
        return top10Products;
    }

    async getTop10CustomersByRevenue(timeFilter: TimeFilter) {
        const { startDate, endDate } = this.timeFilterCreate(timeFilter);
        const { lastStartDate, lastEndDate } = this.lastTimeFilterCreate(startDate, endDate, timeFilter);

        const top10Customers = await this.orderRepo.getTop10CustomersByRevenue(startDate, endDate);
        return top10Customers;
    }

    async getRevenueBySupplier(timeFilter: TimeFilter) {
        const { startDate, endDate } = this.timeFilterCreate(timeFilter);
        const { lastStartDate, lastEndDate } = this.lastTimeFilterCreate(startDate, endDate, timeFilter);

        const revenueBySupplier = await this.orderRepo.getRevenueBySupplier(startDate, endDate);
        return revenueBySupplier;
    }

    async getRevenueByCategory(timeFilter: TimeFilter) {
        const { startDate, endDate } = this.timeFilterCreate(timeFilter);
        const { lastStartDate, lastEndDate } = this.lastTimeFilterCreate(startDate, endDate, timeFilter);

        const revenueByCategory = await this.orderRepo.getRevenueByCategory(startDate, endDate);
        return revenueByCategory;
    }

    timeFilterCreate(timeFilter: TimeFilter): { startDate: Date; endDate: Date } {
        const now = new Date();
        if (timeFilter === TimeFilter.Week) {
            return {
                startDate: startOfWeek(now, { weekStartsOn: 1 }),
                endDate: endOfWeek(now, { weekStartsOn: 1 }),
            };
        } else if (timeFilter === TimeFilter.Month) {
            return {
                startDate: startOfMonth(now),
                endDate: endOfMonth(now),
            };
        } else if (timeFilter === TimeFilter.Year) {
            return {
                startDate: startOfYear(now),
                endDate: endOfYear(now),
            };
        } else if (timeFilter === TimeFilter.Quarter) {
            const quarter = Math.floor((now.getMonth() / 3));
            const startMonth = quarter * 3;
            const startDate = new Date(now.getFullYear(), startMonth, 1);
            const endDate = new Date(now.getFullYear(), startMonth + 3, 0);

            return { startDate, endDate };
        } else {
            throw new Error('Invalid time filter');
        }
    }

    lastTimeFilterCreate(startDate: Date, endDate: Date, timeFilter: TimeFilter): { lastStartDate: Date, lastEndDate: Date } {
        let lastStartDate: Date;
        let lastEndDate: Date;

        if (timeFilter === TimeFilter.Week) {
            lastStartDate = this.addDays(startDate, -7);
            lastEndDate = this.addDays(endDate, -7);
        } else if (timeFilter === TimeFilter.Month) {
            lastStartDate = this.addMonths(startDate, -1);
            lastEndDate = this.addMonths(endDate, -1);
        } else if (timeFilter === TimeFilter.Quarter) {
            lastStartDate = this.addMonths(startDate, -3);
            lastEndDate = this.addMonths(endDate, -3);
        } else if (timeFilter === TimeFilter.Year) {
            lastStartDate = this.addYears(startDate, -1);
            lastEndDate = this.addYears(endDate, -1);
        } else {
            throw new Error('Unsupported time period for lastTimeFilterCreate.');
        }

        return { lastStartDate, lastEndDate };
    }

    addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    addMonths(date: Date, months: number): Date {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
    }

    addYears(date: Date, years: number): Date {
        const result = new Date(date);
        result.setFullYear(result.getFullYear() + years);
        return result;
    }
}
