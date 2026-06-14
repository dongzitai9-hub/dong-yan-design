# 董揅设计 SEO Meta 与图片 Alt 清单

## 室内设计师官网 SEO 维护规则

董揅设计不是平台站，也不是装修公司目录站，SEO 重点应围绕“个人设计师信任感 + 常州及江浙沪住宅设计服务 + 真实案例 + 客户问题解答”展开。后续维护时按以下规则优先判断：

1. 首页先讲清楚“董揅设计是谁、在哪些城市服务、适合什么住宅项目、能解决什么问题、如何联系”，不要只追求品牌感或视觉氛围。
2. 栏目页 description 不要太短，必须包含服务对象、空间类型、具体问题和咨询价值，例如收纳、动线、采光、材料、预算、长期居住体验。
3. 案例页标题保持“项目名 + 类型 + 董揅设计案例编号”，不改 URL；正文和描述尽量包含城市、面积、户型问题、解决方案和适合人群。
4. 设计札记优先写客户会搜索的问题，例如厨房收纳、橱柜尺寸、客餐厅一体化、玄关柜、电视墙收纳、老房翻新、装修前准备。
5. FAQ 是 GEO 和 SEO 的重要入口，回答要像真实设计师在解释问题，不写一句话空答案。
6. 图片 alt 要说明图片在展示什么空间、什么项目、什么设计信息；装饰图可以短，但案例图不能空。
7. keywords 只作为辅助，不堆词；真正重要的是 title、description、H1/H2、正文、内链和结构化数据。
8. canonical 一律指向 `https://dongyandesign.cn/` 下的正式 URL，不能指向 GitHub Pages、OSS 或阿里云 IP。
9. 阿里云 IP 只用于备案期间测试，必须通过服务器响应头或 IP 专属 robots 阻止收录，不能提交给百度或 Google。
10. 每次新增页面后，同步更新 `sitemap.xml`、`urls.txt`、`baidu-api-urls.txt`；仅修改 meta 或正文时，如果 URL 不变，一般不需要新增 URL。

## 页面 Meta 标签

### 首页
URL：https://dongyandesign.cn/

```html
<title>董揅设计｜室内空间与方案设计</title>
<meta name="description" content="董揅设计专注现代私宅、改善型住宅、大平层与公寓室内设计，提供空间辑选、方案辑选、风格方向和咨询服务。通过真实空间图像与户型方案，帮助客户判断生活气质、功能动线、材质搭配和落地方向，适合准备装修、旧房改善或高品质私宅设计的业主参考，也适合在施工前明确审美取向、空间预算、家庭成员需求、收纳系统和长期居住体验。">
<meta name="keywords" content="董揅设计,室内设计,空间设计,方案设计,私宅设计,大平层设计,住宅设计">
<link rel="canonical" href="https://dongyandesign.cn/">
```

### 空间辑选
URL：https://dongyandesign.cn/#works

```html
<title>空间辑选｜董揅设计室内空间案例</title>
<meta name="description" content="董揅设计空间辑选展示私宅、大平层、公寓、客餐厅、卧室和餐厨等室内空间案例，聚焦光线、比例、材质、收纳和生活场景，帮助业主快速确认喜欢的风格气质、软硬装方向与设计沟通重点，适合前期找灵感和比对审美，也能辅助判断采光、色彩、家具尺度、墙面材质与家庭生活方式是否匹配，为后续平面方案和材料选择建立清晰参考。">
<meta name="keywords" content="空间辑选,空间案例,室内设计案例,私宅设计,大平层设计,董揅设计">
<link rel="canonical" href="https://dongyandesign.cn/#works">
```

### 方案辑选
URL：https://dongyandesign.cn/#schemes

```html
<title>方案辑选｜董揅设计户型优化与平面方案</title>
<meta name="description" content="董揅设计方案辑选展示格局推演、功能重组、动线优化、套房规划、家庭尺度和大宅推敲等平面方案，帮助客户看懂户型结构、空间关系、家具尺度、收纳比例和后续深化方向，适合装修前评估方案可行性，也能提前比较公共区、卧室、餐厨、卫浴和家政动线的取舍，让设计沟通更具体、更容易落地，并减少后期反复调整，提升决策效率。">
<meta name="keywords" content="方案辑选,方案设计,户型优化,平面方案,动线优化,董揅设计">
<link rel="canonical" href="https://dongyandesign.cn/#schemes">
```

