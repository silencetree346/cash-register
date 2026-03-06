# ☕ 咖啡收银系统

一个功能完整的咖啡店收银点单系统，使用 React + TypeScript + Vite 构建。

## 功能特点

### 📋 三层菜单结构
- **第一层**：6大咖啡类别
  - Iced Coffee（冰咖啡）
  - Hot Coffee（热咖啡）
  - Signature Coffee（招牌咖啡）
  - Cold Brew（冷萃咖啡）
  - Matcha（抹茶）
  - Frappe（星冰乐）

- **第二层**：16种精品咖啡
  - 每款咖啡包含基础选项：杯型、温度、冰量

- **第三层**：高级定制（Customization）
  - Espresso Options（浓缩咖啡选项）
    - Roast Options（烘焙程度）
    - Extraction Options（萃取方式）
    - Shot（份数）
  - Milk Base（奶基底）
  - Syrup（糖浆）
  - Toppings（配料）

### 🛒 购物车管理
- 添加/删除商品
- 调整商品数量
- 实时计算价格和税费（8%）

### 💳 支付功能
- **信用卡支付**：一键完成
- **现金支付**：
  - 输入收到的现金金额
  - 自动计算找零金额
  - 验证金额是否足够

### 📄 订单管理
- 生成唯一订单号
- 记录订单时间
- 完整的订单详情展示
- 支持开启新订单

## 技术栈

- **前端框架**：React 18
- **开发语言**：TypeScript
- **构建工具**：Vite
- **样式**：原生 CSS

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
收银台/
├── src/
│   ├── components/           # React 组件
│   │   ├── ProductSelector.tsx   # 商品选择和定制
│   │   ├── Cart.tsx              # 购物车
│   │   ├── Payment.tsx           # 支付界面
│   │   └── OrderComplete.tsx     # 订单完成
│   ├── data/
│   │   └── products.ts       # 商品数据配置
│   ├── types.ts              # TypeScript 类型定义
│   ├── styles.css            # 全局样式
│   ├── App.tsx               # 主应用组件
│   └── main.tsx              # 应用入口
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 使用说明

1. **选择类别**：点击顶部的类别按钮浏览不同类型的咖啡
2. **选择商品**：点击商品卡片进入定制页面
3. **基础选项**：选择杯型、温度、冰量
4. **高级定制**：点击"显示定制选项"按钮，选择浓缩咖啡、奶基底、糖浆等
5. **加入购物车**：确认选择后添加到购物车
6. **调整数量**：在购物车中可以增减商品数量或删除商品
7. **结账支付**：
   - 选择信用卡或现金支付
   - 现金支付需输入收到的金额，系统自动计算找零
8. **完成订单**：查看订单详情，可以开启新订单

## 截图

（可以在这里添加应用截图）

## 在线演示

访问 https://silencetree346.github.io/cash-register/ 查看在线演示

## 许可证

MIT
