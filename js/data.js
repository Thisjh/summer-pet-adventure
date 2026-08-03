/**
 * 数据定义文件
 * 包含任务、宠物、食物、学习内容等所有数据
 */

// ========== 每日任务 ==========
const DAILY_TASKS = [
  { id: 't1', name: '刷牙洗脸 / 吃早餐', icon: '🪥', reward: 2, category: 'morning' },
  { id: 't2', name: '换衣服', icon: '👕', reward: 1, category: 'morning' },
  { id: 't3', name: '叠被子', icon: '🛏️', reward: 2, category: 'morning' },
  { id: 't4', name: '早上阅读十五分钟', icon: '📖', reward: 3, category: 'morning' },
  { id: 't5', name: '做作业二十分钟', icon: '✏️', reward: 5, category: 'study' },
  { id: 't6', name: '每日运动', icon: '⚽', reward: 3, category: 'daytime' },
  { id: 't7', name: '下午收衣服 / 做家务', icon: '🏠', reward: 3, category: 'afternoon' },
  { id: 't8', name: '下午阅读十五分钟', icon: '📚', reward: 3, category: 'afternoon' },
  { id: 't9', name: '晚上收拾玩具桌', icon: '🧸', reward: 2, category: 'evening' },
  { id: 't10', name: '晚上10点前停止手机平板', icon: '📵', reward: 2, category: 'evening' },
  { id: 't11', name: '按时睡觉', icon: '😴', reward: 2, category: 'evening' },
];

const TASK_CATEGORIES = {
  morning: { name: '早起任务', icon: '🌅', color: '#FFB347' },
  study: { name: '学习任务', icon: '📝', color: '#5B9BD5' },
  daytime: { name: '白天活动', icon: '☀️', color: '#FFD700' },
  afternoon: { name: '下午任务', icon: '🌇', color: '#FF8C69' },
  evening: { name: '晚间任务', icon: '🌙', color: '#9B7EDE' },
};

// ========== 宠物商店 ==========
const PETS = [
  { id: 'p1', name: '小蝴蝶', emoji: '🦋', price: 15, desc: '彩色翅膀的小蝴蝶，喜欢花蜜', rarity: '普通' },
  { id: 'p2', name: '小猫咪', emoji: '🐱', price: 20, desc: '软绵绵的小猫咪，爱打呼噜', rarity: '普通' },
  { id: 'p3', name: '小狗狗', emoji: '🐶', price: 20, desc: '忠诚的小狗狗，最爱摇尾巴', rarity: '普通' },
  { id: 'p4', name: '小兔子', emoji: '🐰', price: 25, desc: '蹦蹦跳跳的小兔子，爱啃胡萝卜', rarity: '普通' },
  { id: 'p5', name: '小恐龙', emoji: '🦕', price: 35, desc: '绿色的小恐龙，虽然小但很勇敢', rarity: '稀有' },
  { id: 'p6', name: '金翅大鹏', emoji: '🦅', price: 40, desc: '天上神鸟大鹏金翅，展翅九万里', rarity: '稀有' },
  { id: 'p7', name: '九天仙鹤', emoji: '🕊️', price: 55, desc: '九天之上的仙鹤，仙气飘飘守护平安', rarity: '史诗' },
  { id: 'p8', name: '小火龙', emoji: '🐉', price: 50, desc: '会喷小火苗的小龙，尾巴会发光', rarity: '稀有' },
  { id: 'p9', name: '独角兽', emoji: '🦄', price: 65, desc: '彩虹独角兽，会施展魔法', rarity: '史诗' },
  { id: 'p10', name: '不死鸟', emoji: '🦅', price: 80, desc: '浴火重生永恒不灭，光芒照耀九重天', rarity: '传说' },
  { id: 'p11', name: '星精灵', emoji: '⭐', price: 60, desc: '从星星里诞生的精灵，会许愿', rarity: '史诗' },
  { id: 'p12', name: '小企鹅', emoji: '🐧', price: 30, desc: '南极来的小企鹅，爱滑冰', rarity: '普通' },
  { id: 'p13', name: '皮卡丘', emoji: '⚡', price: 70, desc: '十万伏特的萌神，脸颊红扑扑', rarity: '史��' },
  { id: 'p14', name: '小海豚', emoji: '🐬', price: 35, desc: '聪明伶俐的小海豚，会顶球', rarity: '普通' },
  { id: 'p15', name: '小仓鼠', emoji: '🐹', price: 18, desc: '圆滚滚的小可爱，最爱藏食物', rarity: '普通' },
  { id: 'p16', name: '小熊猫', emoji: '🐼', price: 45, desc: '黑白相间的国宝，憨态可掬', rarity: '稀有' },
  { id: 'p17', name: '小老虎', emoji: '🐯', price: 50, desc: '威风凛凛的小老虎，森林之王', rarity: '稀有' },
  { id: 'p18', name: '水精灵', emoji: '💧', price: 60, desc: '水做的精灵，会变成各种形状', rarity: '史诗' },
  { id: 'p19', name: '小狐狸', emoji: '🦊', price: 30, desc: '机智的小狐狸，尾巴蓬松柔软', rarity: '普通' },
  { id: 'p20', name: '神龙', emoji: '🐲', price: 100, desc: '传说中的神龙，呼风唤雨', rarity: '传说' },
  // ===== 天上飞的 — 飞禽 =====
  { id: 'p21', name: '小鹦鹉', emoji: '🦜', price: 20, desc: '会学说话的小鹦鹉，聪明伶俐', rarity: '普通' },
  { id: 'p22', name: '猫头鹰', emoji: '🦉', price: 40, desc: '智慧的夜行者，大眼睛会发光', rarity: '稀有' },
  { id: 'p23', name: '小浣熊', emoji: '🦝', price: 35, desc: '圆脸小馋猫，爱洗东西超可爱', rarity: '稀有' },
  { id: 'p24', name: '孔雀', emoji: '🦚', price: 70, desc: '开屏时美如彩虹，华丽至极', rarity: '史诗' },
  { id: 'p25', name: '天鹅', emoji: '🦢', price: 35, desc: '优雅的水上舞者，脖子弯弯', rarity: '稀有' },
  { id: 'p26', name: '火烈鸟', emoji: '🦩', price: 38, desc: '粉红色的长腿大鸟，时髦又可爱', rarity: '稀有' },
  { id: 'p27', name: '啄木鸟', emoji: '🐦', price: 22, desc: '森林医生，啄啄啄不停', rarity: '普通' },
  { id: 'p28', name: '蝙蝠', emoji: '🦇', price: 30, desc: '倒挂着睡觉的小可爱，夜间飞行', rarity: '普通' },
  { id: 'p30', name: '蜜獾平头哥', emoji: '🦡', price: 80, desc: '天不怕地不怕，生死看淡不服就干', rarity: '传说' },
  // ===== 地上走的 — 走兽 =====
  { id: 'p31', name: '小狮子', emoji: '🦁', price: 45, desc: '草原的小王子，蓬松鬃毛', rarity: '稀有' },
  { id: 'p32', name: '小鹿', emoji: '🦌', price: 25, desc: '森林里的精灵，蹦蹦跳跳', rarity: '普通' },
  { id: 'p33', name: '小猴子', emoji: '🐵', price: 22, desc: '聪明又调皮的攀爬高手', rarity: '普通' },
  { id: 'p34', name: '小鳄鱼', emoji: '🐊', price: 42, desc: '慢悠悠的水中猎手', rarity: '稀有' },
  { id: 'p35', name: '小马', emoji: '🐴', price: 28, desc: '自由奔跑的小骏马', rarity: '普通' },
  { id: 'p36', name: '小乌龟', emoji: '🐢', price: 18, desc: '慢动作大师，背上有个小房子', rarity: '普通' },
  { id: 'p37', name: '小象', emoji: '🐘', price: 48, desc: '温柔的庞然大物，长鼻子会喷水', rarity: '稀有' },
  { id: 'p38', name: '小蛇', emoji: '🐍', price: 20, desc: '灵活的爬行高手，嘶嘶嘶', rarity: '普通' },
  { id: 'p39', name: '小刺猬', emoji: '🦔', price: 23, desc: '满身尖刺的小圆球，缩成一团超可爱', rarity: '普通' },
  { id: 'p40', name: '小羊驼', emoji: '🦙', price: 32, desc: '软绵绵的毛茸茸，有点小脾气', rarity: '稀有' },
  { id: 'p41', name: '小狼', emoji: '🐺', price: 50, desc: '月下嚎叫的狼崽，勇敢又团结', rarity: '稀有' },
  { id: 'p42', name: '小斑马', emoji: '🦓', price: 30, desc: '黑白条纹的草原跑者', rarity: '普通' },
  { id: 'p43', name: '小长颈鹿', emoji: '🦒', price: 36, desc: '脖子好长好长，能看到很远的地方', rarity: '稀有' },
  { id: 'p44', name: '白泽', emoji: '🐐', price: 85, desc: '东方智慧神兽，通晓万物天机', rarity: '传说' },
  // ===== 水里游的 — 水族神兽 =====
  { id: 'p45', name: '小鲨鱼', emoji: '🦈', price: 35, desc: '海洋小霸主，牙齿尖尖但很萌', rarity: '普通' },
  { id: 'p46', name: '小章鱼', emoji: '🐙', price: 28, desc: '八条腿的聪明家伙，会喷墨汁', rarity: '普通' },
  { id: 'p47', name: '小河豚', emoji: '🐡', price: 25, desc: '生气就鼓成圆球，气鼓鼓超可爱', rarity: '普通' },
  { id: 'p48', name: '小海豹', emoji: '🦭', price: 20, desc: '圆滚滚会拍手，软乎乎的', rarity: '普通' },
  { id: 'p49', name: '小水母', emoji: '🪼', price: 30, desc: '透明飘逸，像一把会发光的小伞', rarity: '普通' },
  { id: 'p50', name: '鲤鱼精', emoji: '🐟', price: 50, desc: '跃过龙门就能化龙，潜力无限', rarity: '稀有' },
  { id: 'p51', name: '蓝鲸宝宝', emoji: '🐋', price: 55, desc: '海洋巨无霸的宝宝，叫声像唱歌', rarity: '稀有' },
  { id: 'p52', name: '美人鱼', emoji: '🧜', price: 75, desc: '海洋的公主，歌声能让鱼儿跳舞', rarity: '史诗' },
  { id: 'p53', name: '沧龙', emoji: '🐳', price: 85, desc: '远古海洋霸主，从化石中复活', rarity: '传说' },
  { id: 'p54', name: '北海巨妖', emoji: '🦑', price: 90, desc: '北欧神话的深海巨兽，触手遮天', rarity: '传说' },
  // ===== 蛋仔派对 =====
  { id: 'p55', name: '蛋小粉', emoji: '🎀', price: 25, desc: '蛋仔派对粉嫩小公主，反差萌六边形战神', rarity: '稀有' },
  { id: 'p56', name: '蛋小蓝', emoji: '💎', price: 28, desc: '蛋仔派对高冷学霸蓝蛋，头顶博士帽', rarity: '稀有' },
  // ===== 奇幻生物 =====
  { id: 'p57', name: '哥布林', emoji: '👹', price: 35, desc: '绿皮小精灵，爱捣蛋但心眼不坏', rarity: '稀有' },
  { id: 'p58', name: '毒蘑菇', emoji: '🍄', price: 20, desc: '森林里的小毒物，已被驯服不会伤人', rarity: '普通' },
  { id: 'p59', name: '石头人', emoji: '🗿', price: 40, desc: '岩石变的精灵，力大无穷憨厚老实', rarity: '稀有' },
  { id: 'p60', name: '冰霜精灵', emoji: '❄️', price: 55, desc: '冰雪世界的使者，指尖凝结冰霜', rarity: '史诗' },
  { id: 'p61', name: '暗影幽灵', emoji: '👻', price: 60, desc: '月下暗影，来去无踪的神秘灵体', rarity: '史诗' },
  { id: 'p62', name: '小树精', emoji: '🌳', price: 35, desc: '森林里的树精灵，会讲古老的故事', rarity: '稀有' },
  // ===== 扭蛋机专属（仅可兑换，不在商店出售） =====
  { id: 'p63', name: '九天神兽', emoji: '🦖', image: 'assets/jiutian_shenshou.png', price: 0, redeemOnly: true, desc: '集齐10枚神兽碎片召唤的九天神兽，瑞气千条威震四方', rarity: '传说' },
];

const RARITY_CONFIG = {
  '普通': { color: '#888', glow: 'none' },
  '稀有': { color: '#4A90D9', glow: '0 0 10px rgba(74,144,217,0.4)' },
  '史诗': { color: '#9B59B6', glow: '0 0 12px rgba(155,89,182,0.5)' },
  '传说': { color: '#F39C12', glow: '0 0 15px rgba(243,156,18,0.6)' },
};

// ========== 宠物公司岗位 ==========
// action 字段对应 CSS 动画类：singer(唱歌)/chef(炒菜)/guard(巡逻)/courier(搬运)/cleaner(清洁)
// prop 字段为岗位专属动作特效 emoji
const COMPANY_JOBS = [
  { id: 'chef',    name: '厨师', emoji: '🍳', action: 'chef',    prop: '🔥', baseWage: 2, desc: '颠勺炒菜，香气四溢' },
  { id: 'guard',   name: '保安', emoji: '🛡️', action: 'guard',   prop: '🛡️', baseWage: 2, desc: '持盾巡逻，守护平安' },
  { id: 'singer',  name: '歌手', emoji: '🎤', action: 'singer',  prop: '🎵', baseWage: 3, desc: '话筒唱歌，音符飘飞' },
  { id: 'courier', name: '快递', emoji: '📦', action: 'courier', prop: '📦', baseWage: 2, desc: '搬运包裹，跑来跑去' },
  { id: 'cleaner', name: '清洁', emoji: '🧹', action: 'cleaner', prop: '🫧', baseWage: 1, desc: '挥舞扫把，泡泡纷飞' },
];