### 咨询
URL：https://dongyandesign.cn/#contact

```html
<title>设计咨询｜董揅设计联系方式</title>
<meta name="description" content="欢迎联系董揅设计咨询室内设计、空间设计、户型方案、材料搭配与住宅改善需求。可通过电话或微信沟通项目情况、居住期待、预算边界和设计方向，让旧户型与新生活重新对齐，提前梳理适合自己的空间策略，包括风格定位、平面优化、材料选择、收纳规划和落地节奏，并形成可继续深化的设计方向与沟通资料，降低试错成本与时间成本。">
<meta name="keywords" content="设计咨询,室内设计咨询,董揅设计联系方式,住宅设计咨询,空间设计顾问">
<link rel="canonical" href="https://dongyandesign.cn/#contact">
```

### 案例索引
URL：https://dongyandesign.cn/cases/

```html
<title>案例索引｜董揅设计空间与方案案例</title>
<meta name="description" content="董揅设计案例索引，整理私宅、大平层、公寓、改善型住宅、客餐厅、餐厨空间、卧室套房和户型方案案例，便于按空间辑选与方案辑选查看光线、材质、收纳、动线和长期居住体验。">
<meta name="keywords" content="董揅设计案例,室内设计案例,私宅设计案例,大平层设计,户型方案设计">
<link rel="canonical" href="https://dongyandesign.cn/cases/">
```

### 服务范围
URL：https://dongyandesign.cn/services/

```html
<title>服务范围与设计方向｜董揅设计</title>
<meta name="description" content="董揅设计提供常州及江浙沪住宅室内设计咨询，包含私宅、改善型住宅、大平层、公寓空间、户型方案、收纳系统和动线优化，帮助业主在装修前梳理生活习惯、预算边界、风格方向与落地节奏。">
<meta name="keywords" content="室内设计服务,私宅设计,改善型住宅设计,大平层设计,公寓设计,户型优化">
<link rel="canonical" href="https://dongyandesign.cn/services/">
```

### 常见问题
URL：https://dongyandesign.cn/faq/

```html
<title>常见问题｜董揅设计室内设计咨询</title>
<meta name="description" content="董揅设计常见问题，解答室内设计咨询从哪里开始、空间辑选和方案辑选区别、适合哪些住宅项目、常州及江浙沪服务范围，以及装修前如何准备户型、预算和生活需求。">
<meta name="keywords" content="室内设计咨询,装修设计问题,空间辑选,方案辑选,董揅设计常见问题">
<link rel="canonical" href="https://dongyandesign.cn/faq/">
```

### 设计札记
URL：https://dongyandesign.cn/notes/

```html
<title>设计札记｜董揅设计</title>
<meta name="description" content="董揅设计札记，记录室内设计学习、厨房收纳、橱柜布局、材料理解、空间观察和住宅生活方式，把日常设计经验整理成客户能读懂、搜索引擎和 AI 也能理解的内容。">
<meta name="keywords" content="设计札记,室内设计学习,空间设计思考,GEO内容,董揅设计">
<link rel="canonical" href="https://dongyandesign.cn/notes/">
```

### 关于董揅
URL：https://dongyandesign.cn/about/

```html
<title>关于董揅｜董揅设计室内空间设计顾问</title>
<meta name="description" content="关于董揅，记录董揅设计从设计助理到室内空间设计顾问的经历，关注常州及江浙沪私宅、大平层、改善型住宅、公寓设计、户型优化、收纳系统、材料搭配和长期居住体验。">
<meta name="keywords" content="董揅设计,关于董揅,室内设计师,私宅设计,住宅设计顾问,常州室内设计">
<link rel="canonical" href="https://dongyandesign.cn/about/">
```

### 空间案例 space-001
URL：https://dongyandesign.cn/cases/space-001

```html
<title>自然序曲｜私宅设计｜董揅设计案例001</title>
<meta name="description" content="自然序曲是董揅私宅设计案例，位于上海静安，面积180平方米。案例以弧形顶面、浅色石材、木色墙面和低矮家具组织开阔客厅，让会客、阅读、用餐与独处在同一空间自然发生，适合关注温润材质、空间比例和现代住宅气质的业主参考。">
<meta name="keywords" content="董揅设计,自然序曲,私宅设计,空间案例,住宅设计,室内设计案例">
<link rel="canonical" href="https://dongyandesign.cn/cases/space-001">
```

