import { numberToCurrency } from '../../src/index';

describe('numberToCurrency (貨幣格式化)', () => {
    describe('基本金額', () => {
        test('整數金額', () => {
            expect(numberToCurrency(100)).toBe('壹佰元整');
            expect(numberToCurrency(0)).toBe('零元整');
        });

        test('自定義單位', () => {
            expect(numberToCurrency(100, { currencyUnit: '圓' })).toBe('壹佰圓整');
            expect(numberToCurrency(100, { useIntUnit: false })).toBe('壹佰元');
        });
    });

    describe('小數處理 (角、分)', () => {
        test('角與分', () => {
            expect(numberToCurrency(10.5)).toBe('壹拾元伍角');
            expect(numberToCurrency(10.52)).toBe('壹拾元伍角貳分');
            expect(numberToCurrency(0.5)).toBe('零元伍角');
            expect(numberToCurrency(0.05)).toBe('零元伍分');
        });

        test('補零邏輯', () => {
            // 1.05 -> 整數有值，無角，有分 -> 補零
            expect(numberToCurrency(1.05)).toBe('壹元零伍分');
            // 0.05 -> 整數為零，無角，有分 -> 不補零 (通常讀作 零元五分 or 零元零五分? 這裡實作是 零元伍分)
            expect(numberToCurrency(0.05)).toBe('零元伍分');
            // 10.05
            expect(numberToCurrency(10.05)).toBe('壹拾元零伍分');
        });
    });

    describe('浮點數精度與四捨五入', () => {
        test('四捨五入', () => {
            expect(numberToCurrency(10.555)).toBe('壹拾元伍角陸分'); // .56
            expect(numberToCurrency(10.554)).toBe('壹拾元伍角伍分'); // .55
        });

        test('JS 浮點數陷阱', () => {
            // 1.005.toFixed(2) -> "1.01" (大部分瀏覽器/Node)
            expect(numberToCurrency(1.005)).toBe('壹元零壹分');

            // 19.99
            expect(numberToCurrency(19.99)).toBe('壹拾玖元玖角玖分');
        });
    });

    describe('多語言支援', () => {
        test('簡體中文', () => {
            // 1234.56 -> 壹仟貳佰... (繁) vs 壹仟贰佰... (簡)
            // 注意：簡體的 '贰', '叁', '陆', '万'
            expect(numberToCurrency(1234.56, { locale: 'zh-CN' })).toBe('壹仟贰佰叁拾肆元伍角陆分');

            // 測試整數
            expect(numberToCurrency(100, { locale: 'zh-CN' })).toBe('壹佰元整');

            // 測試零
            expect(numberToCurrency(0, { locale: 'zh-CN' })).toBe('零元整');
        });
    });
});
