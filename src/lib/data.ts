export const SUBJECTS_LOWER = ["chinese", "english", "math", "general"] as const;
export const SUBJECTS_UPPER = ["chinese", "english", "math", "general", "science", "humanities", "cs"] as const;

export const SUBJECT_META: Record<string, { emoji: string; color: string; slug: string }> = {
  chinese: { emoji: "📖", color: "coral", slug: "chinese" },
  english: { emoji: "🔤", color: "sky", slug: "english" },
  math: { emoji: "🧮", color: "sunny", slug: "mathematics" },
  general: { emoji: "🌏", color: "mint", slug: "general-studies" },
  science: { emoji: "🔬", color: "lavender", slug: "science" },
  humanities: { emoji: "🏛️", color: "coral", slug: "humanities" },
  cs: { emoji: "💻", color: "sky", slug: "cs-ai" },
};

export const SUBJECT_BY_SLUG: Record<string, keyof typeof SUBJECT_META> = Object.fromEntries(
  Object.entries(SUBJECT_META).map(([k, v]) => [v.slug, k as any])
);

export const TUTORS = ["Ms. Chan", "Mr. Wong", "Ms. Lee", "Mr. Cheung", "Ms. Ho", "Mr. Lam"];
export const STUDENTS = ["Emily", "Marcus", "Sophia", "Kai", "Yuki", "Aaron", "Mia", "Ethan"];
export const SCHOOLS = ["Sunshine Primary", "Rainbow Academy", "Lakeside School", "Greenhill Primary"];

export const NOTE_TITLES_EN = [
  "Fractions Made Easy 🍕", "5 Tips for Better English Essays", "How Plants Breathe — With Diagrams",
  "Multiplication Tricks", "Solar System Basics", "Phonics Fun: Vowels",
];
export const NOTE_TITLES_ZH = [
  "中文作文常用成語 100 個", "分數一點就明 🍕", "英文作文 5 大技巧",
  "植物呼吸圖解", "九九乘法表速記", "太陽系入門",
];

export const GAME_TITLES = [
  { en: "Math Monster Battle", zh: "數學怪獸大戰", emoji: "👾" },
  { en: "Spelling Space Adventure", zh: "拼字太空歷險", emoji: "🚀" },
  { en: "Idiom Chain Challenge", zh: "成語接龍挑戰", emoji: "🐉" },
  { en: "Plant Quest", zh: "植物大冒險", emoji: "🌱" },
  { en: "Number Ninja", zh: "數字忍者", emoji: "🥷" },
  { en: "Word Wizard", zh: "字詞魔法師", emoji: "🧙" },
];

export const DISCUSSION_TOPICS = [
  { en: "How do you memorize multiplication tables?", zh: "點樣記住乘法表？" },
  { en: "What's your favorite Chinese poem?", zh: "你最喜歡邊首中文詩？" },
  { en: "Need help with Science homework Q5", zh: "科學功課第5題求救" },
  { en: "Best tips for spelling tests?", zh: "默書高分秘笈？" },
  { en: "How to draw a perfect circle?", zh: "點樣畫到完美嘅圓形？" },
];

export const VIDEOS = [
  { title: { en: "Intro to Fractions", zh: "分數初步" }, src: "Rainbow Original", dur: "4:32", views: "12k" },
  { title: { en: "Photosynthesis Explained", zh: "光合作用解說" }, src: "YouTube", dur: "6:15", views: "34k" },
  { title: { en: "English Reading Aloud", zh: "英文朗讀練習" }, src: "Rainbow Original", dur: "3:48", views: "8.2k" },
  { title: { en: "Solar System Tour", zh: "太陽系之旅" }, src: "YouTube", dur: "9:02", views: "55k" },
  { title: { en: "Long Division Trick", zh: "長除法技巧" }, src: "Rainbow Original", dur: "5:20", views: "21k" },
  { title: { en: "Chinese Stroke Order", zh: "中文筆順示範" }, src: "Rainbow Original", dur: "7:11", views: "18k" },
];

export const WEBSITES = [
  { title: "BBC Bitesize", url: "bbc.co.uk/bitesize", desc: { en: "Free curriculum-aligned lessons.", zh: "免費課程對應教材。" } },
  { title: "Khan Academy Kids", url: "khanacademykids.org", desc: { en: "Interactive lessons for primary.", zh: "小學生互動學習。" } },
  { title: "教育局學與教資源", url: "edb.gov.hk", desc: { en: "Hong Kong EDB resources.", zh: "香港教育局學與教資源。" } },
  { title: "Storyline Online", url: "storylineonline.net", desc: { en: "Stars read books aloud.", zh: "明星朗讀故事書。" } },
  { title: "National Geographic Kids", url: "kids.nationalgeographic.com", desc: { en: "Fun science & nature.", zh: "趣味科學與自然。" } },
];

export const COLOR_BG: Record<string, string> = {
  coral: "bg-coral/15 text-coral-foreground border-coral/30",
  sky: "bg-sky/15 border-sky/30",
  sunny: "bg-sunny/25 border-sunny/40",
  mint: "bg-mint/20 border-mint/40",
  lavender: "bg-lavender/15 text-lavender-foreground border-lavender/30",
};

export function avatar(name: string) {
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`;
}
