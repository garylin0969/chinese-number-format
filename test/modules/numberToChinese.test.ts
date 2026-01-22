import { numberToChinese } from '../../src/index';

describe('numberToChinese (數字轉中文)', () => {
    describe('整數轉換', () => {
        test('一般整數', () => {
            expect(numberToChinese(123)).toBe('一百二十三');
            expect(numberToChinese(123456789)).toBe('一億二千三百四十五萬六千七百八十九');
        });

        test('零的處理', () => {
            expect(numberToChinese(0)).toBe('零');
            expect(numberToChinese(101)).toBe('一百零一');
            expect(numberToChinese(1001)).toBe('一千零一'); // 中間多個零
            expect(numberToChinese(10001)).toBe('一萬零一'); // 跨單位零
            expect(numberToChinese(100000001)).toBe('一億零一'); // 跨大單位零
        });

        test('十的省略 (tenMin)', () => {
            expect(numberToChinese(10)).toBe('十'); // 預設 tenMin: true
            expect(numberToChinese(12)).toBe('十二');
            expect(numberToChinese(10, { tenMin: false })).toBe('一十');
            expect(numberToChinese(110)).toBe('一百一十'); // 不是一百十
            expect(numberToChinese(10010)).toBe('一萬零一十'); // 不是一萬零十
        });

        test('純數字模式 (units: false)', () => {
            expect(numberToChinese(2024, { units: false })).toBe('二零二四');
            expect(numberToChinese(1234567890, { units: false })).toBe('一二三四五六七八九零');
        });
    });

    describe('小數與浮點數', () => {
        test('基本小數', () => {
            expect(numberToChinese(0.123)).toBe('零點一二三');
            expect(numberToChinese(123.45)).toBe('一百二十三點四五');
        });

        test('浮點數精度測試', () => {
            // JS 中 0.1 + 0.2 !== 0.3，測試轉換結果是否合理
            // 這裡依賴輸入為 number，numberToChinese 不負責解決運算誤差，只負責顯示
            // 但我們應確保轉換過程不引入額外誤差
            expect(numberToChinese(0.3)).toBe('零點三');

            // 測試極小數
            expect(numberToChinese(0.0001)).toBe('零點零零零一');
        });

        test('整數部分為零且被清空的情況', () => {
            // 之前版本的 bug：0.123 曾變成 "點一二三"
            expect(numberToChinese(0.1)).toBe('零點一');
        });
    });

    describe('大數字與邊界', () => {
        test('極大數字', () => {
            expect(numberToChinese(1e12)).toBe('一兆');
            expect(numberToChinese(1000000000001)).toBe('一兆零一');
        });

        test('科學記號輸入', () => {
            // 1.23e+8 -> 123000000
            expect(numberToChinese(1.23e8)).toBe('一億二千三百萬');
        });
    });

    describe('選項測試', () => {
        test('金融大寫', () => {
            expect(numberToChinese(1234567890, { finance: true })).toBe('壹拾貳億參仟肆佰伍拾陸萬柒仟捌佰玖拾');
        });

        test('簡體中文', () => {
            expect(numberToChinese(123, { locale: 'zh-CN' })).toBe('一百二十三');
            expect(numberToChinese(12345, { locale: 'zh-CN', finance: true })).toBe('壹万贰仟叁佰肆拾伍');
            expect(numberToChinese(100000000, { locale: 'zh-CN' })).toBe('一亿');
            expect(numberToChinese(0.12, { locale: 'zh-CN' })).toBe('零点一二');

            // 繁簡對照
            expect(numberToChinese(22222, { locale: 'zh-TW' })).toBe('二萬二千二百二十二');
            expect(numberToChinese(22222, { locale: 'zh-CN' })).toBe('二万二千二百二十二');
        });
    });
});