### 空间案例 space-002
URL：https://dongyandesign.cn/cases/space-002

```html
<title>云境公馆｜大平层设计｜董揅设计案例002</title>
<meta name="description" content="云境公馆是董揅大平层设计案例，位于杭州钱江新城，面积220平方米。案例以灰色、木色和金属线条建立冷静秩序，让餐桌、岛台与客厅保持连续，兼顾家庭日常、社交会客和私密休息，适合关注大平层尺度、公共区动线和材质质感的业主参考。">
<meta name="keywords" content="董揅设计,云境公馆,大平层设计,空间案例,住宅设计,室内设计案例">
<link rel="canonical" href="https://dongyandesign.cn/cases/space-002">
```

### 空间案例 space-003
URL：https://dongyandesign.cn/cases/space-003

```html
<title>松弛之家｜改善型住宅｜董揅设计案例003</title>
<meta name="description" content="松弛之家是董揅改善型住宅案例，位于苏州金鸡湖，面积150平方米。案例以木格栅、白色柜体和柔软织物降低空间压力，让餐厨与客厅保持开放互动，同时把收纳藏进立面，适合关注亲子陪伴、轻松客餐厅和旧房改善的业主参考。">
<meta name="keywords" content="董揅设计,松弛之家,改善型住宅,空间案例,住宅设计,室内设计案例">
<link rel="canonical" href="https://dongyandesign.cn/cases/space-003">
```

### 空间案例 space-004
URL：https://dongyandesign.cn/cases/space-004

```html
<title>湖畔平层｜大平层设计｜董揅设计案例004</title>
<meta name="description" content="湖畔平层是董揅大平层设计案例，位于杭州西湖，面积353平方米。案例以安静留白为核心，用柔和墙面承接自然光，减少过多装饰，把重点放在比例、线条、柜体收口和材质交接，适合关注长期居住、干净视觉和舒展尺度的业主参考。">
<meta name="keywords" content="董揅设计,湖畔平层,大平层设计,空间案例,住宅设计,室内设计案例">
<link rel="canonical" href="https://dongyandesign.cn/cases/space-004">
```

### 空间案例 space-005
URL：https://dongyandesign.cn/cases/space-005

```html
<title>静谧套房｜住宅设计｜董揅设计案例005</title>
<meta name="description" content="静谧套房是董揅住宅设计案例，位于常州，面积120平方米。案例把卧室作为一天的收口来设计，以低饱和色、柔软墙面和隐藏式灯光减少外界刺激，重点处理夜间动线、床边尺度、收纳和光线控制，适合关注卧室套房舒适度的业主参考。">
<meta name="keywords" content="董揅设计,静谧套房,住宅设计,空间案例,住宅设计,室内设计案例">
<link rel="canonical" href="https://dongyandesign.cn/cases/space-005">
```

### 空间案例 space-006
URL：https://dongyandesign.cn/cases/space-006

```html
<title>城市公寓｜公寓设计｜董揅设计案例006</title>
<meta name="description" content="城市公寓是董揅公寓设计案例，位于南京，面积98平方米。案例在有限面积里组织完整生活，以奶油色立面、弧形门洞和集成收纳让小空间更轻盈，并明确餐厨、卧室和过道边界，适合年轻家庭、独居改善和小户型公寓装修参考。">
<meta name="keywords" content="董揅设计,城市公寓,公寓设计,空间案例,住宅设计,室内设计案例">
<link rel="canonical" href="https://dongyandesign.cn/cases/space-006">
```

### 空间案例 space-007
URL：https://dongyandesign.cn/cases/space-007

```html
<title>木色秩序｜改善型住宅｜董揅设计案例007</title>
<meta name="description" content="木色秩序是董揅改善型住宅案例，位于苏州，面积165平方米。案例聚焦餐厨关系，以木作、石材和黑色线条划分区域，同时保持备餐、用餐和聊天动线连续。岛台与餐桌承担社交中心，背后收纳系统隐藏生活杂物，适合餐厨改造参考。">
<meta name="keywords" content="董揅设计,木色秩序,改善型住宅,空间案例,住宅设计,室内设计案例">
<link rel="canonical" href="https://dongyandesign.cn/cases/space-007">
```

### 空间案例 space-008
URL：https://dongyandesign.cn/cases/space-008