// ========== 宠物成长阶段 ==========
// 每个宠物三个成长阶段：幼崽(baby) / 少年(young) / 成年(adult)
// 阶段时长：幼崽 0-1天 → 少年 1-3天 → 成年 3天+
const PET_GROWTH = {
  // 蝴蝶类
  'p1': { baby: '🥚', young: '🐛', adult: '🦋', babyHours: 24, youngHours: 72 },
  // 猫狗
  'p2': { baby: '🐣', young: '🐈', adult: '🐱', babyHours: 24, youngHours: 72 },
  'p3': { baby: '🐣', young: '🐕', adult: '🐶', babyHours: 24, youngHours: 72 },
  // 兔子
  'p4': { baby: '🥚', young: '🐇', adult: '🐰', babyHours: 24, youngHours: 72 },
  // 恐龙
  'p5': { baby: '🥚', young: '🦎', adult: '🦕', babyHours: 30, youngHours: 80 },
  // 金翅大鹏 / 九天仙鹤 (天上的神兽)
  'p6': { baby: '🥚', young: '🐤', adult: '🦅', babyHours: 30, youngHours: 80 },
  'p7': { baby: '✨', young: '🕊️', adult: '🦢', babyHours: 36, youngHours: 84 },
  // 龙/凤凰
  'p8': { baby: '🥚', young: '🐍', adult: '🐉', babyHours: 36, youngHours: 84 },
  'p10':{ baby: '🕯️', young: '🔥', adult: '🦅', babyHours: 48, youngHours: 96 },  // 不死鸟：烛光→火焰→凤凰
  'p20':{ baby: '🥚', young: '🐍', adult: '🐲', babyHours: 60, youngHours: 120 },
  // 独角兽
  'p9': { baby: '☁️', young: '🐴', adult: '🦄', babyHours: 36, youngHours: 84 },
  // 星精灵
  'p11':{ baby: '✨', young: '⭐', adult: '🌟', babyHours: 30, youngHours: 78 },
  // 企鹅
  'p12':{ baby: '🥚', young: '🐤', adult: '🐧', babyHours: 24, youngHours: 72 },
  // 皮卡丘
  'p13':{ baby: '⚡', young: '💛', adult: '⚡', babyHours: 36, youngHours: 84 },
  // 海豚
  'p14':{ baby: '💧', young: '🐟', adult: '🐬', babyHours: 24, youngHours: 72 },
  // 仓鼠
  'p15':{ baby: '🐣', young: '🐭', adult: '🐹', babyHours: 20, youngHours: 60 },
  // 熊猫
  'p16':{ baby: '🐣', young: '🧸', adult: '🐼', babyHours: 30, youngHours: 78 },
  // 老虎
  'p17':{ baby: '🐣', young: '🐯', adult: '🐯', babyHours: 30, youngHours: 78 },
  // 水精灵
  'p18':{ baby: '💧', young: '🌊', adult: '🧜', babyHours: 30, youngHours: 78 },
  // 狐狸
  'p19':{ baby: '🐣', young: '🦊', adult: '🦊', babyHours: 24, youngHours: 72 },
  // ===== 飞禽 =====
  'p21':{ baby: '🥚', young: '🐤', adult: '🦜', babyHours: 20, youngHours: 60 },
  'p22':{ baby: '🥚', young: '🐤', adult: '🦉', babyHours: 28, youngHours: 72 },
  'p23':{ baby: '🐣', young: '🦝', adult: '🦝', babyHours: 22, youngHours: 64 },  // 小浣熊
  'p24':{ baby: '🥚', young: '🐤', adult: '🦚', babyHours: 36, youngHours: 84 },
  'p25':{ baby: '🥚', young: '🐤', adult: '🦢', babyHours: 28, youngHours: 72 },
  'p26':{ baby: '🥚', young: '🐤', adult: '🦩', babyHours: 28, youngHours: 72 },
  'p27':{ baby: '🥚', young: '🐤', adult: '🐦', babyHours: 22, youngHours: 64 },  // 啄木鸟
  'p28':{ baby: '🥚', young: '🦎', adult: '🦇', babyHours: 24, youngHours: 72 },  // 蝙蝠
  'p30':{ baby: '🐣', young: '🦨', adult: '🦡', babyHours: 30, youngHours: 78 },  // 蜜獾平头哥
  // ===== 走兽 =====
  'p31':{ baby: '🐣', young: '🦁', adult: '🦁', babyHours: 30, youngHours: 78 },
  'p32':{ baby: '🐣', young: '🦌', adult: '🦌', babyHours: 24, youngHours: 72 },
  'p33':{ baby: '🐣', young: '🙈', adult: '🐵', babyHours: 22, youngHours: 64 },
  'p34':{ baby: '🥚', young: '🦎', adult: '🐊', babyHours: 30, youngHours: 78 },
  'p35':{ baby: '🐣', young: '🐴', adult: '🐴', babyHours: 26, youngHours: 72 },
  'p36':{ baby: '🥚', young: '🐢', adult: '🐢', babyHours: 36, youngHours: 90 },
  'p37':{ baby: '🐣', young: '🐘', adult: '🐘', babyHours: 32, youngHours: 84 },
  'p38':{ baby: '🥚', young: '🐛', adult: '🐍', babyHours: 22, youngHours: 64 },
  'p39':{ baby: '🐣', young: '🦔', adult: '🦔', babyHours: 22, youngHours: 64 },
  'p40':{ baby: '🐣', young: '🦙', adult: '🦙', babyHours: 26, youngHours: 72 },
  'p41':{ baby: '🐣', young: '🐶', adult: '🐺', babyHours: 28, youngHours: 78 },
  'p42':{ baby: '🐣', young: '🐴', adult: '🦓', babyHours: 24, youngHours: 72 },
  'p43':{ baby: '🐣', young: '🦒', adult: '🦒', babyHours: 30, youngHours: 80 },
  'p44':{ baby: '✨', young: '🐐', adult: '🐏', babyHours: 48, youngHours: 108 }, // 白泽
  // ===== 水族 =====
  'p45':{ baby: '🥚', young: '🐟', adult: '🦈', babyHours: 24, youngHours: 72 },
  'p46':{ baby: '🥚', young: '🦐', adult: '🐙', babyHours: 24, youngHours: 68 },
  'p47':{ baby: '🥚', young: '🐟', adult: '🐡', babyHours: 22, youngHours: 64 },
  'p48':{ baby: '🥚', young: '🦭', adult: '🦭', babyHours: 22, youngHours: 64 },
  'p49':{ baby: '💧', young: '🪼', adult: '🪼', babyHours: 24, youngHours: 70 },
  'p50':{ baby: '🥚', young: '🐟', adult: '🐠', babyHours: 28, youngHours: 78 },
  'p51':{ baby: '💧', young: '🐬', adult: '🐋', babyHours: 36, youngHours: 84 },
  'p52':{ baby: '💧', young: '🧜', adult: '🧜', babyHours: 40, youngHours: 96 },
  'p53':{ baby: '🥚', young: '🐊', adult: '🐊', babyHours: 48, youngHours: 108 },
  'p54':{ baby: '🥚', young: '🐙', adult: '🦑', babyHours: 54, youngHours: 120 },
  // ===== 蛋仔派对 =====
  'p55':{ baby: '🥚', young: '🍳', adult: '🎀', babyHours: 24, youngHours: 72,
    adultImage: 'https://storage.moegirl.org.cn/images/f/f4/%E8%9B%8B%E5%B0%8F%E7%B2%89.png' },
  'p56':{ baby: '🥚', young: '🍳', adult: '💎', babyHours: 24, youngHours: 72,
    adultImage: 'https://storage.moegirl.org.cn/images/7/76/%E8%9B%8B%E5%B0%8F%E8%93%9D.png' },
  // ===== 奇幻生物 =====
  'p57':{ baby: '🍃', young: '👹', adult: '👹', babyHours: 28, youngHours: 72 },  // 哥布林
  'p58':{ baby: '🌱', young: '🍄', adult: '🍄', babyHours: 22, youngHours: 60 },  // 毒蘑菇
  'p59':{ baby: '🪨', young: '🗿', adult: '🗿', babyHours: 32, youngHours: 80 },  // 石头人
  'p60':{ baby: '💧', young: '❄️', adult: '❄️', babyHours: 36, youngHours: 84 }, // 冰霜精灵
  'p61':{ baby: '🌑', young: '👻', adult: '👻', babyHours: 36, youngHours: 84 }, // 暗影幽灵
  'p62':{ baby: '🌱', young: '🌿', adult: '🌳', babyHours: 30, youngHours: 78 }, // 小树精
};

// ========== 宠物食物 ==========
const PET_FOODS = [
  { id: 'f1', name: '普通饲料', emoji: '🍚', price: 2, hunger: 30, happiness: 5, energy: 0, desc: '基础食物，填饱肚子' },
  { id: 'f2', name: '小鱼干', emoji: '🐟', price: 4, hunger: 40, happiness: 15, energy: 0, desc: '小宠物最爱的零食' },
  { id: 'f3', name: '水果拼盘', emoji: '🍓', price: 5, hunger: 25, happiness: 30, energy: 0, desc: '新鲜水果，心情大好' },
  { id: 'f4', name: '豪华大餐', emoji: '🍱', price: 8, hunger: 60, happiness: 35, energy: 0, desc: '营养丰富的满汉全席' },
  { id: 'f5', name: '彩虹蛋糕', emoji: '🎂', price: 6, hunger: 20, happiness: 50, energy: 0, desc: '超级美味的甜点' },
  { id: 'f6', name: '能量药水', emoji: '🧪', price: 7, hunger: 35, happiness: 35, energy: 10, desc: '神奇的恢复药水' },
  { id: 'f7', name: '冰淇淋', emoji: '🍦', price: 4, hunger: 10, happiness: 45, energy: 0, desc: '夏天最爱~凉凉爽爽' },
  { id: 'f8', name: '牛排大餐', emoji: '🥩', price: 10, hunger: 70, happiness: 40, energy: 0, desc: '顶级美味，超满足' },
  { id: 'f9', name: '胡萝卜', emoji: '🥕', price: 1, hunger: 15, happiness: 8, energy: 0, desc: '健康又实惠的小零食' },
  { id: 'f10', name: '蜂蜜罐', emoji: '🍯', price: 5, hunger: 30, happiness: 25, energy: 0, desc: '甜甜的，宠物很喜欢' },
  { id: 'f11', name: '披萨', emoji: '🍕', price: 6, hunger: 45, happiness: 30, energy: 0, desc: '热腾腾的美味披萨' },
  { id: 'f12', name: '寿司拼盘', emoji: '🍣', price: 8, hunger: 40, happiness: 35, energy: 0, desc: '精致的日式料理' },
  { id: 'f13', name: '三明治', emoji: '🥪', price: 3, hunger: 30, happiness: 15, energy: 0, desc: '营养均衡的快捷美食' },
  { id: 'f14', name: '巧克力', emoji: '🍫', price: 4, hunger: 15, happiness: 40, energy: 0, desc: '甜到心里，幸福感爆棚' },
  { id: 'f15', name: '棉花糖', emoji: '☁️', price: 3, hunger: 10, happiness: 35, energy: 0, desc: '软绵绵的入口即化' },
  { id: 'f16', name: '大西瓜', emoji: '🍉', price: 3, hunger: 20, happiness: 25, energy: 0, desc: '夏天来一块，清凉解暑' },
  { id: 'f17', name: '烤玉米', emoji: '🌽', price: 2, hunger: 18, happiness: 10, energy: 0, desc: '香喷喷的田间美味' },
  { id: 'f18', name: '脆骨头', emoji: '🦴', price: 3, hunger: 20, happiness: 12, energy: 0, desc: '狗狗的最爱，嘎嘣脆' },
  { id: 'f19', name: '奶酪', emoji: '🧀', price: 4, hunger: 25, happiness: 20, energy: 0, desc: '浓郁的奶香，营养丰富' },
  { id: 'f20', name: '甜甜圈', emoji: '🍩', price: 4, hunger: 18, happiness: 35, energy: 0, desc: '圆圆的甜圈，一口一个' },
  { id: 'f21', name: '黄金鱼子酱', emoji: '🥫', price: 12, hunger: 80, happiness: 50, energy: 0, desc: '传级美食，宠物吃了会发光' },
  { id: 'f22', name: '海鲜大咖', emoji: '🦞', price: 9, hunger: 55, happiness: 42, energy: 0, desc: '龙虾鲍鱼，豪华享受' },
  { id: 'f23', name: '冰糖葫芦', emoji: '🍡', price: 3, hunger: 15, happiness: 20, energy: 0, desc: '酸酸甜甜，一串接一串停不下' },
  { id: 'f24', name: '奶黄包', emoji: '🥟', price: 2, hunger: 18, happiness: 10, energy: 0, desc: '热腾腾的奶香包，软糯美味' },
  { id: 'f25', name: '珍珠奶茶', emoji: '🧋', price: 5, hunger: 20, happiness: 30, energy: 0, desc: 'Q弹珍珠配甜蜜奶茶，超好喝' },
  { id: 'f26', name: '烤红薯', emoji: '🍠', price: 3, hunger: 22, happiness: 15, energy: 0, desc: '冬天暖手神器，甜到心里去' },
  { id: 'f27', name: '三色冰淇淋球', emoji: '🍨', price: 4, hunger: 12, happiness: 40, energy: 0, desc: '三种口味，冰凉一夏' },
  { id: 'f28', name: '糯米团子', emoji: '🍥', price: 2, hunger: 15, happiness: 18, energy: 0, desc: '软软糯糯，小朋友的最爱' },
  { id: 'f29', name: '蜜汁鸡腿', emoji: '🍗', price: 6, hunger: 35, happiness: 30, energy: 0, desc: '香嫩多汁，宠物闻到就流口水' },
  { id: 'f30', name: '星星糖果', emoji: '🍬', price: 3, hunger: 10, happiness: 35, energy: 0, desc: '五颜六色的星星糖，甜蜜蜜' },
  // 恢复体力专用食物
  { id: 'f31', name: '体力药水', emoji: '🧃', price: 6, hunger: 5, happiness: 10, energy: 45, desc: '喝一口体力瞬间回满' },
  { id: 'f32', name: '闪电糖果', emoji: '⚡', price: 5, hunger: 8, happiness: 20, energy: 30, desc: '噼里啪啦，活力四射' },
  { id: 'f33', name: '蜂蜜柠檬茶', emoji: '🍋', price: 4, hunger: 12, happiness: 15, energy: 25, desc: '清爽提神，恢复元气' },
  { id: 'f34', name: '魔法果汁', emoji: '🧉', price: 5, hunger: 10, happiness: 18, energy: 35, desc: '神奇配方，瞬间回能' },
  { id: 'f35', name: '元气包子', emoji: '🥮', price: 4, hunger: 25, happiness: 8, energy: 20, desc: '热腾腾的包子，吃饱有力气' },
];

// ========== 扭蛋机配置 ==========
const GACHA_COST = 10;            // 每次扭蛋花费
const GACHA_DAILY_LIMIT = 10;     // 每日最多扭蛋次数（防沉迷）
const GACHA_SHARD_REDEEM = 10;    // 集齐多少神兽碎片兑换传说神兽
const GACHA_PITY_COINS = 500;     // 累计扭蛋花费达此数必得九天神兽召唤资格（保底）
const GACHA_LEGEND_POOL = ['p63', 'p10', 'p20', 'p30', 'p44', 'p53', 'p54']; // 收藏馆图鉴：扭蛋召唤 + 储蓄解锁的传说神兽
// 扭蛋奖池（weight 为权重，每次必中一项）
const GACHA_LOOT = [
  { type: 'food', id: 'f1',  weight: 18 },
  { type: 'food', id: 'f2',  weight: 16 },
  { type: 'food', id: 'f3',  weight: 12 },
  { type: 'food', id: 'f5',  weight: 10 },
  { type: 'food', id: 'f6',  weight: 8  },
  { type: 'food', id: 'f8',  weight: 6  },
  { type: 'food', id: 'f21', weight: 4  },
  { type: 'shard',           weight: 12 },
];

// ========== 学习内容 - 数学 ==========
const MATH_REVIEW = [
  { id: 'm_r_1', title: '100以内加减法', type: 'practice', desc: '复习二年级加减法运算', icon: '➕' },
  { id: 'm_r_2', title: '乘法口诀表', type: 'flashcard', desc: '巩固1-9乘法口诀', icon: '✖️' },
  { id: 'm_r_3', title: '认识时间', type: 'practice', desc: '复习时钟读数', icon: '🕐' },
  { id: 'm_r_4', title: '认识图形', type: 'quiz', desc: '辨认基本图形', icon: '🔷' },
  { id: 'm_r_5', title: '生活中的应用题', type: 'word_problem', desc: '用数学解决生活问题', icon: '🛒' },
  { id: 'm_r_6', title: '混合运算', type: 'practice', desc: '加减乘除混合练习', icon: '🧮' },
  { id: 'm_r_7', title: '长度单位', type: 'quiz', desc: '厘米、米的认识和换算', icon: '📏' },
  { id: 'm_r_8', title: '角的认识', type: 'quiz', desc: '锐角、直角、钝角', icon: '📐' },
  { id: 'm_r_9', title: '有余数的除法', type: 'practice', desc: '带余数的除法运算', icon: '➗' },
  { id: 'm_r_10', title: '克与千克', type: 'quiz', desc: '质量单位的认识', icon: '⚖️' },
  { id: 'm_r_11', title: '数据收集整理', type: 'quiz', desc: '统计表和简单数据', icon: '📊' },
  { id: 'm_r_12', title: '对称图形', type: 'quiz', desc: '轴对称图形的认识', icon: '🦋' },
  { id: 'm_r_13', title: '认识万以内数', type: 'flashcard', desc: '千位、百位的读写和比较', icon: '🔢' },
  { id: 'm_r_14', title: '乘法口诀口算', type: 'practice', desc: '九九乘法表快速计算', icon: '✏️' },
  { id: 'm_r_15', title: '表内除法口算', type: 'practice', desc: '用乘法口诀求商', icon: '÷' },
];

