import { numberToYear, dateToChinese } from '../../src/index';

describe('日期與年份轉換', () => {
    describe('numberToYear (年份)', () => {
        test('基本年份', () => {
            expect(numberToYear(2024)).toBe('二零二四');
            expect(numberToYear(1999)).toBe('一九九九');
        });

        test('古早年份', () => {
            expect(numberToYear(100)).toBe('一零零');
        });
    });

    describe('dateToChinese (日期物件)', () => {
        // 固定時間以利測試：2024-01-22 (週一) 13:05:00
        const testDate = new Date(2024, 0, 22, 13, 5);

        test('僅日期 (預設)', () => {
            expect(dateToChinese(testDate)).toBe('二零二四年一月二十二日');
        });

        test('包含星期', () => {
            expect(dateToChinese(testDate, { format: 'day' })).toBe('二零二四年一月二十二日 星期一');
        });

        test('包含時間', () => {
            // 13:05 -> 十三點零五分
            expect(dateToChinese(testDate, { format: 'time' })).toBe('二零二四年一月二十二日 星期一 十三點零五分');
        });

        test('整點時間', () => {
            const d = new Date(2024, 0, 22, 10, 0);
            expect(dateToChinese(d, { format: 'time' })).toBe('二零二四年一月二十二日 星期一 十點整');
        });

        test('簡體中文日期', () => {
            expect(dateToChinese(testDate, { locale: 'zh-CN', format: 'day' })).toBe('二零二四年一月二十二日 星期一');
            expect(numberToYear(2024, 'zh-CN')).toBe('二零二四');
        });
    });
});