```html
<title>光影客厅｜私宅设计｜董揅设计案例008</title>
<meta name="description" content="光影客厅是董揅私宅设计案例，位于上海，面积140平方米。案例用光线组织客厅空间，通过大面窗帘、低矮家具和柔和墙面减轻拥挤感，并在电视墙、沙发、边柜和单椅之间保留舒适距离，适合关注客厅采光、动线和放松感的业主参考。">
<meta name="keywords" content="董揅设计,光影客厅,私宅设计,空间案例,住宅设计,室内设计案例">
<link rel="canonical" href="https://dongyandesign.cn/cases/space-008">
```

### 空间案例 space-009
URL：https://dongyandesign.cn/cases/space-009

```html
<title>餐厨生活｜大平层设计｜董揅设计案例009</title>
<meta name="description" content="餐厨生活是董揅大平层设计案例，位于杭州，面积188平方米。案例把餐厨区作为家庭主场，餐桌兼具吃饭、聊天、办公和亲子手工功能，厨房与餐区保持互动，并通过木色、石材、灯具和柜体线条控制温度与秩序，适合餐厨一体化参考。">
<meta name="keywords" content="董揅设计,餐厨生活,大平层设计,空间案例,住宅设计,室内设计案例">
<link rel="canonical" href="https://dongyandesign.cn/cases/space-009">
```

### 空间案例 space-010
URL：https://dongyandesign.cn/cases/space-010

```html
<title>雅致私宅｜私宅设计｜董揅设计案例010</title>
<meta name="description" content="雅致私宅是董揅私宅设计案例，位于常州，面积130平方米。案例重视细节里的体面，通过木作比例、石材肌理、灯光层级、柜体五金和收口处理保持清爽克制，把预算放在长期可感知的位置，适合关注品质但不喜欢浮夸的业主参考。">
<meta name="keywords" content="董揅设计,雅致私宅,私宅设计,空间案例,住宅设计,室内设计案例">
<link rel="canonical" href="https://dongyandesign.cn/cases/space-010">
```

### 空间案例 space-011
URL：https://dongyandesign.cn/cases/space-011

```html
<title>现代居所｜住宅设计｜董揅设计案例011</title>
<meta name="description" content="现代居所是董揅住宅设计案例，位于南京，面积160平方米。案例强调清晰生活秩序，让客厅、书房和餐厅既独立又互相借景，以干净线条、浅色墙面、木色与软装降低压迫并保留温度，适合希望住宅高级但不拘束的业主参考。">
<meta name="keywords" content="董揅设计,现代居所,住宅设计,空间案例,住宅设计,室内设计案例">
<link rel="canonical" href="https://dongyandesign.cn/cases/space-011">
```

### 空间案例 space-012
URL：https://dongyandesign.cn/cases/space-012

```html
<title>温润之家｜改善型住宅｜董揅设计案例012</title>
<meta name="description" content="温润之家是董揅改善型住宅案例，位于苏州，面积145平方米。案例把亲子生活放在前面考虑，让公共空间保持开放以方便陪伴交流，同时保留安静卧室和独立区域，并通过柔和色彩、可成长收纳和可调整房间功能回应长期家庭生活。">
<meta name="keywords" content="董揅设计,温润之家,改善型住宅,空间案例,住宅设计,室内设计案例">
<link rel="canonical" href="https://dongyandesign.cn/cases/space-012">
```

### 方案案例 scheme-001
URL：https://dongyandesign.cn/cases/scheme-001

```html
<title>格局推演｜方案设计｜董揅设计案例001</title>
<meta name="description" content="格局推演是董揅户型方案案例，从原始结构出发梳理公共区、卧室、收纳和居住动线关系。通过平面方案把墙体、家具尺度、功能分区和通道宽度放在一起比较，帮助业主在装修前判断户型优化方向，适合私宅、大平层、公寓和改善型住宅参考。">
<meta name="keywords" content="董揅设计,格局推演,方案设计,户型优化,平面方案,室内设计方案">
<link rel="canonical" href="https://dongyandesign.cn/cases/scheme-001">
```

### 方案案例 scheme-002
URL：https://dongyandesign.cn/cases/scheme-002

```html
<title>功能重组｜方案设计｜董揅设计案例002</title>
<meta name="description" content="功能重组是董揅设计户型方案案例，重点围绕客餐厅关系、休息区比例、收纳系统和家庭成员动线重新组织空间功能。通过平面方案推演，帮助业主在装修前看清功能分区、家具尺度和后续深化方向，适合私宅、大平层、公寓和改善型住宅参考。">
<meta name="keywords" content="董揅设计,功能重组,方案设计,户型优化,平面方案,室内设计方案">
<link rel="canonical" href="https://dongyandesign.cn/cases/scheme-002">
```