const MATH_PREVIEW = [
  { id: 'm_p_1', title: '除法初步认识', type: 'practice', desc: '预习三年级除法概念', icon: '➗' },
  { id: 'm_p_2', title: '分数初步认识', type: 'flashcard', desc: '了解什么是分数', icon: '🍕' },
  { id: 'm_p_3', title: '周长计算', type: 'practice', desc: '长方形和正方形的周长', icon: '⬜' },
  { id: 'm_p_4', title: '万以内加减法', type: 'practice', desc: '大数运算入门', icon: '🔢' },
  { id: 'm_p_5', title: '三年级应用题', type: 'word_problem', desc: '两步运算的生活问题', icon: '📋' },
  { id: 'm_p_6', title: '多位数乘一位数', type: 'practice', desc: '两位数、三位数乘一位数', icon: '✖️' },
  { id: 'm_p_7', title: '认识小数', type: 'flashcard', desc: '小数点和十分位', icon: '🔵' },
  { id: 'm_p_8', title: '年、月、日', type: 'quiz', desc: '日历和时间单位', icon: '📅' },
  { id: 'm_p_9', title: '面积初步', type: 'practice', desc: '长方形和正方形面积', icon: '📐' },
  { id: 'm_p_10', title: '位置与方向', type: 'quiz', desc: '东南西北的认识', icon: '🧭' },
  { id: 'm_p_11', title: '集合与重叠', type: 'word_problem', desc: '韦恩图简单应用', icon: '🔗' },
  { id: 'm_p_12', title: '归一归总问题', type: 'word_problem', desc: '三年级典型应用题', icon: '📝' },
  { id: 'm_p_13', title: '两位数除法', type: 'practice', desc: '两位数除以一位数的笔算', icon: '÷' },
];

// ========== 学习内容 - 语文 ==========
const CHINESE_REVIEW = [
  { id: 'c_r_1', title: '二年级生字复习', type: 'flashcard', desc: '回顾二年级重点生字', icon: '📝' },
  { id: 'c_r_2', title: '古诗背诵', type: 'flashcard', desc: '复习经典古诗', icon: '📜' },
  { id: 'c_r_3', title: '词语积累', type: 'quiz', desc: '近义词反义词练习', icon: '📚' },
  { id: 'c_r_4', title: '量词搭配', type: 'quiz', desc: '正确使用量词', icon: '🏷️' },
  { id: 'c_r_5', title: '好词积累', type: 'flashcard', desc: '学习四字词语', icon: '💎' },
  { id: 'c_r_6', title: '好句欣赏', type: 'flashcard', desc: '积累优美句子', icon: '✨' },
  { id: 'c_r_7', title: '多音字辨析', type: 'quiz', desc: '一字多音巧分辨', icon: '🔤' },
  { id: 'c_r_8', title: '标点符号', type: 'quiz', desc: '逗号句号问号感叹号', icon: '💬' },
  { id: 'c_r_9', title: '修辞手法', type: 'flashcard', desc: '比喻、拟人的认识', icon: '🌟' },
  { id: 'c_r_10', title: '部首查字', type: 'quiz', desc: '用部首查字典', icon: '📖' },
  { id: 'c_r_11', title: '扩写句子', type: 'quiz', desc: '让句子更具体生动', icon: '✍️' },
  { id: 'c_r_12', title: '词语搭配', type: 'quiz', desc: '动词名词正确搭配', icon: '🔗' },
  { id: 'c_r_13', title: '寓言故事', type: 'flashcard', desc: '经典寓言道理回顾', icon: '🦊' },
];

const CHINESE_PREVIEW = [
  { id: 'c_p_1', title: '三年级上册生字', type: 'flashcard', desc: '提前认识新学期生字', icon: '🆕' },
  { id: 'c_p_2', title: '成语故事', type: 'flashcard', desc: '学习常用成语', icon: '🐉' },
  { id: 'c_p_3', title: '阅读理解入门', type: 'quiz', desc: '简单阅读理解练习', icon: '📖' },
  { id: 'c_p_4', title: '看图写话', type: 'quiz', desc: '观察图片写短文', icon: '🖼️' },
  { id: 'c_p_5', title: '好词好句', type: 'flashcard', desc: '三年级优美词句积累', icon: '💎' },
  { id: 'c_p_6', title: '三年级古诗', type: 'flashcard', desc: '三年级上册必背古诗', icon: '🏔️' },
  { id: 'c_p_7', title: '关联词造句', type: 'quiz', desc: '因为所以、虽然但是', icon: '⛓️' },
  { id: 'c_p_8', title: '修改病句', type: 'quiz', desc: '找出并改正错误句子', icon: '✏️' },
  { id: 'c_p_9', title: '描写方法', type: 'flashcard', desc: '人物、景物描写技巧', icon: '🎨' },
  { id: 'c_p_10', title: '日记格式', type: 'quiz', desc: '学习正确的日记写法', icon: '📅' },
  { id: 'c_p_11', title: '近义词辨析', type: 'quiz', desc: '细微差别巧分辨', icon: '🧐' },
  { id: 'c_p_12', title: '童话阅读', type: 'quiz', desc: '童话故事理解练习', icon: '🧚' },
  { id: 'c_p_13', title: '句式变换', type: 'quiz', desc: '陈述句与反问句互改', icon: '🔄' },
];

// ========== 学习内容 - 英语 ==========
const ENGLISH_REVIEW = [
  { id: 'e_r_1', title: '字母ABC', type: 'flashcard', desc: '26个字母复习', icon: '🔡' },
  { id: 'e_r_2', title: '颜色单词', type: 'flashcard', desc: 'red, blue, green...', icon: '🎨' },
  { id: 'e_r_3', title: '数字单词', type: 'quiz', desc: 'one to twenty', icon: '🔢' },
  { id: 'e_r_4', title: '日常问候', type: 'quiz', desc: 'Hello, Good morning...', icon: '👋' },
  { id: 'e_r_5', title: '身体部位', type: 'flashcard', desc: 'head, hand, foot...', icon: '💪' },
  { id: 'e_r_6', title: '家庭成员', type: 'flashcard', desc: 'father, mother, sister...', icon: '👨‍👩‍👧' },
  { id: 'e_r_7', title: '天气单词', type: 'quiz', desc: 'sunny, rainy, cloudy...', icon: '☀️' },
  { id: 'e_r_8', title: '教室物品', type: 'flashcard', desc: 'desk, chair, book...', icon: '🏫' },
  { id: 'e_r_9', title: '动作单词', type: 'flashcard', desc: 'run, jump, swim...', icon: '🏃' },
  { id: 'e_r_10', title: '反义词配对', type: 'quiz', desc: 'big-small, hot-cold...', icon: '↔️' },
  { id: 'e_r_11', title: '星期几', type: 'quiz', desc: 'Monday to Sunday', icon: '📅' },
  { id: 'e_r_12', title: '职业单词', type: 'flashcard', desc: 'teacher, doctor, farmer...', icon: '👷' },
  { id: 'e_r_13', title: '月份和季节', type: 'flashcard', desc: 'January to December, four seasons', icon: '🗓️' },
];

const ENGLISH_PREVIEW = [
  { id: 'e_p_1', title: '动物单词', type: 'flashcard', desc: 'cat, dog, elephant...', icon: '🐱' },
  { id: 'e_p_2', title: '食物单词', type: 'flashcard', desc: 'apple, bread, milk...', icon: '🍎' },
  { id: 'e_p_3', title: '简单句型', type: 'quiz', desc: 'I like... / This is...', icon: '💬' },
  { id: 'e_p_4', title: '自我介绍', type: 'quiz', desc: 'My name is... I am...', icon: '🙋' },
  { id: 'e_p_5', title: '学校科目', type: 'flashcard', desc: 'math, English, music...', icon: '📚' },
  { id: 'e_p_6', title: '衣服单词', type: 'flashcard', desc: 'shirt, dress, shoes...', icon: '👕' },
  { id: 'e_p_7', title: '地点单词', type: 'flashcard', desc: 'school, park, hospital...', icon: '🏥' },
  { id: 'e_p_8', title: 'There be 句型', type: 'quiz', desc: 'There is a... There are...', icon: '📍' },
  { id: 'e_p_9', title: '时间表达', type: 'quiz', desc: 'What time is it?', icon: '🕐' },
  { id: 'e_p_10', title: 'like 句型', type: 'quiz', desc: 'Do you like...? Yes, I do.', icon: '❤️' },
  { id: 'e_p_11', title: '人称代词', type: 'quiz', desc: 'I, you, he, she, it...', icon: '🧑' },
  { id: 'e_p_12', title: '购物对话', type: 'flashcard', desc: 'How much is it? 实用句型', icon: '🛒' },
  { id: 'e_p_13', title: '情态动词 can', type: 'quiz', desc: 'I can... / Can you...?', icon: '✅' },
];

// ========== 学习内容 - 阅读 ==========
const READING_REVIEW = [
  { id: 'r_r_1', title: '小蚂蚁搬粮食', type: 'reading', desc: '短文阅读理解 - 团结合作', icon: '🐜' },
  { id: 'r_r_2', title: '春天来了', type: 'reading', desc: '短文阅读理解 - 季节描写', icon: '🌸' },
  { id: 'r_r_3', title: '小乌龟和小兔子', type: 'reading', desc: '短文阅读理解 - 寓言故事', icon: '🐢' },
  { id: 'r_r_4', title: '小猫钓鱼', type: 'reading', desc: '短文阅读理解 - 做事专心', icon: '🐱' },
  { id: 'r_r_5', title: '秋天的果园', type: 'reading', desc: '短文阅读理解 - 观察描写', icon: '🍎' },
  { id: 'r_r_6', title: '勇敢的小松鼠', type: 'reading', desc: '短文阅读理解 - 战胜恐惧', icon: '🐿️' },
  { id: 'r_r_7', title: '妈妈的生日', type: 'reading', desc: '短文阅读理解 - 感恩亲情', icon: '🎂' },
  { id: 'r_r_8', title: '下雨了', type: 'reading', desc: '短文阅读理解 - 自然现象', icon: '🌧️' },
  { id: 'r_r_9', title: '小青蛙找家', type: 'reading', desc: '短文阅读理解 - 辨别方向', icon: '🐸' },
  { id: 'r_r_10', title: '同桌的你', type: 'reading', desc: '短文阅读理解 - 友谊故事', icon: '👫' },
  { id: 'r_r_11', title: '一把雨伞', type: 'reading', desc: '短文阅读理解 - 助人为乐', icon: '☔' },
];

const READING_PREVIEW = [
  { id: 'r_p_1', title: '美丽的校园', type: 'reading', desc: '三年级短文 - 校园描写', icon: '🏫' },
  { id: 'r_p_2', title: '我爱家乡', type: 'reading', desc: '三年级短文 - 写景抒情', icon: '🏡' },
  { id: 'r_p_3', title: '小小发明家', type: 'reading', desc: '三年级短文 - 叙事阅读', icon: '💡' },
  { id: 'r_p_4', title: '第一次做饭', type: 'reading', desc: '三年级短文 - 成长故事', icon: '🍳' },
  { id: 'r_p_5', title: '蒲公英的旅行', type: 'reading', desc: '三年级短文 - 科普童话', icon: '🌼' },
  { id: 'r_p_6', title: '保护地球妈妈', type: 'reading', desc: '三年级短文 - 环保主题', icon: '🌍' },
  { id: 'r_p_7', title: '尊老爱幼', type: 'reading', desc: '三年级短文 - 传统美德', icon: '👴' },
  { id: 'r_p_8', title: '小蚂蚁的旅行', type: 'reading', desc: '三年级短文 - 趣味科普', icon: '🐜' },
  { id: 'r_p_9', title: '秋游日记', type: 'reading', desc: '三年级短文 - 日记阅读', icon: '🍂' },
  { id: 'r_p_10', title: '夜空的星星', type: 'reading', desc: '三年级短文 - 想象阅读', icon: '⭐' },
  { id: 'r_p_11', title: '种下一粒种子', type: 'reading', desc: '三年级短文 - 生命成长', icon: '🌱' },
];

// ========== 学习内容索引 ==========
const LEARNING_DATA = {
  math: { name: '数学', icon: '🔢', color: '#5B9BD5', review: MATH_REVIEW, preview: MATH_PREVIEW },
  chinese: { name: '语文', icon: '📝', color: '#E74C3C', review: CHINESE_REVIEW, preview: CHINESE_PREVIEW },
  english: { name: '英语', icon: '🔤', color: '#27AE60', review: ENGLISH_REVIEW, preview: ENGLISH_PREVIEW },
  reading: { name: '阅读', icon: '📖', color: '#E17055', review: READING_REVIEW, preview: READING_PREVIEW },
};

