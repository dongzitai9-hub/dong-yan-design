(() => {
  const logoUrl =
    "https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/assets/logo/dong-design-wordmark-light.png?v=20260614";

  const spaces = [
    { href: "/cases/space-015/", title: "静蓝之家" },
    { href: "/cases/space-014/", title: "柔序之家" },
    { href: "/cases/space-012/", title: "温润之家" },
    { href: "/cases/anli-09/", title: "深序客厅" },
    { href: "/cases/anli-10/", title: "弧光艺宅" },
    { href: "/cases/anli-11/", title: "白屿之家" },
    { href: "/cases/anli-12/", title: "云岸之家" },
    { href: "/cases/anli-14/", title: "城市书厅" },
    { href: "/cases/anli-15/", title: "墨石雅居" },
    { href: "/cases/anli-16/", title: "温润之家" },
    { href: "/cases/anli-22/", title: "暖木小筑" },
    { href: "/cases/anli-23/", title: "红椅之境" },
    { href: "/cases/anli-24/", title: "挑空府邸" },
    { href: "/cases/anli-28/", title: "绯椅公馆" },
    { href: "/cases/anli-30/", title: "艺术平层" },
    { href: "/cases/anli-31/", title: "柔木晴居" },
    { href: "/cases/anli-32/", title: "弧序雅宅" },
    { href: "/cases/anli-33/", title: "清和之家" },
    { href: "/cases/anli-37/", title: "穹光会所" },
    { href: "/cases/anli-39/", title: "庭院栖居" },
    { href: "/cases/anli-41/", title: "书墙之家" },
    { href: "/cases/anli-42/", title: "白阶之家" },
    { href: "/cases/anli-43/", title: "云顶私宅" },
    { href: "/cases/anli-44/", title: "海湾墅居" },
  ];

  const plans = [
    { href: "/cases/scheme-001/", title: "格局推演" },
    { href: "/cases/scheme-002/", title: "功能重组" },
    { href: "/cases/scheme-003/", title: "动线优化" },
    { href: "/cases/scheme-004/", title: "套房规划" },
    { href: "/cases/scheme-005/", title: "家庭尺度" },
    { href: "/cases/scheme-006/", title: "大宅推敲" },
  ];

  const notes = [
    { href: "/notes/color-selection-1/", title: "颜色怎么选？我的理解思路（一）" },
    { href: "/notes/style-selection-5/", title: "选什么风格？我的理解思路（二）" },
    { href: "/notes/style-selection-4/", title: "选什么风格？我的理解思路（一）" },
    { href: "/notes/kitchen-open-layout-3/", title: "厨房要不要打开？先看餐厨怎么交流" },
    { href: "/notes/kitchen-cabinet-design-2/", title: "厨房怎么收纳？从我自己厨房的改动说起" },
    { href: "/notes/kitchen-cabinet-design-1/", title: "厨房好不好用，先看橱柜怎么设计" },
    { href: "/notes/", title: "全部札记" },
  ];

  const contacts = [
    { href: "/faq/", title: "常见问题" },
    { href: "/contact/", title: "联系咨询" },
  ];

  const brand = {
    name: "董揅",
    englishName: "Dongyan Design",
    logoAlt: "董揅 Dongyan Design",
  };

  const legalFooter = {
    copyright: "© 董揅 DONGYAN DESIGN",
    records: [
      { href: "https://beian.miit.gov.cn", title: "苏ICP备2026037309号-2" },
      {
        href: "https://beian.mps.gov.cn/#/query/webSearch?code=32041202004025",
        title: "苏公网安备32041202004025号",
      },
    ],
  };

  window.DONGYAN_SITE_DATA = Object.freeze({
    brand: Object.freeze(brand),
    logoUrl,
    legalFooter: Object.freeze({
      copyright: legalFooter.copyright,
      records: Object.freeze(legalFooter.records.map((record) => Object.freeze(record))),
    }),
    primary: Object.freeze([
      { href: "/", title: "主页" },
      { href: "/cases/", title: "空间" },
      { href: "/plans/", title: "方案" },
      { href: "/notes/", title: "设计札记" },
      { href: "/contact/", title: "咨询" },
    ]),
    nav: Object.freeze({
      spaces: Object.freeze(spaces),
      plans: Object.freeze(plans),
      notes: Object.freeze(notes),
      contacts: Object.freeze(contacts),
    }),
  });
})();
