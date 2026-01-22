import { chineseToNumber } from '../../src/index';

describe('chineseToNumber (中文轉數字)', () => {
    describe('標準轉換', () => {
        test('基本整數', () => {
            expect(chineseToNumber('一')).toBe(1);
            expect(chineseToNumber('十二')).toBe(12);
            expect(chineseToNumber('一百二十三')).toBe(123);
            expect(chineseToNumber('一千零一')).toBe(1001);
            expect(chineseToNumber('一萬零一十')).toBe(10010);
        });

        test('大寫數字', () => {
            expect(chineseToNumber('壹佰貳拾參')).toBe(123);
            expect(chineseToNumber('零')).toBe(0);
        });
    });

    describe('口語縮寫與模糊解析', () => {
        test('省略單位', () => {
            expect(chineseToNumber('一萬二')).toBe(12000);
            expect(chineseToNumber('一千五')).toBe(1500);
            expect(chineseToNumber('一百二')).toBe(120);

            // 注意：十二通常指 12，而非 1.2 或 120 (除非特定方言)
            expect(chineseToNumber('十二')).toBe(12);
        });

        test('混合縮寫', () => {
            expect(chineseToNumber('1.2萬')).toBe(12000);
            expect(chineseToNumber('3.5億')).toBe(350000000);
            // 容錯測試：若無單位則視為純數字
            expect(chineseToNumber('1.2')).toBe(1.2);
        });

        test('繁簡通用解析', () => {
            expect(chineseToNumber('一万二')).toBe(12000); // 簡體万
            expect(chineseToNumber('两万')).toBe(20000); // 簡體两
            expect(chineseToNumber('两千')).toBe(2000); // 簡體两
            expect(chineseToNumber('貳萬')).toBe(20000); // 繁體貳
            expect(chineseToNumber('壹亿')).toBe(100000000); // 簡體亿
        });
    });

    describe('複雜組合', () => {
        test('三千零五 vs 三千五', () => {
            expect(chineseToNumber('三千零五')).toBe(3005);
            expect(chineseToNumber('三千五')).toBe(3500);
        });

        test('一萬零二 vs 一萬二', () => {
            expect(chineseToNumber('一萬零二')).toBe(10002);
            expect(chineseToNumber('一萬二')).toBe(12000);
        });
    });

    describe('小數解析', () => {
        test('標準小數', () => {
            expect(chineseToNumber('三點一四')).toBe(3.14);
            expect(chineseToNumber('零點五')).toBe(0.5);
        });
    });

    describe('容錯處理', () => {
        test('含標點符號', () => {
            expect(chineseToNumber('一,二三四')).toBe(1234);
            expect(chineseToNumber('一  二  三')).toBe(123); // 純映射模式
        });
    });
});