// ========== 闪卡内容 ==========
const FLASHCARDS = {
  // 乘法口诀（完整九九表）
  'm_r_2': [
    { front: '2 × 2 = ?', back: '4' },
    { front: '2 × 3 = ?', back: '6' },
    { front: '2 × 4 = ?', back: '8' },
    { front: '2 × 5 = ?', back: '10' },
    { front: '2 × 6 = ?', back: '12' },
    { front: '2 × 7 = ?', back: '14' },
    { front: '2 × 8 = ?', back: '16' },
    { front: '2 × 9 = ?', back: '18' },
    { front: '3 × 3 = ?', back: '9' },
    { front: '3 × 4 = ?', back: '12' },
    { front: '3 × 5 = ?', back: '15' },
    { front: '3 × 6 = ?', back: '18' },
    { front: '3 × 7 = ?', back: '21' },
    { front: '3 × 8 = ?', back: '24' },
    { front: '3 × 9 = ?', back: '27' },
    { front: '4 × 4 = ?', back: '16' },
    { front: '4 × 5 = ?', back: '20' },
    { front: '4 × 6 = ?', back: '24' },
    { front: '4 × 7 = ?', back: '28' },
    { front: '4 × 8 = ?', back: '32' },
    { front: '4 × 9 = ?', back: '36' },
    { front: '5 × 5 = ?', back: '25' },
    { front: '5 × 6 = ?', back: '30' },
    { front: '5 × 7 = ?', back: '35' },
    { front: '5 × 8 = ?', back: '40' },
    { front: '5 × 9 = ?', back: '45' },
    { front: '6 × 6 = ?', back: '36' },
    { front: '6 × 7 = ?', back: '42' },
    { front: '6 × 8 = ?', back: '48' },
    { front: '6 × 9 = ?', back: '54' },
    { front: '7 × 7 = ?', back: '49' },
    { front: '7 × 8 = ?', back: '56' },
    { front: '7 × 9 = ?', back: '63' },
    { front: '8 × 8 = ?', back: '64' },
    { front: '8 × 9 = ?', back: '72' },
    { front: '9 × 9 = ?', back: '81' },
  ],
  // 分数初步
  'm_p_2': [
    { front: '把一个披萨切成2份，每份是多少？', back: '1/2（二分之一）' },
    { front: '把一个蛋糕切成4份，每份是多少？', back: '1/4（四分之一）' },
    { front: '1/2 和 1/3 哪个大？', back: '1/2 更大' },
    { front: '3个1/4是多少？', back: '3/4（四分之三）' },
  ],
  // 二年级生字
  'c_r_1': [
    { front: '美丽', back: '形容好看的样子' },
    { front: '勤劳', back: '努力劳动，不怕辛苦' },
    { front: '仔细', back: '细心，注意细节' },
    { front: '勇敢', back: '不怕危险和困难' },
    { front: '快乐', back: '感到幸福或满意' },
    { front: '温暖', back: '暖和，使人觉得温热' },
  ],
  // 古诗
  'c_r_2': [
    { front: '《静夜思》- 床前明月光', back: '疑是地上霜。举头望明月，低头思故乡。' },
    { front: '《春晓》- 春眠不觉晓', back: '处处闻啼鸟。夜来风雨声，花落知多少。' },
    { front: '《咏鹅》- 鹅鹅鹅', back: '曲项向天歌。白毛浮绿水，红掌拨清波。' },
    { front: '《悯农》- 锄禾日当午', back: '汗滴禾下土。谁知盘中餐，粒粒皆辛苦。' },
  ],
  // 成语
  'c_p_2': [
    { front: '守株待兔', back: '比喻不主动努力，只想得到意外的收获' },
    { front: '画蛇添足', back: '比喻做了多余的事，反而把事情弄糟' },
    { front: '亡羊补牢', back: '出了问题以后想办法补救，可以防止继续受损失' },
    { front: '井底之蛙', back: '比喻见识短浅的人' },
  ],
  // 三年级生字
  'c_p_1': [
    { front: '晨', back: 'chén - 早晨，清晨' },
    { front: '绒', back: 'róng - 柔软的细毛' },
    { front: '猜', back: 'cāi - 推测，想' },
    { front: '扬', back: 'yáng - 高举，往上升' },
    { front: '臂', back: 'bèi - 胳膊' },
    { front: '雀', back: 'què - 小鸟' },
  ],
  // 字母
  'e_r_1': [
    { front: 'A a', back: 'Apple 🍎' },
    { front: 'B b', back: 'Banana 🍌' },
    { front: 'C c', back: 'Cat 🐱' },
    { front: 'D d', back: 'Dog 🐶' },
    { front: 'E e', back: 'Elephant 🐘' },
    { front: 'F f', back: 'Fish 🐟' },
    { front: 'G g', back: 'Grapes 🍇' },
    { front: 'H h', back: 'Hat 🎩' },
  ],
  // 颜色
  'e_r_2': [
    { front: '红色', back: 'Red 🔴' },
    { front: '蓝色', back: 'Blue 🔵' },
    { front: '绿色', back: 'Green 🟢' },
    { front: '黄色', back: 'Yellow 🟡' },
    { front: '黑色', back: 'Black ⚫' },
    { front: '白色', back: 'White ⚪' },
    { front: '橙色', back: 'Orange 🟠' },
    { front: '紫色', back: 'Purple 🟣' },
  ],
  // 动物
  'e_p_1': [
    { front: '猫', back: 'Cat 🐱' },
    { front: '狗', back: 'Dog 🐶' },
    { front: '大象', back: 'Elephant 🐘' },
    { front: '小鸟', back: 'Bird 🐦' },
    { front: '鱼', back: 'Fish 🐟' },
    { front: '兔子', back: 'Rabbit 🐰' },
    { front: '老虎', back: 'Tiger 🐯' },
    { front: '猴子', back: 'Monkey 🐵' },
  ],
  // 食物
  'e_p_2': [
    { front: '苹果', back: 'Apple 🍎' },
    { front: '面包', back: 'Bread 🍞' },
    { front: '牛奶', back: 'Milk 🥛' },
    { front: '鸡蛋', back: 'Egg 🥚' },
    { front: '香蕉', back: 'Banana 🍌' },
    { front: '米饭', back: 'Rice 🍚' },
    { front: '蛋糕', back: 'Cake 🎂' },
    { front: '水', back: 'Water 💧' },
  ],
  // 好词积累
  'c_r_5': [
    { front: '生机勃勃', back: '形容生命力旺盛，充满活力的样子' },
    { front: '五颜六色', back: '形容颜色很多，五彩缤纷' },
    { front: '欢天喜地', back: '形容非常高兴、快乐' },
    { front: '春暖花开', back: '春天暖和，百花盛开' },
    { front: '兴高采烈', back: '形容兴致高，情绪热烈' },
    { front: '自言自语', back: '自己跟自己说话' },
    { front: '绿树成荫', back: '树木枝叶茂密，遮蔽了阳光' },
    { front: '翩翩起舞', back: '形容轻快地跳起舞来' },
  ],
  // 好句欣赏
  'c_r_6': [
    { front: '描写春风', back: '春风轻轻地吹着，像妈妈的手抚摸着我们的脸。' },
    { front: '描写小草', back: '小草偷偷地从土里钻出来，嫩嫩的，绿绿的。' },
    { front: '描写花朵', back: '花儿五颜六色，有红的、黄的、粉的，美丽极了。' },
    { front: '描写小鸟', back: '小鸟在树枝上叽叽喳喳地叫着，好像在唱歌。' },
    { front: '描写星星', back: '天上的星星一闪一闪的，像无数颗小钻石。' },
    { front: '描写月亮', back: '圆圆的月亮挂在天空，像一个大玉盘。' },
    { front: '描写太阳', back: '太阳公公露出了笑脸，把大地照得暖洋洋的。' },
    { front: '描写下雨', back: '小雨滴答滴答地落下来，像在弹奏美妙的乐曲。' },
  ],
  // 好词好句（三年级预览）
  'c_p_5': [
    { front: '描写人物：精神抖擞', back: '形容人精神饱满，充满活力。例句：爷爷每天早晨都精神抖擞地去公园散步。' },
    { front: '描写天空：万里无云', back: '天空非常晴朗，没有一丝云彩。例句：今天万里无云，真是个放风筝的好天气。' },
    { front: '描写湖水：波光粼粼', back: '阳光照在水面，闪着金光。例句：湖面波光粼粼，像撒了一层碎金子。' },
    { front: '描写心情：心花怒放', back: '心里高兴得像花儿盛开一样。例句：听到这个好消息，我高兴得心花怒放。' },
    { front: '描写山川：连绵起伏', back: '山脉高低起伏不断的样子。例句：远处的群山连绵起伏，壮丽极了。' },
    { front: '描写光阴：日月如梭', back: '太阳和月亮像梭子一样穿梭，形容时间过得很快。例句：日月如梭，转眼暑假就要结束了。' },
  ],
  // 修辞手法
  'c_r_9': [
    { front: '比喻', back: '把一种事物比作另一种事物。例句：弯弯的月亮像小船。' },
    { front: '拟人', back: '把事物当成人来写。例句：小鸟在枝头唱歌。' },
    { front: '排比', back: '用三个或以上结构相似的句子。例句：春天来了，花开了，草绿了，鸟叫了。' },
    { front: '夸张', back: '故意把事物说得更大或更小。例句：他气得头发都竖起来了！' },
  ],
  // 三年级古诗
  'c_p_6': [
    { front: '《望天门山》- 天门中断楚江开', back: '碧水东流至此回。两岸青山相对出，孤帆一片日边来。—— 李白' },
    { front: '《饮湖上初晴后雨》- 水光潋滟晴方好', back: '山色空蒙雨亦奇。欲把西湖比西子，淡妆浓抹总相宜。—— 苏轼' },
    { front: '《望洞庭》- 湖光秋月两相和', back: '潭面无风镜未磨。遥望洞庭山水翠，白银盘里一青螺。—— 刘禹锡' },
    { front: '《早发白帝城》- 朝辞白帝彩云间', back: '千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。—— 李白' },
  ],
  // 描写方法
  'c_p_9': [
    { front: '外貌描写', back: '描写人物的长相、穿着。例句：她有一双明亮的大眼睛，笑起来有两个小酒窝。' },
    { front: '动作描写', back: '描写人物在做什么、怎么做。例句：他飞快地跑过来，气喘吁吁地说不出话。' },
    { front: '语言描写', back: '描写人物说了什么话。例句：妈妈温柔地说："宝贝，该睡觉了。"' },
    { front: '心理描写', back: '描写人物心里想什么。例句：我心里紧张极了，像有只小兔子在咚咚跳。' },
  ],
  // 小数
  'm_p_7': [
    { front: '0.1 表示什么？', back: '十分之一，把1平均分成10份中的1份' },
    { front: '0.5 等于几分之几？', back: '5/10 = 1/2（一半）' },
    { front: '1元5角用小数表示？', back: '1.5元' },
    { front: '小数点的左边是什么？', back: '整数部分；小数点右边是小数部分' },
  ],
  // 身体部位
  'e_r_5': [
    { front: '头', back: 'Head 🤕' },
    { front: '手', back: 'Hand ✋' },
    { front: '脚', back: 'Foot 🦶' },
    { front: '眼睛', back: 'Eye 👁️' },
    { front: '鼻子', back: 'Nose 👃' },
    { front: '嘴巴', back: 'Mouth 👄' },
    { front: '耳朵', back: 'Ear 👂' },
    { front: '腿', back: 'Leg 🦵' },
  ],
  // 家庭成员
  'e_r_6': [
    { front: '爸爸', back: 'Father / Dad 👨' },
    { front: '妈妈', back: 'Mother / Mom 👩' },
    { front: '哥哥', back: 'Brother 👦' },
    { front: '姐姐', back: 'Sister 👧' },
    { front: '爷爷', back: 'Grandfather 👴' },
    { front: '奶奶', back: 'Grandmother 👵' },
    { front: '叔叔', back: 'Uncle 🧔' },
    { front: '阿姨', back: 'Aunt 👩‍🦰' },
  ],
  // 教室物品
  'e_r_8': [
    { front: '桌子', back: 'Desk 📚' },
    { front: '椅子', back: 'Chair 🪑' },
    { front: '书', back: 'Book 📖' },
    { front: '铅笔', back: 'Pencil ✏️' },
    { front: '橡皮', back: 'Eraser 🧹' },
    { front: '尺子', back: 'Ruler 📏' },
    { front: '书包', back: 'Bag 🎒' },
    { front: '黑板', back: 'Blackboard 💻' },
  ],
  // 动作单词
  'e_r_9': [
    { front: '跑', back: 'Run 🏃' },
    { front: '跳', back: 'Jump 🦘' },
    { front: '游泳', back: 'Swim 🏊' },
    { front: '吃', back: 'Eat 🍽️' },
    { front: '喝', back: 'Drink 🥤' },
    { front: '睡', back: 'Sleep 😴' },
    { front: '读', back: 'Read 📖' },
    { front: '写', back: 'Write ✍️' },
  ],
  // 学校科目
  'e_p_5': [
    { front: '数学', back: 'Math 🔢' },
    { front: '英语', back: 'English 🔤' },
    { front: '音乐', back: 'Music 🎵' },
    { front: '体育', back: 'PE / Sports ⚽' },
    { front: '美术', back: 'Art 🎨' },
    { front: '科学', back: 'Science 🔬' },
    { front: '语文', back: 'Chinese 📝' },
    { front: '计算机', back: 'Computer 💻' },
  ],
  // 衣服单词
  'e_p_6': [
    { front: '衬衫', back: 'Shirt 👔' },
    { front: '裙子', back: 'Dress / Skirt 👗' },
    { front: '鞋子', back: 'Shoes 👟' },
    { front: '帽子', back: 'Hat / Cap 🧢' },
    { front: '裤子', back: 'Pants / Trousers 👖' },
    { front: '外套', back: 'Coat / Jacket 🧥' },
    { front: '袜子', back: 'Socks 🧦' },
    { front: 'T恤', back: 'T-shirt 👕' },
  ],
  // 地点单词
  'e_p_7': [
    { front: '学校', back: 'School 🏫' },
    { front: '公园', back: 'Park 🌳' },
    { front: '医院', back: 'Hospital 🏥' },
    { front: '超市', back: 'Supermarket 🏪' },
    { front: '动物园', back: 'Zoo 🦁' },
    { front: '图书馆', back: 'Library 📚' },
    { front: '家', back: 'Home 🏠' },
    { front: '操场', back: 'Playground 🎠' },
  ],
  // 职业单词
  'e_r_12': [
    { front: '老师', back: 'Teacher 👩‍🏫' },
    { front: '医生', back: 'Doctor 👨‍⚕️' },
    { front: '农民', back: 'Farmer 👨‍🌾' },
    { front: '警察', back: 'Police officer 👮' },
    { front: '厨师', back: 'Cook / Chef 👨‍🍳' },
    { front: '司机', back: 'Driver 🚗' },
    { front: '护士', back: 'Nurse 👩‍⚕️' },
    { front: '歌手', back: 'Singer 🎤' },
  ],
  // 购物对话
  'e_p_12': [
    { front: '这个多少钱？', back: 'How much is this?' },
    { front: '太贵了！', back: 'Too expensive!' },
    { front: '我可以试一下吗？', back: 'Can I try it on?' },
    { front: '我买了。', back: 'I\'ll take it.' },
    { front: '多少钱？', back: 'How much?' },
    { front: '给你钱。', back: 'Here you are.' },
  ],
  // 认识万以内数
  'm_r_13': [
    { front: '1000怎么读？', back: '一千' },
    { front: '3456怎么读？', back: '三千四百五十六' },
    { front: '最大的三位数是多少？', back: '999。比它大1就是1000，是四位数' },
    { front: '5000 + 300 + 40 + 2 合起来是多少？', back: '5342，五千三百四十二' },
    { front: '比较大小：4567 ○ 4576', back: '4567 < 4576。看百位！百位相同比十位，6 < 7' },
    { front: '8000里有几个百？', back: '80个百。1千=10百，8千=80百' },
    { front: '用2、0、5、8组成最大的四位数', back: '8520。高位放大的数字，0不能在最高位！' },
    { front: '最小的四位数是什么？', back: '1000。四位数至少是1千' },
  ],

  // 寓言故事
  'c_r_13': [
    { front: '拔苗助长的道理', back: '做事情不能急于求成，要遵守事物发展的规律' },
    { front: '守株待兔告诉我们什么？', back: '不能靠侥幸过日子，要靠自己的努力' },
    { front: '井底之蛙讲的是什么？', back: '眼界狭窄的人以为世界很小，要多开阔视野' },
    { front: '狐假虎威中狐狸靠什么吓跑动物？', back: '借着老虎的威风。比喻借着别人的势力欺压人' },
    { front: '亡羊补牢告诉我们什么？', back: '出了差错要及时补救，还不算晚' },
    { front: '叶公好龙中的叶公真的喜欢龙吗？', back: '不是。他喜欢的只是假龙，真龙来了反而害怕。比喻嘴里说喜欢，实际并非如此' },
    { front: '掩耳盗铃的人为什么可笑？', back: '他以为捂住自己耳朵别人就听不到了，自欺欺人' },
    { front: '画蛇添足是什么意思？', back: '做了多余的事反而不恰当。蛇本来没有脚，画上脚反而画错了' },
  ],

  // 月份和季节
  'e_r_13': [
    { front: 'January', back: '一月。新年快乐！Happy New Year!' },
    { front: 'February', back: '二月。春节经常在二月。Spring Festival is often in February.' },
    { front: 'March', back: '三月。春天来了！Spring begins!' },
    { front: 'April', back: '四月。April showers bring May flowers.' },
    { front: 'May', back: '五月' },
    { front: 'June', back: '六月。Children\'s Day is on June 1st.' },
    { front: '七月到九月是什么季节？', back: '夏天 Summer。七月July、八月August、九月September' },
    { front: '十月到十二月是什么季节？', back: '秋冬 Autumn/Winter。十月October、十一月November、十二月December' },
    { front: '一年有几个季节？', back: '四个。Spring春天、Summer夏天、Autumn/Fall秋天、Winter冬天' },
    { front: '你最喜欢哪个季节？', back: 'I like summer best. / I like winter best.' },
  ],
};

