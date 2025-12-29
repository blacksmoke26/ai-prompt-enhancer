/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import HistoryStats from '../../classes/HistoryStats';
import PaginatedList from '../../classes/PaginatedList';
import PaginationQuery from '../../classes/PaginationQuery';
import PromptFormatter from '../../classes/PromptFormatter';

describe('Classes', () => {
  describe('HistoryStats', () => {
    it('should create HistoryStats instance with default values', () => {
      const stats = new HistoryStats();

      expect(stats).toBeDefined();
      expect(stats.total).toBe(0);
      expect(stats.success).toBe(0);
      expect(stats.failed).toBe(0);
      expect(stats.averageTime).toBe(0);
    });

    it('should create HistoryStats instance with provided values', () => {
      const stats = new HistoryStats({
        total: 10,
        success: 5,
        failed: 5,
        averageTime: 100,
      });

      expect(stats.total).toBe(10);
      expect(stats.success).toBe(5);
      expect(stats.failed).toBe(5);
      expect(stats.averageTime).toBe(100);
    });

    it('should handle invalid values gracefully', () => {
      const stats = new HistoryStats({
        total: -5,
        success: -2,
        failed: -3,
        averageTime: -100,
      });

      expect(stats.total).toBe(-5);
      expect(stats.success).toBe(-2);
      expect(stats.failed).toBe(-3);
      expect(stats.averageTime).toBe(-100);
    });
  });

  describe('PaginatedList', () => {
    it('should create PaginatedList instance with default values', () => {
      const paginatedList = new PaginatedList([]);

      expect(paginatedList).toBeDefined();
      expect(paginatedList.items).toEqual([]);
      expect(paginatedList.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 0,
        pages: 1,
      });
    });

    it('should create PaginatedList instance with provided values', () => {
      const items = ['item1', 'item2', 'item3'];
      const pagination = {
        page: 2,
        limit: 5,
        total: 15,
        pages: 3,
      };

      const paginatedList = new PaginatedList(items, pagination);

      expect(paginatedList.items).toEqual(items);
      expect(paginatedList.pagination).toEqual(pagination);
    });

    it('should handle empty items array', () => {
      const paginatedList = new PaginatedList([]);

      expect(paginatedList.items).toEqual([]);
      expect(paginatedList.pagination.total).toBe(0);
    });
  });

  describe('PaginationQuery', () => {
    it('should create PaginationQuery instance with default values', () => {
      const paginationQuery = new PaginationQuery();

      expect(paginationQuery).toBeDefined();
      expect(paginationQuery.page).toBe(1);
      expect(paginationQuery.limit).toBe(10);
    });

    it('should create PaginationQuery instance with provided values', () => {
      const paginationQuery = new PaginationQuery({
        page: 5,
        limit: 20,
      });

      expect(paginationQuery.page).toBe(5);
      expect(paginationQuery.limit).toBe(20);
    });

    it('should validate page and limit values', () => {
      const paginationQuery = new PaginationQuery({
        page: 0,
        limit: 0,
      });

      expect(paginationQuery.page).toBe(1);
      expect(paginationQuery.limit).toBe(10);
    });

    it('should handle negative values correctly', () => {
      const paginationQuery = new PaginationQuery({
        page: -1,
        limit: -5,
      });

      expect(paginationQuery.page).toBe(1);
      expect(paginationQuery.limit).toBe(10);
    });
  });

  describe('PromptFormatter', () => {
    it('should create PromptFormatter instance with default values', () => {
      const formatter = new PromptFormatter();

      expect(formatter).toBeDefined();
      expect(formatter.format).toBe('markdown');
    });

    it('should create PromptFormatter instance with provided values', () => {
      const formatter = new PromptFormatter({
        format: 'json',
      });

      expect(formatter.format).toBe('json');
    });

    it('should handle different format types', () => {
      const formatter1 = new PromptFormatter({ format: 'markdown' });
      const formatter2 = new PromptFormatter({ format: 'json' });
      const formatter3 = new PromptFormatter({ format: 'xml' });

      expect(formatter1.format).toBe('markdown');
      expect(formatter2.format).toBe('json');
      expect(formatter3.format).toBe('xml');
    });
  });
});