### 方案案例 scheme-003
URL：https://dongyandesign.cn/cases/scheme-003

```html
<title>动线优化｜方案设计｜董揅设计案例003</title>
<meta name="description" content="动线优化是董揅设计户型方案案例，重点观察玄关、餐厨、卧室、卫生间和公共区之间的使用路径，把日常高频路线先处理顺。通过平面方案推演，提前判断通道宽度、功能顺序、收纳位置和家具尺度，适合准备装修、旧房改善和大平层方案优化的业主参考。">
<meta name="keywords" content="董揅设计,动线优化,方案设计,户型优化,平面方案,室内设计方案">
<link rel="canonical" href="https://dongyandesign.cn/cases/scheme-003">
```

### 方案案例 scheme-004
URL：https://dongyandesign.cn/cases/scheme-004

```html
<title>套房规划｜方案设计｜董揅设计案例004</title>
<meta name="description" content="套房规划是董揅户型方案案例，围绕主卧、衣帽间、卫浴和休闲区之间的组合关系推敲私密空间尺度。通过平面方案比较开合关系、收纳位置、采光路径和活动区比例，帮助业主在装修前判断套房是否舒适、独立且便于长期使用。">
<meta name="keywords" content="董揅设计,套房规划,方案设计,户型优化,平面方案,室内设计方案">
<link rel="canonical" href="https://dongyandesign.cn/cases/scheme-004">
```

### 方案案例 scheme-005
URL：https://dongyandesign.cn/cases/scheme-005

```html
<title>家庭尺度｜方案设计｜董揅设计案例005</title>
<meta name="description" content="家庭尺度是董揅户型方案案例，以长期居住为核心，平衡公共互动、独立休息、收纳系统和弹性功能之间的比例。通过平面方案保留户型边界和主要尺寸，帮助业主判断家庭成员使用路径、空间尺度和后续深化方向。">
<meta name="keywords" content="董揅设计,家庭尺度,方案设计,户型优化,平面方案,室内设计方案">
<link rel="canonical" href="https://dongyandesign.cn/cases/scheme-005">
```

### 方案案例 scheme-006
URL：https://dongyandesign.cn/cases/scheme-006

```html
<title>大宅推敲｜方案设计｜董揅设计案例006</title>
<meta name="description" content="大宅推敲是董揅户型方案案例，针对大平层和大尺度住宅先建立主次动线，再组织会客、休闲、收纳、家政和套房关系。通过方案图把复杂空间拆成可讨论的层次，帮助业主看懂每个区域的使用方式和户型优化取舍。">
<meta name="keywords" content="董揅设计,大宅推敲,方案设计,户型优化,平面方案,室内设计方案">
<link rel="canonical" href="https://dongyandesign.cn/cases/scheme-006">
```

### 设计札记 kitchen-cabinet-design-1
URL：https://dongyandesign.cn/notes/kitchen-cabinet-design-1/

```html
<title>厨房好不好用，先看橱柜怎么设计｜董揅札记</title>
<meta name="description" content="董揅札记围绕厨房橱柜设计、U 型厨房、一金二银台面区域、操作台高度和吊柜取放尺度，梳理厨房好不好用的关键，适合装修前判断厨房布局和收纳规划。">
<meta name="keywords" content="厨房橱柜设计,厨房布局,U型厨房,一金二银,厨房收纳,操作台高度,董揅札记">
<link rel="canonical" href="https://dongyandesign.cn/notes/kitchen-cabinet-design-1/">
```

### 设计札记 kitchen-cabinet-design-2
URL：https://dongyandesign.cn/notes/kitchen-cabinet-design-2/

```html
<title>厨房怎么收纳？从我自己厨房的改动说起｜董揅札记</title>
<meta name="description" content="董揅札记基于实景图和设计整理厨房收纳札记，围绕15cm超薄柜、地柜抽屉、分隔件、消毒柜、洗碗机、柜底灯和吊柜竖放收纳，梳理厨房地柜怎么收纳才顺手。">
<meta name="keywords" content="厨房地柜收纳,厨房抽屉设计,橱柜收纳,15cm超薄柜,消毒柜,洗碗机,柜底灯,吊柜收纳,董揅札记">
<link rel="canonical" href="https://dongyandesign.cn/notes/kitchen-cabinet-design-2/">
```