// ========== 测验题目 ==========
const QUIZZES = {
  // 认识图形
  'm_r_4': [
    { q: '一个正方形有几条边？', options: ['3条', '4条', '5条', '6条'], answer: 1 },
    { q: '三角形有几个角？', options: ['2个', '3个', '4个', '5个'], answer: 1 },
    { q: '圆形有几条边？', options: ['0条', '1条', '2条', '无数条'], answer: 3 },
    { q: '长方形和正方形有什么不同？', options: ['颜色不同', '正方形四条边一样长', '大小不同', '形状完全一样'], answer: 1 },
  ],
  // 量词
  'c_r_4': [
    { q: '一（ ）书', options: ['本', '只', '条', '个'], answer: 0 },
    { q: '一（ ）花', options: ['条', '朵', '本', '头'], answer: 1 },
    { q: '一（ ）鱼', options: ['个', '本', '条', '朵'], answer: 2 },
    { q: '一（ ）牛', options: ['头', '只', '条', '本'], answer: 0 },
    { q: '一（ ）树', options: ['朵', '棵', '条', '个'], answer: 1 },
  ],
  // 近义词反义词
  'c_r_3': [
    { q: '"大"的反义词是？', options: ['小', '多', '高', '长'], answer: 0 },
    { q: '"高兴"的近义词是？', options: ['伤心', '开心', '生气', '害怕'], answer: 1 },
    { q: '"快"的反义词是？', options: ['跑', '慢', '飞', '走'], answer: 1 },
    { q: '"美丽"的近义词是？', options: ['丑陋', '漂亮', '脏', '旧'], answer: 1 },
  ],
  // 阅读理解
  'c_p_3': [
    { q: '短文："春天来了，小草绿了，花儿开了，小鸟在树上唱歌。" 问：什么季节来了？', options: ['夏天', '春天', '秋天', '冬天'], answer: 1 },
    { q: '同上短文，小草变成了什么颜色？', options: ['黄色', '红色', '绿色', '蓝色'], answer: 2 },
    { q: '同上短文，谁在唱歌？', options: ['小草', '花儿', '小鸟', '大树'], answer: 2 },
  ],
  // 看图写话
  'c_p_4': [
    { q: '看到一个小朋友在帮助老奶奶过马路，你应该写什么主题？', options: ['助人为乐', '交通安全', '天气真好', '马路很宽'], answer: 0 },
    { q: '写话时，第一句话通常写什么？', options: ['结尾', '时间地点人物', '感想', '对话'], answer: 1 },
    { q: '好的写话应该有开头、中间和什么？', options: ['图画', '结尾', '标题', '日期'], answer: 1 },
  ],
  // 数字单词
  'e_r_3': [
    { q: '"5" 用英语怎么说？', options: ['three', 'four', 'five', 'six'], answer: 2 },
    { q: '"ten" 是什么意思？', options: ['十', '二', '一', '八'], answer: 0 },
    { q: '"7" 用英语怎么说？', options: ['six', 'seven', 'eight', 'nine'], answer: 1 },
    { q: '"twelve" 是什么意思？', options: ['十', '十一', '十二', '二十'], answer: 2 },
  ],
  // 日常问候
  'e_r_4': [
    { q: '早上好怎么说？', options: ['Good night', 'Good morning', 'Goodbye', 'Good evening'], answer: 1 },
    { q: '"Thank you" 是什么意思？', options: ['对不起', '谢谢', '你好', '再见'], answer: 1 },
    { q: '别人说 "How are you?"，你应该回答？', options: ['Goodbye', 'I am fine, thank you', 'Thank you', 'Hello'], answer: 1 },
    { q: '再见怎么说？', options: ['Hello', 'Sorry', 'Goodbye', 'Thanks'], answer: 2 },
  ],
  // 简单句型
  'e_p_3': [
    { q: '选正确的句子：', options: ['I like apple', 'I like apples', 'I apples like', 'Like I apples'], answer: 1 },
    { q: '"This is a cat." 是什么意思？', options: ['这是一只狗', '这是一只猫', '那是一只猫', '我有一只猫'], answer: 1 },
    { q: '选正确的句子：', options: ['She is a girl', 'She a girl is', 'Is she a girl', 'A girl she is'], answer: 0 },
    { q: '"I am happy." 是什么意思？', options: ['我很伤心', '我很开心', '我很累', '我很饿'], answer: 1 },
  ],
  // 自我介绍
  'e_p_4': [
    { q: '介绍自己的名字用哪句？', options: ['My name is...', 'You name is...', 'He name is...', 'Name my is...'], answer: 0 },
    { q: '说自己8岁用哪句？', options: ['I 8 years old', 'I am 8 years old', '8 I years old', 'Years old I 8'], answer: 1 },
    { q: '"I am from China." 是什么意思？', options: ['我喜欢中国', '我来自中国', '我去中国', '中国很大'], answer: 1 },
    { q: '介绍自己喜欢什么用哪句？', options: ['I likes...', 'I like...', 'Like I...', 'I am like...'], answer: 1 },
  ],
  // 长度单位
  'm_r_7': [
    { q: '1米等于多少厘米？', options: ['10厘米', '50厘米', '100厘米', '1000厘米'], answer: 2 },
    { q: '一支铅笔大约有多长？', options: ['2米', '15厘米', '50厘米', '1米'], answer: 1 },
    { q: '量教室的长度用什么单位最合适？', options: ['厘米', '毫米', '米', '千米'], answer: 2 },
    { q: '150厘米等于多少米多少厘米？', options: ['1米5厘米', '1米50厘米', '15米', '1米15厘米'], answer: 1 },
  ],
  // 角的认识
  'm_r_8': [
    { q: '直角是多少度？', options: ['30°', '60°', '90°', '180°'], answer: 2 },
    { q: '比直角小的角叫什么？', options: ['钝角', '锐角', '平角', '周角'], answer: 1 },
    { q: '三角板上最大的角是什么角？', options: ['锐角', '直角', '钝角', '都一样'], answer: 1 },
    { q: '一个角有（ ）个顶点？', options: ['0', '1', '2', '3'], answer: 1 },
  ],
  // 克与千克
  'm_r_10': [
    { q: '1千克 = （ ）克？', options: ['10克', '100克', '500克', '1000克'], answer: 3 },
    { q: '一个苹果大约重多少？', options: ['2克', '200克', '2千克', '20千克'], answer: 1 },
    { q: '哪种物品用"克"作单位？', options: ['一头牛', '一个大西瓜', '一颗糖', '一个人'], answer: 2 },
    { q: '3千克 + 500克 = ？', options: ['3500克', '800克', '350克', '3050克'], answer: 0 },
  ],
  // 数据收集整理
  'm_r_11': [
    { q: '统计同学们最喜欢的水果用什么方式？', options: ['猜一猜', '举手投票统计', '随便写', '老师指定'], answer: 1 },
    { q: '看统计表，"正"字的一笔代表几人？', options: ['1人', '5人', '10人', '不确定'], answer: 0 },
    { q: '一个"正"字写完代表几人？', options: ['3人', '5人', '8人', '10人'], answer: 1 },
    { q: '统计表里最多的那项叫做什么？', options: ['最少', '中间', '最多/众数', '平均'], answer: 2 },
  ],
  // 对称图形
  'm_r_12': [
    { q: '以下哪个是对称图形？', options: ['平行四边形', '等腰三角形', '一般三角形', '梯形'], answer: 1 },
    { q: '长方形有几条对称轴？', options: ['1条', '2条', '3条', '4条'], answer: 1 },
    { q: '正方形有几条对称轴？', options: ['1条', '2条', '3条', '4条'], answer: 3 },
    { q: '圆形有多少条对称轴？', options: ['2条', '4条', '8条', '无数条'], answer: 3 },
  ],
  // 年月日
  'm_p_8': [
    { q: '一年有多少个月？', options: ['10个', '12个', '24个', '365个'], answer: 1 },
    { q: '大月有几天？', options: ['28天', '30天', '31天', '32天'], answer: 2 },
    { q: '二月在平年有多少天？', options: ['28天', '29天', '30天', '31天'], answer: 0 },
    { q: '24时计时法中，下午3点是几时？', options: ['3时', '13时', '15时', '17时'], answer: 2 },
  ],
  // 位置与方向
  'm_p_10': [
    { q: '太阳从哪个方向升起？', options: ['东', '南', '西', '北'], answer: 0 },
    { q: '面对北极星，前面是？', options: ['东', '南', '西', '北'], answer: 3 },
    { q: '地图通常上面是哪个方向？', options: ['东', '南', '西', '北'], answer: 3 },
    { q: '如果你面向东，左边是什么方向？', options: ['东', '南', '西', '北'], answer: 3 },
  ],
  // 多音字辨析
  'c_r_7': [
    { q: '"长"在"长大"中读什么？', options: ['cháng', 'zhǎng', 'chàng', 'zhāng'], answer: 1 },
    { q: '"好"在"好学"中读什么？', options: ['hǎo', 'hào', 'hāo', 'háo'], answer: 1 },
    { q: '"种"在"种树"中读什么？', options: ['zhǒng', 'zhòng', 'chóng', 'zhōng'], answer: 1 },
    { q: '"只"在"一只鸟"中读什么？', options: ['zhī', 'zhǐ', 'zǐ', 'shí'], answer: 0 },
  ],
  // 标点符号
  'c_r_8': [
    { q: '"你今天去上学吗"后面用什么标点？', options: ['。', '！', '？', '，'], answer: 2 },
    { q: '"多美的花啊"后面用什么标点？', options: ['。', '！', '？', '，'], answer: 1 },
    { q: '一句话说完，陈述事实用什么标点？', options: ['句号', '感叹号', '问号', '逗号'], answer: 0 },
    { q: '句子中间短暂停顿用什么标点？', options: ['句号', '感叹号', '问号', '逗号'], answer: 3 },
  ],
  // 部首查字
  'c_r_10': [
    { q: '"海"字的部首是什么？', options: ['每', '氵', '母', '水'], answer: 1 },
    { q: '"花"字的部首是什么？', options: ['化', '七', '艹', '亻'], answer: 2 },
    { q: '用部首查字法，"江"先查什么部首？', options: ['工', '氵', '水', '一'], answer: 1 },
    { q: '"园"字的部首是什么？', options: ['元', '二', '囗', '儿'], answer: 2 },
  ],
  // 扩写句子
  'c_r_11': [
    { q: '"小鸟飞"扩写哪个最好？', options: ['小鸟飞', '可爱的小鸟在天空中自由地飞', '鸟飞了', '有一只小鸟在飞'], answer: 1 },
    { q: '扩写句子一般加什么？', options: ['加句号', '加形容词和地点', '删掉主语', '减字数'], answer: 1 },
    { q: '"花儿开了"怎么扩写最好？', options: ['花开了。', '五颜六色的花儿在花园里悄悄地开了', '有一朵花开了', '花没有开'], answer: 1 },
    { q: '扩写时哪个词可以让句子更生动？', options: ['很快', '美丽的', '有', '是'], answer: 1 },
  ],
  // 词语搭配
  'c_r_12': [
    { q: '"（ ）的教室"，哪个搭配最好？', options: ['美丽', '明亮', '好吃', '高大'], answer: 1 },
    { q: '"认真地（ ）"，哪个搭配最好？', options: ['吃饭', '学习', '睡觉', '走路'], answer: 1 },
    { q: '"（ ）的歌声"，哪个搭配最好？', options: ['开心', '美妙', '严肃', '整齐'], answer: 1 },
    { q: '"飞快地（ ）"，哪个搭配最好？', options: ['站着', '奔跑', '看书', '听音乐'], answer: 1 },
  ],
  // 关联词造句
  'c_p_7': [
    { q: '"因为下雨了，（ ）。" 填什么？', options: ['我就去公园', '所以运动会延期', '但是很开心', '然后吃饭'], answer: 1 },
    { q: '"虽然很累，（ ）。" 填什么？', options: ['所以休息', '但是很开心', '因为累了', '而且饿了'], answer: 1 },
    { q: '"（ ）好好学习，才能取得好成绩。" 填什么？', options: ['虽然', '因为', '只有', '但是'], answer: 2 },
    { q: '"不仅学习好，（ ）。" 填什么？', options: ['还乐于助人', '所以努力', '因为聪明', '但是调皮'], answer: 0 },
  ],
  // 修改病句
  'c_p_8': [
    { q: '"我忍不住不禁笑了"有什么问题？', options: ['没有问题', '词语重复', '缺主语', '标点错了'], answer: 1 },
    { q: '"他穿了一件新上衣和裤子。" 有什么问题？', options: ['没有问题', '缺谓语', '搭配不当（上衣和裤子不能同时穿一件）', '标点错了'], answer: 2 },
    { q: '"通过努力，使成绩提高了。" 有什么问题？', options: ['没有问题', '缺主语', '词语重复', '标点错了'], answer: 1 },
    { q: '"桌子上有" 有什么问题？', options: ['句子不完整', '词语重复', '标点错了', '主谓不一致'], answer: 0 },
  ],
  // 日记格式
  'c_p_10': [
    { q: '日记的第一行应该写什么？', options: ['标题', '日期和天气', '正文', '签名'], answer: 1 },
    { q: '日记应该用第几人称��？', options: ['第一人称（我）', '第二人称（你）', '第三人称（他）', '都可以'], answer: 0 },
    { q: '日记可以写什么内容？', options: ['只写好事', '生活中的真实见闻和感受', '只能写天气', '只能写学习'], answer: 1 },
    { q: '日记的正确日期格式是？', options: ['2024/7', '7月15日 星期一 晴', '15号', '星期天'], answer: 1 },
  ],
  // 近义词辨析
  'c_p_11': [
    { q: '"美丽"和"漂亮"的区别是？', options: ['完全一样', '"美丽"更书面优雅', '"漂亮"不能形容人', '没有区别'], answer: 1 },
    { q: '"突然"和"忽然"的区别是？', options: ['完全一样', '"突然"程度更重', '"忽然"不能用', '没有区别，可互换'], answer: 3 },
    { q: '"高兴"和"兴奋"哪个程度更深？', options: ['高兴', '兴奋', '一样', '都不深'], answer: 1 },
    { q: '"思念"和"想念"的区别是？', options: ['完全一样', '"思念"更深刻长远', '"想念"不能对亲人', '没有区别'], answer: 1 },
  ],
  // 童话阅读
  'c_p_12': [
    { q: '童话中的动物通常会怎样？', options: ['不会说话', '会说话有人的特点', '和真实动物一样', '都是坏的'], answer: 1 },
    { q: '童话故事通常有什么特点？', options: ['都是真实的事', '充满想象和夸张', '只有悲剧', '写得很短'], answer: 1 },
    { q: '《丑小鸭》是谁写的？', options: ['格林兄弟', '安徒生', '伊索', '中国民间'], answer: 1 },
    { q: '童话故事一般告诉我们什么？', options: ['怎么赚钱', '一个道理或启示', '怎么做作业', '怎么吃饭'], answer: 1 },
  ],
  // 天气
  'e_r_7': [
    { q: '晴天用英语怎么说？', options: ['Rainy', 'Sunny', 'Cloudy', 'Windy'], answer: 1 },
    { q: '"It is rainy." 是什么意思？', options: ['天气晴朗', '下雨天', '多云', '刮风'], answer: 1 },
    { q: '今天很冷怎么说？', options: ['It is hot', 'It is warm', 'It is cold', 'It is cool'], answer: 2 },
    { q: '"snowy" 是什么天气？', options: ['下雨', '下雪', '出太阳', '多云'], answer: 1 },
  ],
  // 反义词配对
  'e_r_10': [
    { q: '"big" 的反义词是？', options: ['tall', 'small', 'fat', 'long'], answer: 1 },
    { q: '"hot" 的反义词是？', options: ['warm', 'cool', 'cold', 'cool and cold'], answer: 2 },
    { q: '"fast" 的反义词是？', options: ['quick', 'slow', 'run', 'walk'], answer: 1 },
    { q: '"happy" 的反义���是？', options: ['glad', 'angry', 'sad', 'tired'], answer: 2 },
  ],
  // 星期几
  'e_r_11': [
    { q: '星期三用英语怎么说？', options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], answer: 2 },
    { q: '一周的最后一天是什么？', options: ['Friday', 'Saturday', 'Sunday', 'Monday'], answer: 2 },
    { q: '星期五用英语怎么说？', options: ['Thursday', 'Friday', 'Saturday', 'Sunday'], answer: 1 },
    { q: '星期一用英语怎么说？', options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'], answer: 1 },
  ],
  // There be 句型
  'e_p_8': [
    { q: '"有一只猫在桌子上" 哪个对？', options: ['There is a cat on the desk', 'There are a cat on the desk', 'There have a cat', 'Cat on desk'], answer: 0 },
    { q: '"有两本书" 哪个对？', options: ['There is two books', 'There are two books', 'There be two books', 'Two books there is'], answer: 1 },
    { q: '用 there be 句型时，单数用哪个？', options: ['are', 'is', 'am', 'be'], answer: 1 },
    { q: '"There is some water." 是什么意思？', options: ['有一些水', '有一些书', '有一杯水', '水在哪里'], answer: 0 },
  ],
  // 时间表达
  'e_p_9': [
    { q: '问"现在几点了"怎么说？', options: ['What time is it?', 'What is time?', 'How time is?', 'When is time?'], answer: 0 },
    { q: '"It is seven o\'clock." 是几点？', options: ['7点', '6点', '8点', '5点'], answer: 0 },
    { q: '"half past eight" 是几点？', options: ['8点', '8点整', '8点半', '9点'], answer: 2 },
    { q: '"3:15" 用英语怎么说？', options: ['three fifteen', 'three fifty', 'fifteen three', 'three five'], answer: 0 },
  ],
  // like 句型
  'e_p_10': [
    { q: '"你喜欢苹果吗？" 哪个对？', options: ['You like apples?', 'Do you like apples?', 'Like you apples?', 'Apples you like?'], answer: 1 },
    { q: '回答"Do you like milk?" 喜欢怎么说？', options: ['No, I don\'t', 'Yes, I do', 'Yes, I like', 'No, I do'], answer: 1 },
    { q: '"I like swimming." 是什么意思？', options: ['我喜欢跑步', '我喜欢游泳', '我喜欢唱歌', '我会游泳'], answer: 1 },
    { q: '"She likes dancing." 为什么用likes？', options: ['因为过去', '因为主语是第三人称单数', '因为是复数', '错了'], answer: 1 },
  ],
  // 人称代词
  'e_p_11': [
    { q: '"我"的英语是？', options: ['You', 'He', 'I', 'She'], answer: 2 },
    { q: '"他"的英语是？', options: ['She', 'He', 'It', 'They'], answer: 1 },
    { q: '"我们"的英语是？', options: ['We', 'Us', 'They', 'Our'], answer: 0 },
    { q: '用"he"时后面的be动词用哪个？', options: ['am', 'is', 'are', 'be'], answer: 1 },
  ],

  // 句式变换
  'c_p_13': [
    { q: '"这朵花真美！"改成陈述句', options: ['这朵花美', '这朵花真美', '这朵花很美', '花真美'], answer: 2 },
    { q: '反问句"��道你说得不对吗？"改��陈述句', options: ['你说得不对', '你说得对', '你可能说得对', '你说得对吗'], answer: 1 },
    { q: '"我们应该爱护环境。"改成反问句', options: ['我们不爱护环境吗？', '难道我们不应该爱护环境吗？', '我们应该不爱护环境吗？', '环境要被爱护吗？'], answer: 1 },
    { q: '双重否定句变成肯定句："我不能不去上学。"', options: ['我不去上学', '我必须去上学', '我可以不去上学', '我不想去上学'], answer: 1 },
  ],

  // 情态动词 can
  'e_p_13': [
    { q: '"I can swim."是什么意思？', options: ['我想游泳', '我会游泳', '我要游泳', '我爱游泳'], answer: 1 },
    { q: '"Can you dance?"怎么回答"No"?', options: ['No, I am not', 'No, I can', 'No, I can\'t', 'No, I don\'t'], answer: 2 },
    { q: '"他会唱歌"英文怎么说？', options: ['He sing', 'He can sing', 'He is sing', 'Can he sing'], answer: 1 },
    { q: '用can提问时，后面的动词用哪种形式？', options: ['加ing', '原形', '加s', '加ed'], answer: 1 },
  ],
};

