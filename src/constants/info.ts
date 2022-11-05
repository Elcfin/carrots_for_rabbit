export type GradeType = "大一" | "大二" | "大三" | "大四" | "研究生" | "其他";

export const GRADELIST: GradeType[] = [
  "大一",
  "大二",
  "大三",
  "大四",
  "研究生",
  "其他",
];

export type MajorType =
  | "哲学"
  | "经济学"
  | "法学"
  | "教育学"
  | "文学"
  | "历史学"
  | "理学"
  | "工学"
  | "农学"
  | "医学"
  | "军事学"
  | "管理学"
  | "艺术学"
  | "交叉学科";

export const MAJORLIST: MajorType[] = [
  "哲学",
  "经济学",
  "法学",
  "教育学",
  "文学",
  "历史学",
  "理学",
  "工学",
  "农学",
  "医学",
  "军事学",
  "管理学",
  "艺术学",
  "交叉学科",
];

export type TagNameType =
  /* 
  理论指一些与概念相关的内容
  实践指与编程相关的内容
    */
  | "理论"
  | "实践"
  /* 一些分类，或许是一些非计算机专业学生会学习的与计算机相关的课程名称，我不知道还有什么 */
  | "算法"
  | "数据结构"
  | "数据库"
  /* 一些常用编程语言，暂时能想到的 */
  | "C/C++"
  | "Java"
  | "Python"
  | "其他语言"
  /* 一些与环境配置相关的标签 */
  | "环境配置";

export const TAGNAMELIST: TagNameType[] = [
  "理论",
  "实践",
  "算法",
  "数据结构",
  "数据库",
  "C/C++",
  "Java",
  "Python",
  "其他语言",
  "环境配置",
];

export type TagInfoItemType = {
  name: TagNameType;
  desc: string;
};

export const TAGINFOLIST: TagInfoItemType[] = [
  { name: "理论", desc: "在这里探讨一些与概念相关的问题 (•̤̀ᵕ•̤́๑) " },
  { name: "实践", desc: "在实际编程中遇到了一些问题，来这里看看吧 (*•̀ᴗ•́*)و ̑̑" },
  {
    name: "算法",
    desc: "指解题方案的准确而完整的描述，是一系列解决问题的清晰指令，算法代表着用系统的方法描述解决问题的策略机制٩(๑´0`๑)۶ ",
  },
  { name: "数据结构", desc: "计算机中存储、组织数据的方式 ∠( ᐛ 」∠)＿ " },
  {
    name: "数据库",
    desc: "按照数据结构来组织、存储和管理数据的仓库  - ̗̀(๑ᵔ⌔ᵔ๑)",
  },
  { name: "C/C++", desc: "或许是你学习的第一门程序设计语言 | ू•ૅω•́)ᵎᵎᵎ" },
  {
    name: "Java",
    desc: "一种可以撰写跨平台应用软件的面向对象的程序设计语言 ૧(●´৺`●)૭",
  },
  { name: "Python", desc: "一种相当高级的语言，有许多奇妙的语法 Σ(|||▽||| )" },
  {
    name: "其他语言",
    desc: "JavaScript、C#、GoLang……你是否在寻找他们 (●°u°●)​ 」",
  },
  {
    name: "环境配置",
    desc: "程序运行报错，看看是不是环境配置出了问题 (*｀へ´*) ",
  },
];

export type AvatarUrlType =
  | "http://img.elcfin.cn/image/avatar/avatar0.jpg"
  | "http://img.elcfin.cn/image/avatar/avatar1.jpg"
  | "http://img.elcfin.cn/image/avatar/avatar2.jpg";

export const AVATARURLLIST: AvatarUrlType[] = [
  "http://img.elcfin.cn/image/avatar/avatar0.jpg",
  "http://img.elcfin.cn/image/avatar/avatar1.jpg",
  "http://img.elcfin.cn/image/avatar/avatar2.jpg",
];
