# Chinese Number Format

[![npm version](https://img.shields.io/npm/v/chinese-number-format.svg)](https://www.npmjs.com/package/chinese-number-format)
[![License](https://img.shields.io/npm/l/chinese-number-format.svg)](https://github.com/garylin0969/chinese-number-format/blob/main/LICENSE)

強大且輕量的中文數字轉換函式庫。支援繁體/簡體中文、金融大寫、貨幣格式化、日期轉換、數字縮寫等多種場景。

A powerful and lightweight library for converting numbers to Chinese numerals. Supports Traditional/Simplified Chinese, financial uppercase, currency formatting, date conversion, and number approximation.

## ✨ 特色 (Features)

*   🚀 **全方位轉換**：支援一般數字、金融大寫、貨幣、日期、年份、分數、百分比。
*   💡 **智慧解析**：支援將中文數字（包含口語縮寫如「一萬二」）反向解析為數值。
*   🌏 **繁簡支援**：完整支援 `zh-TW` (繁體) 與 `zh-CN` (簡體)，無論輸入或輸出。
*   🛡️ **安全設計**：提供 `ChineseNumberFormat` 類別，可建立獨立設定的實例，完美支援 SSR 與多語系環境。
*   ⚡ **高效輕量**：零依賴 (Zero Dependency)。
*   🛠️ **通用支援**：
    *   **TypeScript**: 內建完整型別定義。
    *   **Node.js**: 支援 CommonJS (`require`) 與 ES Modules (`import`)。
    *   **Browser**: 支援原生 ES Modules，可直接在瀏覽器使用。
    *   **Frameworks**: 完美支援 React, Vue, Next.js, Angular, Svelte 等。

## 📦 安裝 (Installation)

```bash
npm install chinese-number-format
# 或
yarn add chinese-number-format
# 或
pnpm add chinese-number-format
```

## 💻 使用方式 (Usage)

### 1. 基礎函式 (Functional API)
適合簡單、無狀態的使用場景。

```typescript
import { 
  numberToChinese, 
  numberToCurrency, 
  chineseToNumber 
} from 'chinese-number-format';

console.log(numberToChinese(12345)); 
// Output: "一萬二千三百四十五"

console.log(numberToCurrency(1234.50, { locale: 'zh-CN' })); 
// Output: "壹仟贰佰叁拾肆元伍角"
```

### 2. 類別實例 (Class API) - 推薦 ⭐
適合需要統一設定、多語系切換或 SSR 環境。

```typescript
import { ChineseNumberFormat } from 'chinese-number-format';

// 建立一個簡體中文的格式化器
const cnFormatter = new ChineseNumberFormat({ locale: 'zh-CN' });

console.log(cnFormatter.toChinese(123)); // "一百二十三" (簡體)
console.log(cnFormatter.toCurrency(100)); // "壹佰元整" (簡體)

// 建立一個繁體中文的格式化器
const twFormatter = new ChineseNumberFormat({ locale: 'zh-TW', finance: true });
console.log(twFormatter.toChinese(123)); // "壹佰貳拾參"
```

### 3. 瀏覽器原生 (Browser Native)

可以直接透過 CDN 引入 (使用 ES Modules 版本)：

```html
<script type="module">
  import { ChineseNumberFormat } from 'https://unpkg.com/chinese-number-format@^2.0.0/dist/esm/index.js';
  
  const formatter = new ChineseNumberFormat();
  console.log(formatter.toChinese(12345));
</script>
```

## 📚 API 文件 (API Documentation)

### `ChineseNumberFormat` Class

| 方法 | 說明 |
| --- | --- |
| `constructor(options?)` | 建立實例，可傳入預設選項 (如 `{ locale: 'zh-CN' }`) |
| `toChinese(num, options?)` | 數字轉中文 |
| `toCurrency(num, options?)` | 數字轉貨幣 |
| `toNumber(str)` | 中文轉數字 |
| `toApproximate(num, options?)` | 數字縮寫 |
| `toYear(year, locale?)` | 年份轉換 |
| `toDate(date, options?)` | 日期轉換 |
| `toFraction(val, options?)` | 分數轉換 |

---

### 獨立函式 (Functional Exports)

#### `numberToChinese(num, options?)`
將數字轉換為中文讀法。

| 參數 | 類型 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `num` | `number` | - | 輸入數字 |
| `options.locale` | `'zh-TW' \| 'zh-CN'` | `'zh-TW'` | 地區 (繁/簡) |
| `options.finance` | `boolean` | `false` | 是否使用金融大寫 (壹貳參) |
| `options.units` | `boolean` | `true` | 是否顯示單位 (十百千)。設為 `false` 可轉為純數字讀法 (如電話) |
| `options.tenMin` | `boolean` | `true` | 是否省略首位的「一十」(如 10 -> 十) |

```typescript
numberToChinese(10010); // "一萬零一十"
numberToChinese(123, { locale: 'zh-CN' }); // "一百二十三"
```

#### `numberToCurrency(num, options?)`
將數字轉換為中文貨幣格式（自動四捨五入至小數第二位）。

| 參數 | 類型 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `num` | `number` | - | 金額 |
| `options.currencyUnit` | `string` | `'元'` | 貨幣單位 |
| `options.useIntUnit` | `boolean` | `true` | 整數結尾是否加「整」 |

#### `chineseToNumber(str)`
將中文數字字串解析為數值。

| 參數 | 類型 | 說明 |
| --- | --- | --- |
| `str` | `string` | 中文數字字串 |

```typescript
chineseToNumber("一萬二"); // 12000
chineseToNumber("參佰伍拾"); // 350
chineseToNumber("三點一四"); // 3.14
```

#### `numberToChineseApproximate(num, options?)`
將大數字轉換為簡短的近似值（如觀看次數）。

| 參數 | 類型 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `num` | `number` | - | 輸入數字 |
| `options.locale` | `'zh-TW' \| 'zh-CN'` | `'zh-TW'` | 地區 |
| `options.precision` | `number` | `1` | 小數點後保留位數 |

```typescript
numberToChineseApproximate(12345); // "1.2萬"
numberToChineseApproximate(12345, { precision: 2 }); // "1.23萬"
```

#### `numberToYear(year, locale?)`
將年份數字轉換為中文讀法（逐字讀出）。

| 參數 | 類型 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `year` | `number \| string` | - | 年份 |
| `locale` | `'zh-TW' \| 'zh-CN'` | `'zh-TW'` | 地區 |

```typescript
numberToYear(2024); // "二零二四"
numberToYear(2024, 'zh-CN'); // "二零二四" (簡體地區)
```

#### `dateToChinese(date, options?)`
將 `Date` 物件轉換為中文日期表示。

| 參數 | 類型 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `date` | `Date` | - | 日期物件 |
| `options.locale` | `'zh-TW' \| 'zh-CN'` | `'zh-TW'` | 地區 |
| `options.format` | `'date' \| 'day' \| 'time'` | `'date'` | 格式 ('date': 日期, 'day': 含星期, 'time': 含時間) |

```typescript
const d = new Date('2024-01-22T12:30:00');
dateToChinese(d); // "二零二四年一月二十二日"
dateToChinese(d, { locale: 'zh-CN', format: 'day' }); // "二零二四年一月二十二日 星期一"
dateToChinese(d, { format: 'time' }); // "二零二四年一月二十二日 十二點三十分"
```

#### `numberToFraction(val, options?)`
分數或百分比轉換。

| 參數 | 類型 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `val` | `string` | - | 分數 ("1/2") 或 百分比 ("50%") 字串 |
| `options.locale` | `'zh-TW' \| 'zh-CN'` | `'zh-TW'` | 地區 |
| `options.type` | `'fraction' \| 'percentage'` | auto | 強制指定類型，若不填則自動判斷 |

```typescript
numberToFraction("1/2"); // "二分之一"
numberToFraction("75%", { locale: 'zh-CN' }); // "百分之七十五"
numberToFraction(0.5, { type: 'percentage' }); // "百分之五十"
```

---

## 🤝 貢獻 (Contributing)

歡迎提交 Issue 或 Pull Request！

1. Fork 本專案
2. 建立您的 Feature 分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權 (License)

MIT © [GaryLin](https://github.com/garylin0969)