// ========== 阅读理解短文 ==========
const READING_PASSAGES = {
  'r_r_1': {
    title: '小蚂蚁搬粮食',
    passage: '一天，小蚂蚁出去找食物。它在草地上发现了一块很大的面包屑。小蚂蚁可高兴了，它想："我要把这块面包搬回家，和伙伴们一起分享！"\n\n可是面包太大了，小蚂蚁搬不动。它想了想，飞快地跑回家，叫来了很多好朋友。大家一起喊着口号："嘿哟！嘿哟！"用力搬，终于把面包搬回了家。\n\n小蚂蚁们开心地吃了起来，蚂蚁妈妈笑着说："团结力量大！"',
    questions: [
      { q: '小蚂蚁找到了什么？', options: ['一粒米', '一块面包屑', '一颗糖', '一片树叶'], answer: 1 },
      { q: '小蚂蚁为什么自己搬不动面包？', options: ['它生病了', '路太远了', '面包太大了', '它不想搬'], answer: 2 },
      { q: '面包最后是怎么搬回家的？', options: ['妈妈帮忙', '叫来朋友一起搬', '扔掉了一半', '用机器运的'], answer: 1 },
      { q: '这个故事告诉我们什么道理？', options: ['要多吃饭', '团结力量大', '面包很好吃', '��路要快'], answer: 1 },
    ],
  },
  'r_r_2': {
    title: '春天来了',
    passage: '寒冷的冬天过去了，温暖的春天来了。\n\n小草从地里钻出来，绿绿的，嫩嫩的。花儿开了，有红的、黄的、紫的，五颜六色，美丽极了。\n\n柳树发芽了，长长的柳条在风中轻轻飘动，像小姑娘的辫子。小燕子从南方飞回来了，在天空中快乐地飞来飞去。\n\n小朋友们脱下厚厚的棉衣，在草地上跑啊，跳啊，开心极了。春天真美啊！',
    questions: [
      { q: '春天来了，小草是怎样的？', options: ['枯黄了', '从地里钻出来', '被雪埋住了', '不见了'], answer: 1 },
      { q: '柳条像什么？', options: ['绳子', '面条', '小姑娘��辫子', '树枝'], answer: 2 },
      { q: '谁从南方飞回来了？', options: ['大雁', '小燕子', '麻雀', '鸽子'], answer: 1 },
      { q: '花儿有哪些颜色？', options: ['只有红色', '红黄紫', '只有白色', '只有黄色'], answer: 1 },
    ],
  },
  'r_r_3': {
    title: '小乌龟和小兔子',
    passage: '森林里要举行跑步比赛，小乌龟和小兔子都报名了。\n\n小兔子看到对手是小乌龟，忍不住笑了："你爬得那么慢，怎么可能赢我呢？"\n\n比赛开始了，小兔子飞快地跑出去，很快就把小乌龟远远地甩在后面。小兔子想："反正小乌龟追不上来，我睡一会儿吧。"\n\n小乌龟一步一步地爬着，虽然很慢，但它一直没有停下。当小兔子醒来的时候，小乌龟已经快到终点了！\n\n最后，小乌龟赢了比赛。这个故事告诉我们：坚持就是胜利！',
    questions: [
      { q: '谁和谁参加跑步比赛？', options: ['小猫和小狗', '小乌龟和小兔子', '小鸡和小鸭', '小鹿和小马'], answer: 1 },
      { q: '小兔子为什么停下来？', options: ['它跑不动了', '它迷路了', '它觉得小乌龟太慢就睡觉了', '它受伤了'], answer: 2 },
      { q: '最后谁赢了？', options: ['小兔子', '小乌龟', '平局', '都没有到终点'], answer: 1 },
      { q: '这个故事告诉我们什么？', options: ['要跑得快', '坚持就是胜利', '要睡好觉', '不要参加比赛'], answer: 1 },
    ],
  },
  'r_p_1': {
    title: '美丽的校园',
    passage: '我们的校园可美了！\n\n一走进校门，就能看到两排高大的梧桐树，像两排绿色的卫兵。教学楼前面是一个大花坛，花坛里种满了各种各样的花，有月季、菊花、太阳花……\n\n操场很大，红色的跑道围着绿色的足球场，像一条彩带。同学们在操场上跑步、跳绳、踢球，到处都是欢声笑语。\n\n教室宽敞明亮，窗台上摆满了一盆盆绿色的植物。墙上贴着同学们的优秀作业和图画。能在这样的学校里学习，我感到非常幸福。',
    questions: [
      { q: '校门旁有什么树？', options: ['松树', '柳树', '梧桐树', '桃树'], answer: 2 },
      { q: '操场上的跑道是什么颜色的？', options: ['蓝色', '红色', '绿色', '黄色'], answer: 1 },
      { q: '教室里墙上贴着什么？', options: ['地图', '海报', '优秀作业和图画', '日历'], answer: 2 },
      { q: '"我"觉得在学校学习怎么样？', options: ['很累', '很无聊', '非常幸福', '还可以'], answer: 2 },
    ],
  },
  'r_p_2': {
    title: '我爱家乡',
    passage: '我的家乡是一个美丽的小山村。\n\n村子的前面有一条小河，河水清清的，可以看到小鱼在水里游来游去。夏天的时候，我和小伙伴们在河里捉鱼、打水仗，快乐极了。\n\n村子的后面是一座高山，山上长满了高大的树木。春天，山上的野花开了，远远望去，好像给大山穿上了花衣裳。秋天，山上的果子熟了，空气中飘着甜甜的果香。\n\n我爱我的家乡，爱这里的山山水水，更爱这里勤劳善良的人们。',
    questions: [
      { q: '村子前面有什么？', options: ['一条大河', '一条小河', '一个湖泊', '一片树林'], answer: 1 },
      { q: '夏天"我"和伙伴们在河里做什么？', options: ['划船', '钓鱼', '捉鱼打水仗', '游泳比赛'], answer: 2 },
      { q: '春天山上的野花开了像什么？', options: ['一幅画', '花衣裳', '彩虹', '地毯'], answer: 1 },
      { q: '"我"爱家乡的什么？', options: ['只有山', '只有水', '山山水水和人们', '只有水果'], answer: 2 },
    ],
  },
  'r_p_3': {
    title: '小小发明家',
    passage: '小华是个爱动脑筋的孩子。\n\n有一天，他看到妈妈用普通水壶浇花，水洒得到处都是。小华想："要是有个能控制水流的水壶就好了。"\n\n小华找来一个塑料瓶，在瓶盖上扎了几个小孔。装水后倒过来，水就像小雨一样洒下来，不会乱溅了。妈妈看到后，夸小华是个"小小发明家"。\n\n小华还做了很多小发明：废纸盒做成了笔筒，旧瓶子做成了花瓶。他用自己的双手和智慧，让生活变得更美好。',
    questions: [
      { q: '小华为什么想改水壶？', options: ['水壶太旧了', '水洒得到处都是', '水壶不好看', '水壶太重了'], answer: 1 },
      { q: '小华用什么做了新水壶？', options: ['铁盆', '塑料瓶', '玻璃杯', '纸盒'], answer: 1 },
      { q: '妈妈夸小华是什么？', options: ['好孩子', '小帮手', '小小发明家', '小聪明'], answer: 2 },
      { q: '这个故事主要告诉我们什么？', options: ['要多做家务', '爱动脑筋能创造美好', '塑料瓶很有用', '妈妈很辛苦'], answer: 1 },
    ],
  },
  'r_r_4': {
    title: '小猫钓鱼',
    passage: '星期天的早晨，天气特别好。小猫花花拿着鱼竿去小河边钓鱼。\n\n他刚把鱼钩放下去，一只蝴蝶飞过来了。花花放下鱼竿去追蝴蝶，蝴蝶飞走了。\n\n他回来继续钓鱼，又一只蜻蜓飞过来。花花又去追蜻蜓，蜻蜓也飞走了。\n\n到了中午，老猫爷爷提着满满一桶鱼走过来。花花一看自己的桶——一条鱼也没有！\n\n老猫爷爷笑着说："做事情要一心一意，三心二意是做不好的。"花花脸红了，他重新坐下来，专心钓鱼。不一会儿，一条大鱼就上钩了！',
    questions: [
      { q: '小猫花花去做什么？', options: ['捉蝴蝶', '钓鱼', '游泳', '散步'], answer: 1 },
      { q: '花花为什么没钓到鱼？', options: ['鱼竿坏了', '河里没鱼', '不专心总是玩', '运气不好'], answer: 2 },
      { q: '老猫爷爷告诉花花什么道理？', options: ['要吃鱼', '要换鱼竿', '做事要一心一意', '换个地方钓鱼'], answer: 2 },
      { q: '花花最后钓到鱼了吗？', options: ['没有', '钓到了', '不知道', '放弃了'], answer: 1 },
    ],
  },
  'r_r_5': {
    title: '秋天的果园',
    passage: '秋天到了，老师带我们去果园参观。\n\n一走进果园，我们就看到一大片苹果树。红彤彤的苹果挂满了枝头，像一个个小红灯笼。一阵风吹过，空气中飘着甜甜的果香。\n\n再往里走，是黄澄澄的梨子，像一个个小葫芦，可爱极了。旁边的柿子树上，挂着橙红色的柿子，像一个个小太阳。\n\n同学们开心极了，有的在数树上有多少果子，有的在闻果香。老师说："一分耕耘，一分收获。这些果实是农民伯伯辛苦劳动换来的。"\n\n这真是一个丰收的季节啊！',
    questions: [
      { q: '什么季节到了？', options: ['春天', '夏天', '秋天', '冬天'], answer: 2 },
      { q: '苹果是什么颜色的？', options: ['黄澄澄', '红彤彤', '绿油油', '紫盈盈'], answer: 1 },
      { q: '梨子像什么？', options: ['红灯笼', '小太阳', '小葫芦', '小铃铛'], answer: 2 },
      { q: '老师告诉我们什么道理？', options: ['水果很好吃', '一分耕耘一分收获', '要多喝水', '要多吃水果'], answer: 1 },
    ],
  },
  'r_r_6': {
    title: '勇敢的小松鼠',
    passage: '森林里住着一只小松鼠，他非常胆小，不敢从这棵树跳到那棵树。\n\n有一天，森林里刮起了大风，小松鼠家旁边的大树被风吹断了。小松鼠的家快要倒了！\n\n"怎么办？我必须跳到对面那棵安全的大树上！"小松鼠很害怕，腿都在发抖。\n\n他想起妈妈说过："害怕的时候，数到三就跳！"小松鼠深吸一口气，心里默数："一、二、三！"\n\n他闭上眼睛，用力一跳——成功了！他稳稳地落在了对面的树上。\n\n小松鼠高兴极了，他终于克服了恐惧。后来，他成了森林里最灵活的跳跃高手。',
    questions: [
      { q: '小松鼠以前有什么特点？', options: ['很勇敢', '非常胆小', '很调皮', '很懒惰'], answer: 1 },
      { q: '什么原因逼他必须跳跃？', options: ['妈妈说的', '家快倒了', '想玩', '别的松鼠逼他'], answer: 1 },
      { q: '妈妈说的秘诀是什么？', options: ['想别的事', '数到三就跳', '先练习', '找别人帮忙'], answer: 1 },
      { q: '小松鼠最后怎么样了？', options: ['还是不敢跳', '跳失败了', '成功克服恐惧成了高手', '搬家了'], answer: 2 },
    ],
  },
  'r_r_7': {
    title: '妈妈的生日',
    passage: '今天是妈妈的生日，小明很早就起床了。\n\n他想给妈妈一个惊喜。他悄悄地走进厨房，想给妈妈做一顿早饭。他把面包放进烤箱，倒了一杯牛奶，还从花园里摘了一朵小花。\n\n妈妈起床后，看到桌上摆好的早餐，惊喜地说："哇！这是谁做的呀？"\n\n小明从门后跳出来，大声说："妈妈，生日快乐！"\n\n妈妈感动得抱住了小明，眼睛里的泪花闪闪发光。她说："这是妈妈收到的最好的礼物！"\n\n小明明白了，最好的礼物不是花钱买来的，而是用心准备的爱。',
    questions: [
      { q: '小明为什么早起？', options: ['要上学', '想玩', '给妈妈惊喜', '睡不着'], answer: 2 },
      { q: '小明做了什么早饭？', options: ['面条和鸡蛋', '面包和牛奶', '米饭和菜', '包子和粥'], answer: 1 },
      { q: '妈妈为什么感动？', options: ['早饭很好吃', '小明用心准备的爱心', '小花很漂亮', '小明考试好了'], answer: 1 },
      { q: '小明明白了什么？', options: ['做饭很难', '最好的礼物是用心准备的爱', '要多存零花钱', '生日要吃蛋糕'], answer: 1 },
    ],
  },
  'r_r_8': {
    title: '下雨了',
    passage: '乌云姐姐飘过来了，天空变得灰蒙蒙的。\n\n滴答，滴答，滴滴答答——下雨了！\n\n雨点落到屋顶上，噼噼啪啪，像在打鼓。雨点落到树叶上，沙沙沙沙，像在弹琴。雨点落到池塘里，叮叮咚咚，像在歌唱。\n\n小花小草可高兴了，张开嘴巴大口大口地喝水。小青蛙跳出池塘，呱呱地叫着，好像在说："真凉快，真舒服！"\n\n过了一会儿，雨停了，太阳公公出来了。天空中架起一座弯弯的彩虹桥，赤橙黄绿青蓝紫，美丽极了！\n\n空气中弥漫着泥土的清香，世界被洗得干干净净。',
    questions: [
      { q: '雨点落到屋顶上发出什么声音？', options: ['沙沙沙沙', '噼噼啪啪', '叮叮咚咚', '滴滴答答'], answer: 1 },
      { q: '谁跳出池塘叫？', options: ['小鱼', '小青蛙', '小鸭子', '小乌龟'], answer: 1 },
      { q: '雨停后天空出现了什么？', options: ['白云', '小鸟', '彩虹', '星星'], answer: 2 },
      { q: '彩虹有几种颜色？', options: ['五种', '六种', '七种', '八种'], answer: 2 },
    ],
  },
  'r_r_9': {
    title: '小青蛙找家',
    passage: '小青蛙迷路了，他找不到回家的路。\n\n他遇到小蜜蜂，问："你知道池塘在哪里吗？"小蜜蜂说："我不知道，但我可以帮你问太阳！"\n\n太阳高高地挂在天空，他告诉小青蛙："白天的时候，面向太阳的方向就是南方。池塘在你的南边。"\n\n小青蛙向南跳了一段路，天黑了。他又迷路了。\n\n这时，天上的北极星一闪一闪地出现了。小兔子告诉他："晚上看北极星，北极星在的方向就是北方。"\n\n小青蛙根据北极星辨别了方向，终于找到了池塘。妈妈正在池塘边等着他呢！',
    questions: [
      { q: '小青蛙怎么了？', options: ['睡着了', '迷路了', '生病了', '出去玩'], answer: 1 },
      { q: '白天怎么辨别南方？', options: ['看星星', '面向太阳的方向', '看树', '问小鸟'], answer: 1 },
      { q: '晚上小青蛙靠什么辨别方向？', options: ['月亮', '北极星', '萤火虫', '猫头鹰'], answer: 1 },
      { q: '小青蛙最后找到家了吗？', options: ['没有', '找到了', '还在找', '放弃了'], answer: 1 },
    ],
  },
  'r_r_10': {
    title: '同桌的你',
    passage: '我的同桌叫小红，她是个特别的同桌。\n\n小红成绩很好，每次考试都是班级前三名。但她一点也不骄傲。我遇到不会做的题目，她总是耐心地讲给我听，一遍不懂就讲两遍，直到我会了为止。\n\n有一次体育课，我的膝盖摔破了，疼得走不了路。小红马上扶我去医务室，还一直安慰我："别怕，一会儿就不疼了。"\n\n还有一次下雨天，我忘了带伞。小红把自己的伞往我这边偏了一大半，自己的半边肩膀却淋湿了。\n\n有这样的同桌真幸福！我也要像小红一样，做一个乐于助人的好同学。',
    questions: [
      { q: '小红有什么特点？', options: ['骄傲', '成绩好又乐于助人', '不爱说话', '经常迟到'], answer: 1 },
      { q: '体育课发生了什么？', options: ['小红受伤了', '我膝盖摔破了', '下雨了', '考试得了第一'], answer: 1 },
      { q: '下雨天小红怎么做的？', options: ['自己走了', '把伞偏向我', '没带伞', '借了别人的伞'], answer: 1 },
      { q: '"我"想成为怎样的人？', options: ['成绩最好的人', '乐于助人的人', '跑得最快的人', '写字最好的人'], answer: 1 },
    ],
  },
  'r_p_4': {
    title: '第一次做饭',
    passage: '今天是周末，爸爸妈妈都去上班了。我想给他们一个惊喜——自己做饭！\n\n我回忆着妈妈做饭的样子：先淘米，把白花花的大米洗干净；再放进电饭锅，加水；按下开关——大功告成！\n\n接着我准备炒青菜。我把青菜一片一片洗干净，切成小段。打开火，往锅里倒油……糟糕，油倒多了！菜还没放进去，油就"噼里啪啦"地溅了出来，吓了我一跳。\n\n但我没有放弃，小心翼翼地把菜放进去翻炒。虽然炒出来的菜有点咸，样子也不太好看，但我觉得特别有成就感！\n\n晚上爸爸妈妈回来，看到我做的饭，惊讶极了。爸爸尝了一口菜，竖起大拇指："嗯，味道不错！"妈妈抱着我说："宝贝长大了！"',
    questions: [
      { q: '"我"为什么要做饭？', options: ['饿了', '想给爸妈惊喜', '妈妈让做的', '作业要求'], answer: 1 },
      { q: '做饭时遇到了什么困难？', options: ['锅坏了', '油倒多了溅出来', '没米了', '停电了'], answer: 1 },
      { q: '爸爸妈妈什么反应？', options: ['批评了', '惊讶和表扬', '没说什么', '自己重做了'], answer: 1 },
      { q: '"我"最后的心情是？', options: ['难过', '后悔', '有成就感', '不想再做了'], answer: 2 },
    ],
  },
  'r_p_5': {
    title: '蒲公英的旅行',
    passage: '草地上长着一株蒲公英。秋天到了，蒲公英妈妈的孩子们都长大了。\n\n每个孩子头上都顶着一把白色的小伞，风一吹，它们就要出发去旅行了。\n\n"妈妈，我害怕，外面的世界是什么样子的？"最小的蒲公英种子说。\n\n蒲公英妈妈温柔地说："孩子，不要怕。风会带你去看山川河流，去看森林草原。你会落在一片新的土地上，生根、发芽、开花，也会成为一位了不起的妈妈。"\n\n一阵秋风吹来，小蒲公英种子们乘着风飞了起来。它们飞过金黄的稻田，飞过清澈的小河，飞过绿色的山丘。\n\n最小那颗蒲公英种子落在了一个小山坡上。春天来了，它发芽了，长得又高又壮，开出了金黄的花朵。\n\n它终于明白了妈妈的话——勇敢地出发，才能看到最美的风景。',
    questions: [
      { q: '蒲公英的种子靠什么旅行？', options: ['小鸟', '风', '河水', '人'], answer: 1 },
      { q: '最小的种子为什么害怕？', options: ['风太大了', '不知道外面什么样', '太小了', '不想离开'], answer: 1 },
      { q: '种子飞过了哪些地方？', options: ['大海和高山', '稻田、小河和山丘', '城市', '沙漠'], answer: 1 },
      { q: '最小的种子最后怎么样了？', options: ['死了', '发芽开花成了妈妈', '飞走了', '回到了妈妈身边'], answer: 1 },
    ],
  },
  'r_p_6': {
    title: '保护地球妈妈',
    passage: '班会课上，李老师给我们看了一段视频。\n\n视频里，工厂的大烟囱冒着黑色的浓烟，小河里的水变成了深绿色，散发着臭味。小鱼儿都翻着白肚皮浮在水面上，太可怜了。森林里的大树被一棵棵砍倒，小动物们没有了家。\n\n同学们都沉默了。\n\n李老师说："地球是我们唯一的家园。如果我们继续破坏它，最后伤害的是我们自己。"\n\n小明举手说："我以后要节约用水！洗手时把水关小一点。"小红说："我要把垃圾分类投放！"小华说："我以后不用一次性筷子了！"\n\n李老师欣慰地笑了："每个人做一点点，合起来就是很大的力量。让我们一起来保护地球妈妈吧！"',
    questions: [
      { q: '视频里小河的水变成了什么颜色？', options: ['红色', '蓝色', '深绿色', '黄色'], answer: 2 },
      { q: '什么动物因为污染受害了？', options: ['小鸟', '小鱼', '小鹿', '蝴蝶'], answer: 1 },
      { q: '小明说要怎么保护地球？', options: ['多种树', '节约用水', '不乱扔垃圾', '不砍树'], answer: 1 },
      { q: '这个故事告诉我们要？', options: ['多看电视', '保护环境从每个人做起', '不要养鱼', '搬家'], answer: 1 },
    ],
  },
  'r_p_7': {
    title: '尊老爱幼',
    passage: '星期六的下午，我和妈妈坐公交车去外婆家。\n\n车上人很多，我被挤来挤去，好不容易才找到了一个位置坐下。下一站，一位白发苍苍的老奶奶颤颤巍巍地上来了，可是车上已经没有空位了。\n\n老奶奶扶着栏杆，随着车子的颠簸摇摇晃晃的，看起来很不安全。\n\n我看了看胸前的红领巾，马上站起来说："奶奶，您坐我这儿吧！"老奶奶连声说："谢谢，谢谢，真是个好孩子！"\n\n旁边的叔叔阿姨都向我投来赞许的目光，妈妈也对我笑了笑。虽然站了半小时腿有点酸，但我的心里暖暖的。\n\n尊老爱幼是中华民族的传统美德，我们每个人都要传承下去。',
    questions: [
      { q: '"我"和妈妈要去哪里？', options: ['学校', '外婆家', '公园', '超市'], answer: 1 },
      { q: '"我"为什么让座？', options: ['妈妈让的', '老奶奶不安全、尊老爱幼', '想被表扬', '想站起来'], answer: 1 },
      { q: '让座后"我"的心情怎么样？', options: ['后悔', '不高兴', '心里暖暖的', '无所谓'], answer: 2 },
      { q: '这个故事说明了什么？', options: ['公交车很挤', '尊老爱幼是美德要传承', '要戴红领巾', '不要坐公交车'], answer: 1 },
    ],
  },
  'r_p_8': {
    title: '小蚂蚁的旅行',
    passage: '小蚂蚁想去山的另一边看看。\n\n一大早，它就背着小包袱出发了。走啊走，它遇到了一粒大米——好重啊！但小蚂蚁没有停下，它把米粒举过头顶，继续前进。\n\n走啊走，一条小河挡住了去路。小蚂蚁没有船，怎么办呢？聪明的它找到一片树叶，推到水里当小船，用一根小树枝当桨。成功过河！\n\n走啊走，一片大叶子从树上掉下来，差点砸到它。小蚂蚁灵活地一闪，躲了过去。\n\n终于，太阳快要落山的时候，小蚂蚁爬上了大山的山顶。哇！山的另一边是一片开满鲜花的草原，美得像画一样！\n\n小蚂蚁开心极了。它明白了：只要有梦想，不怕困难，一步一个脚印，就能到达想去的地方。',
    questions: [
      { q: '小蚂蚁想去哪里？', options: ['回家', '山的另一边', '河边', '树上'], answer: 1 },
      { q: '小蚂蚁怎么过河的？', options: ['游过去', '用树叶当船', '飞过去', '绕路走'], answer: 1 },
      { q: '山的另一边是什么？', options: ['沙漠', '大海', '开满鲜花的草原', '城市'], answer: 2 },
      { q: '小蚂蚁明白了什么道理？', options: ['山很高', '有梦想不怕困难就能到达', '河很宽', '树叶很有用'], answer: 1 },
    ],
  },
  'r_p_9': {
    title: '秋游日记',
    passage: '10月18日 星期五 晴\n\n今天，学校组织了秋游活动，我们去了郊外的生态农场。这是我期待了好久的活动！\n\n早上八点，我们坐大巴出发了。一路上，同学们唱歌、讲故事，车厢里充满了欢声笑语。\n\n到了农场，我们首先参观了蔬菜大棚。棚里种着红彤彤的番茄、绿油油的黄瓜。农民伯伯教我们怎样给蔬菜浇水施肥。\n\n中午，我们在草地上野餐。大家拿出各自带来的食物分享。小红的妈妈做的三明治可好吃了！\n\n下午，我们去果园摘苹果。我摘了满满一篮子大红苹果，沉甸甸的。我还学会了辨认——要挑又红又大的才甜！\n\n四点我们依依不舍地坐车回学校。今天真是开心又有收获的一天！',
    questions: [
      { q: '这次秋游去了哪里？', options: ['博物馆', '动物园', '生态农场', '游乐园'], answer: 2 },
      { q: '在蔬菜大棚里看到了什么？', options: ['苹果和梨', '番茄和黄瓜', '花和草', '鱼和虾'], answer: 1 },
      { q: '下午做了什么活动？', options: ['种菜', '野餐', '摘苹果', '唱歌'], answer: 2 },
      { q: '这是一篇什么体裁的文章？', options: ['古诗', '日记', '童话', '说明文'], answer: 1 },
    ],
  },
  'r_p_10': {
    title: '夜空的星星',
    passage: '夏天的晚上，爷爷带我到院子里看星星。\n\n天像一块深蓝色的大幕布，上面缀满了亮闪闪的星星，有大有小，有明有暗。爷爷告诉我，那些星星其实都是巨大的太阳，只是离我们太远了，所以看起来很小。\n\n"你看，那七颗排成勺子形状的星星，就是北斗七星。"爷爷指着北边的天空说，"顺着勺口方向，就能找到北极星，古人就是靠它来辨别方向的。"\n\n我顺着爷爷手指的方向望去，果然看到了一个明亮的"大勺子"挂在天空，真神奇！\n\n"那边银白色的光带是银河，里面有几亿颗星星呢！"爷爷又说。\n\n我抬起头，望着满天的星星，心想：宇宙真大啊！我要好好学习，长大后去探索更远的星空。\n\n那天晚上，我做了一个梦，梦见自己乘着飞船，在星星之间自由地飞翔。',
    questions: [
      { q: '谁带"我"看星星？', options: ['爸爸', '妈妈', '爷爷', '老师'], answer: 2 },
      { q: '北斗七星是什么形状？', options: ['圆形', '勺子', '直线', '三角'], answer: 1 },
      { q: '古人靠哪颗星辨别方向？', options: ['北斗星', '北极星', '牛郎星', '织女星'], answer: 1 },
      { q: '"我"做了一个什么梦？', options: ['考试满分', '变成星星', '乘飞船在星星间飞翔', '去了游乐园'], answer: 2 },
    ],
  },

  'r_r_11': {
    title: '一把雨伞',
    passage: '上学路上，忽然下起了大雨。\n\n小明没有带伞，只好用手遮着头往前跑。雨水打在他身上，衣服很快就湿了。\n\n"同学，我们一起撑伞吧！"一个陌生的声音从身后传来。小明回头一看，是一个高年级的大姐姐，她撑着一把大花伞。\n\n小明不好意思地说："谢谢你，你真是太好了！"\n\n大姐姐笑着说："不用客气，我们都在一个学校上学，互相帮助是应该的。"\n\n到了学校门口，小明朝大姐姐深深鞠了一躬："谢谢你，我以后也要帮助别人！"大姐姐拍了拍他的肩膀，走进了校门。\n\n从那以后，小明也经常帮助别人。别人问他为什么，他笑着说："因为我也接受过别人的帮助呀！"',
    questions: [
      { q: '小明为什么被雨淋了？', options: ['他喜欢淋雨', '他没有带伞', '伞坏掉了', '伞太小了'], answer: 1 },
      { q: '谁帮助了小明？', options: ['他的同学', '一位老师', '一位大姐姐', '一位老爷爷'], answer: 2 },
      { q: '大姐姐撑的是什么伞？', options: ['黑伞', '大花伞', '小伞', '透明伞'], answer: 1 },
      { q: '这个故事告诉我们什么？', options: ['要多带伞', '得到帮助后也要帮助别人', '大姐姐很丑', '下雨天不能上学'], answer: 1 },
    ],
  },

  'r_p_11': {
    title: '种下一粒种子',
    passage: '春天来了，老师给每个同学发了一粒向日葵种子。\n\n"请大家回家种下这粒种子，用心照顾它，观察它的成长。"老师微笑着说。\n\n小丽回到家，找了一个花盆，小心翼翼地种下了种子。她每天浇水，放在阳台上晒太阳。\n\n过了几天，一个小嫩芽从土里钻了出来。小丽高兴得跳了起来！\n\n又过了两个星期，小苗长高了一大截。一个月后，它已经比小丽的膝盖还高了。\n\n终于有一天，一朵金黄色的向日葵绽放了，它每天都朝着太阳微笑。\n\n小丽在日记上写道：从一粒小小的种子到一朵美丽的向日葵，生命的成长真奇妙！我也要像向日葵一样，永远向着阳光生长。',
    questions: [
      { q: '老师给同学们发了什么种子？', options: ['玫瑰花', '向日葵', '菊花', '薰衣草'], answer: 1 },
      { q: '小丽把花盆放在哪里？', options: ['教室里', '卧室里', '阳台上', '厨房里'], answer: 2 },
      { q: '几天后发生了什么？', options: ['开花了', '小苗枯了', '小嫩芽长了出来', '种子不见了'], answer: 2 },
      { q: '小丽从这件事中学到了什么？', options: ['种花很累', '要向阳光生长', '不要种花', '向日葵不好看'], answer: 1 },
    ],
  },
};