### 设计札记 kitchen-open-layout-3
URL：https://dongyandesign.cn/notes/kitchen-open-layout-3/

```html
<title>厨房要不要打开？先看餐厨怎么交流｜董揅札记</title>
<meta name="description" content="董揅札记围绕开放式厨房、封闭式厨房和可分可合厨房，整理室内窗、移门、餐厨一体、柜台、水槽和餐桌坐姿这些影响餐厨交流的设计判断。">
<meta name="keywords" content="开放式厨房,半开放厨房,可分可合厨房,餐厨一体,厨房室内窗,厨房移门,厨房吧台,董揅札记">
<link rel="canonical" href="https://dongyandesign.cn/notes/kitchen-open-layout-3/">
```

## 图片 Alt 与 WebP 路径

本次新增餐厨交流札记实际使用 29 张厨房札记图片，均已上传至 OSS，并已在页面中写入对应 alt；未使用图片不保留在本地素材、网站目录或 OSS。下面是全站可直接放入页面的示例：

```html
<img src="https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/assets/logo/dong-design-wordmark-light.png" alt="董揅设计品牌标识，室内空间与方案设计" loading="lazy" decoding="async" />
<img src="https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/assets/images/dong-yan-portrait-web.webp" alt="董揅设计师形象照，室内空间设计顾问" loading="lazy" decoding="async" />
<img src="https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/assets/images/qr-contact-light.png" alt="董揅设计咨询微信二维码" loading="lazy" decoding="async" />
<img src="https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/space-selection/nature-rhythm/optimized/medium/03778B94-D40C-4256-991A-AA0CE21DF340.webp" alt="自然序曲私宅设计空间案例第1张，展示上海 · 静安住宅的光线、材质、比例与生活场景" loading="lazy" decoding="async" />
<img src="https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/space-selection/nature-rhythm/optimized/medium/262D37B7-933E-42D3-B328-356168A7E261.webp" alt="自然序曲私宅设计空间案例第2张，展示上海 · 静安住宅的光线、材质、比例与生活场景" loading="lazy" decoding="async" />
<img src="https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/space-selection/nature-rhythm/optimized/medium/2E665617-915C-4A78-A13E-294DA169577A.webp" alt="自然序曲私宅设计空间案例第3张，展示上海 · 静安住宅的光线、材质、比例与生活场景" loading="lazy" decoding="async" />
<img src="https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/space-selection/nature-rhythm/optimized/medium/369473E6-2D70-4C67-A9D8-5B15F032D920.webp" alt="自然序曲私宅设计空间案例第4张，展示上海 · 静安住宅的光线、材质、比例与生活场景" loading="lazy" decoding="async" />
<img src="https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/space-selection/nature-rhythm/optimized/medium/3967872F-2CA1-4324-AE47-6A4E70EA21A6.webp" alt="自然序曲私宅设计空间案例第5张，展示上海 · 静安住宅的光线、材质、比例与生活场景" loading="lazy" decoding="async" />
<img src="https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/space-selection/nature-rhythm/optimized/medium/3CAD64A8-51E0-40D4-8F87-FE240DEDA22A.webp" alt="自然序曲私宅设计空间案例第6张，展示上海 · 静安住宅的光线、材质、比例与生活场景" loading="lazy" decoding="async" />
<img src="https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/space-selection/nature-rhythm/optimized/medium/5F820263-0B5C-4F9D-89A1-228984279CC0.webp" alt="自然序曲私宅设计空间案例第7张，展示上海 · 静安住宅的光线、材质、比例与生活场景" loading="lazy" decoding="async" />
<img src="https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/space-selection/nature-rhythm/optimized/medium/63A3BCF0-AB57-4D25-937E-B686D0BE9356.webp" alt="自然序曲私宅设计空间案例第8张，展示上海 · 静安住宅的光线、材质、比例与生活场景" loading="lazy" decoding="async" />
<img src="https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/space-selection/nature-rhythm/optimized/medium/698CA023-8BDE-4FDE-AD4D-F5934E1BCA65.webp" alt="自然序曲私宅设计空间案例第9张，展示上海 · 静安住宅的光线、材质、比例与生活场景" loading="lazy" decoding="async" />
```

## URL 提交清单

完整提交列表见 `urls.txt`。