// ========== 数学应用题 ==========
const WORD_PROBLEMS = {
  'm_r_5': [
    { q: '小明有15个苹果，吃了3个，还剩几个苹果？', answer: 12 },
    { q: '小红买了4本笔记本，每本3元，一共花了多少元？', answer: 12 },
    { q: '教室里有6排桌子，每排5张，一共有多少张桌子？', answer: 30 },
    { q: '妈妈买了24个草莓，平均分给4个小朋友，每人分几个？', answer: 6 },
    { q: '一根绳子长20米，剪去8米，还剩多少米？', answer: 12 },
    { q: '小华每天写2页字帖，一周（7天）能写多少页？', answer: 14 },
    { q: '商店里有35个气球，卖出了18个，还剩多少个？', answer: 17 },
    { q: '一个花坛有9棵花，5个花坛共有��少棵花？', answer: 45 },
    { q: '小丽有40元，买了一个15元的笔盒和一个8元的尺子，还剩多少元？', answer: 17 },
    { q: '班里有42个同学，分成6组打扫卫生，每组有几个同学？', answer: 7 },
  ],
  'm_p_5': [
    { q: '一个长方形花坛长8米，宽3米，它的周长是多少米？', answer: 22, hint: '周长 = (长 + 宽) x 2' },
    { q: '一本故事书有72页，小军每天看8页，几天能看完？', answer: 9 },
    { q: '李老师买了3盒铅笔，每盒12支，又买了8支红笔，一共有多少支笔？', answer: 44 },
    { q: '操场一圈是200米，小丽跑了3圈，一共跑了多少米？', answer: 600 },
    { q: '一个蛋糕62元，小明有100元，买完后还剩多少元？', answer: 38 },
    { q: '篮球队有15人，足球队人数是篮球队的2倍，两队共有多少人？', answer: 45 },
    { q: '一张电影票25元，爸爸买了4张票，付了100元，应找回多少钱？', answer: 0 },
    { q: '水果店有380个苹果，上午卖了120个，下午卖了95个，还剩多少个？', answer: 165 },
    { q: '每辆车可以坐6人，35个小朋友去春游，至少需要几辆车？', answer: 6, hint: '35 / 6 = 5...5，多出5人还需1辆车' },
    { q: '小华有250元，玩具火车148元，玩具飞机89元，买两样够吗？差多少？', answer: 13, hint: '148 + 89 = 237，250 - 237 = 13元，够了！' },
  ],
  // 集合与重叠
  'm_p_11': [
    { q: '班里有30人，喜欢篮球的18人，喜欢足球的15人，两样都喜欢的5人。只喜欢篮球的有几人？', answer: 13, hint: '18 - 5 = 13人（只喜欢篮球）' },
    { q: '兴趣小组共25人，学绘画的14人，学书法的12人，两样都学的4人。只学绘画的有几人？', answer: 10, hint: '14 - 4 = 10人' },
    { q: '全班40人，做完语文作业的35人，做完数学作业的32人，都做完的28人。两样都没做完的有几人？', answer: 1, hint: '35+32-28=39人至少做完一样，40-39=1人' },
    { q: '调查50个同学，爱吃苹果的30人，爱吃香蕉的25人，两样都爱的10人。只爱吃苹果的有几人？', answer: 20, hint: '30 - 10 = 20人' },
  ],
  // 归一归总
  'm_p_12': [
    { q: '3个笔记本15元，买5个同样的笔记本需要多少元？', answer: 25, hint: '先算1本：15÷3=5元，再算5本：5×5=25元' },
    { q: '4个工人6天修完一条路，如果2个工人修，需要多少天？', answer: 12, hint: '总工作量固定：4×6=24，24÷2=12天' },
    { q: '小明4分钟写32个字，照这个速度，10分钟能写多少个字？', answer: 80, hint: '1分钟：32÷4=8个，10分钟：8×10=80个' },
    { q: '5盒饼干30元，用48元可以买几盒同样的饼干？', answer: 8, hint: '每盒：30÷5=6元，48÷6=8盒' },
  ],
};

// ========== 默认设置 ==========
const DEFAULT_SETTINGS = {
  childName: '小朋友',
  password: '1234',
};

// ========== 练习题生成器（数学运算）==========
function generateMathProblems(type) {
  const problems = [];
  switch (type) {
    case 'm_r_1': // 100以内加减法
      for (let i = 0; i < 10; i++) {
        const a = Math.floor(Math.random() * 50) + 10;
        const b = Math.floor(Math.random() * 40) + 5;
        const isAdd = Math.random() > 0.5;
        if (isAdd) {
          problems.push({ q: `${a} + ${b} = ?`, answer: a + b });
        } else {
          problems.push({ q: `${a} - ${b} = ?`, answer: a - b });
        }
      }
      break;
    case 'm_r_3': // 认识时间
      const hours = [3, 6, 9, 12, 4, 7, 10, 2];
      const minutes = [0, 15, 30, 45];
      for (let i = 0; i < 8; i++) {
        const h = hours[Math.floor(Math.random() * hours.length)];
        const m = minutes[Math.floor(Math.random() * minutes.length)];
        const answer = m === 0 ? `${h}点整` : m === 15 ? `${h}点15分` : m === 30 ? `${h}点半` : `${h}点45分`;
        problems.push({ q: `⏰ 时针指${h}，分针指${m === 0 ? '12' : m === 15 ? '3' : m === 30 ? '6' : '9'}`, answer: answer, isTime: true });
      }
      break;
    case 'm_p_1': // 除法初步
      for (let i = 0; i < 10; i++) {
        const b = Math.floor(Math.random() * 8) + 2;
        const result = Math.floor(Math.random() * 9) + 1;
        const a = b * result;
        problems.push({ q: `${a} ÷ ${b} = ?`, answer: result });
      }
      break;
    case 'm_p_3': // 周长
      for (let i = 0; i < 8; i++) {
        const isRect = Math.random() > 0.5;
        if (isRect) {
          const l = Math.floor(Math.random() * 10) + 3;
          const w = Math.floor(Math.random() * 8) + 2;
          problems.push({ q: `长方形长${l}cm，宽${w}cm，周长=?`, answer: 2 * (l + w), hint: '周长 = (长 + 宽) × 2' });
        } else {
          const s = Math.floor(Math.random() * 10) + 3;
          problems.push({ q: `正方形边长${s}cm，周长=?`, answer: 4 * s, hint: '周长 = 边长 × 4' });
        }
      }
      break;
    case 'm_p_4': // 万以内加减
      for (let i = 0; i < 10; i++) {
        const a = Math.floor(Math.random() * 4000) + 1000;
        const b = Math.floor(Math.random() * 3000) + 500;
        const isAdd = Math.random() > 0.5;
        if (isAdd) {
          problems.push({ q: `${a} + ${b} = ?`, answer: a + b });
        } else {
          problems.push({ q: `${a} - ${b} = ?`, answer: a - b });
        }
      }
      break;
    case 'm_r_6': // 混合运算（二年级）
      for (let i = 0; i < 10; i++) {
        const a = Math.floor(Math.random() * 20) + 5;
        const b = Math.floor(Math.random() * 9) + 2;
        const c = Math.floor(Math.random() * 9) + 1;
        const pattern = Math.floor(Math.random() * 3);
        if (pattern === 0) {
          problems.push({ q: `${a} + ${b} × ${c} = ?`, answer: a + b * c, hint: '先算乘法再算加法' });
        } else if (pattern === 1) {
          problems.push({ q: `${a} - ${b} × ${c} = ?`, answer: a - b * c, hint: '先算乘法再算减法' });
        } else {
          problems.push({ q: `(${a} + ${b}) × ${c} = ?`, answer: (a + b) * c, hint: '有括号先算括号里的' });
        }
      }
      break;
    case 'm_r_9': // 有余数的除法
      for (let i = 0; i < 10; i++) {
        const b = Math.floor(Math.random() * 7) + 2;
        const q = Math.floor(Math.random() * 8) + 1;
        const r = Math.floor(Math.random() * (b - 1)) + 1;
        const a = b * q + r;
        problems.push({ q: `${a} ÷ ${b} = ?`, answer: `${q}...余${r}`, isTime: true, hint: '写出商和余数' });
      }
      break;
    case 'm_p_6': // 多位数乘一位数
      for (let i = 0; i < 10; i++) {
        const a = Math.floor(Math.random() * 900) + 100;
        const b = Math.floor(Math.random() * 8) + 2;
        problems.push({ q: `${a} × ${b} = ?`, answer: a * b });
      }
      break;
    case 'm_p_9': // 面积初步
      for (let i = 0; i < 8; i++) {
        const isRect = Math.random() > 0.5;
        if (isRect) {
          const l = Math.floor(Math.random() * 10) + 3;
          const w = Math.floor(Math.random() * 8) + 2;
          problems.push({ q: `长方形长${l}cm，宽${w}cm，面积=?`, answer: l * w, hint: '面积 = 长 × 宽' });
        } else {
          const s = Math.floor(Math.random() * 10) + 2;
          problems.push({ q: `正方形边长${s}cm，面积=?`, answer: s * s, hint: '面积 = 边长 × 边长' });
        }
      }
      break;
    case 'm_p_13': // 两位数除以一位数
      for (let i = 0; i < 10; i++) {
        const b = Math.floor(Math.random() * 8) + 2;
        const result = Math.floor(Math.random() * 20) + 5;
        const a = b * result;
        problems.push({ q: `${a} ÷ ${b} = ?`, answer: result, hint: '列竖式计算：从高位除起' });
      }
      break;
    case 'm_r_14': // 乘法口诀口算（表内乘法 1-9）
      for (let i = 0; i < 10; i++) {
        const a = Math.floor(Math.random() * 9) + 1;
        const b = Math.floor(Math.random() * 9) + 1;
        problems.push({ q: `${a} × ${b} = ?`, answer: a * b });
      }
      break;
    case 'm_r_15': // 表内除法口算（用乘法口诀求商）
      for (let i = 0; i < 10; i++) {
        const b = Math.floor(Math.random() * 8) + 2;        // 除数 2-9
        const result = Math.floor(Math.random() * 9) + 1;   // 商 1-9
        const a = b * result;
        problems.push({ q: `${a} ÷ ${b} = ?`, answer: result, hint: `想：（）× ${b} = ${a}` });
      }
      break;
    case 'm_r_5': // 二年级应用题
    case 'm_p_5': // 三年级应用题
    case 'm_p_11': // 集合与重叠
    case 'm_p_12': // 归一归总
      return WORD_PROBLEMS[type] || [];
  }
  return problems;
}

// ========== 成就系统 ==========
const ACHIEVEMENTS = [
  { id: 'a1', name: '初出茅庐', icon: '🌱', desc: '完成第一个任务', condition: (s) => s.totalTasksDone >= 1 },
  { id: 'a2', name: '勤劳小蜜蜂', icon: '🐝', desc: '一天内完成所有任务', condition: (s) => s.allTasksInOneDay },
  { id: 'a3', name: '坚持七天', icon: '🔥', desc: '连续打卡7天', condition: (s) => s.streak >= 7 },
  { id: 'a4', name: '小富翁', icon: '💰', desc: '累计赚取100金币', condition: (s) => s.totalEarned >= 100 },
  { id: 'a5', name: '宠物主人', icon: '🐾', desc: '拥有第一只宠物', condition: (s) => s.petsOwned >= 1 },
  { id: 'a6', name: '收藏家', icon: '🏆', desc: '拥有5只宠物', condition: (s) => s.petsOwned >= 5 },
  { id: 'a7', name: '学习达人', icon: '🎓', desc: '完成10个学习任务', condition: (s) => s.learningCompleted >= 10 },
  { id: 'a8', name: '满分学霸', icon: '⭐', desc: '测验全对3次', condition: (s) => s.perfectQuizzes >= 3 },
  { id: 'a9', name: '坚持三十天', icon: '👑', desc: '连续打卡30天', condition: (s) => s.streak >= 30 },
  { id: 'a10', name: '宠物乐园', icon: '🌈', desc: '拥有10只宠物', condition: (s) => s.petsOwned >= 10 },
];
