/**
 * 小学二升三暑假养宠大作战 - 主应用逻辑
 */

// ==================== 状态管理 ====================
const STORAGE_KEY = 'summer_workstation_v1';

let state = {
  coins: 0,
  totalEarned: 0,
  totalTasksDone: 0,
  streak: 0,
  lastActiveDate: null,
  allTasksInOneDay: false,
  perfectQuizzes: 0,
  learningCompleted: 0,
  pets: [],                // 拥有的宠物ID列表
  activePetId: null,
  petStates: {},           // { petId: { hunger, happiness, energy, lastUpdate } }
  petNames: {},            // { petId: '自定义名称' }
  foodInventory: {},       // { foodId: count }
  tasks: {},               // { '2024-01-01': { t1: true, t2: true, ... } }
  tasksConfig: null,       // 用户自定义任务列表，null表示使用默认
  learningProgress: {},    // { 'm_r_1': true, ... } — 每日重置
  learnResetDate: null,    // 学习进度重置日期
  achievements: [],        // 已解锁成就ID列表
  checkInDates: [],        // 打卡日期列表
  childName: '小朋友',      // 小朋友名字
  totalLearnAllTime: 0,    // 累计学习完成数（跨天统计）
  company: {
    name: '毛孩子有限公司',  // 公司名称（用户可自定义）
    level: 1,              // 公司等级（工资倍率）
    totalEarned: 0,        // 公司累计营收
    employees: {},         // { petId: { job: 'chef', lastEarn: 时间戳 } }
    dailyKey: null,        // 公司工资每日封顶日期标记
    dailyEarned: 0,        // 今日已从公司领取的工资
  },
  gacha: {
    shards: 0,             // 神兽碎片数量
    todayDraws: 0,         // 今日已扭蛋次数
    dailyKey: null,        // 日期标记（用于重置每日次数）
    collection: [],        // 扭蛋/储蓄获得的神兽收藏（id 列表）
  },
  savings: {
    goal: 0,               // 储蓄目标
    saved: 0,              // 已存入储蓄罐（锁定，不可其他消费）
  },
};

let currentTab = 'tasks';
let currentSubject = 'math';
let currentShopTab = 'pets';

// 获取当前任务列表（用户可自定义）
function getTasks() {
  return state.tasksConfig || DAILY_TASKS;
}

// 每日学习内容轮换：根据日期从学习列表中选出当天的内容
function getDailyLearnItems(items, count) {
  if (!items || items.length === 0) return [];
  if (items.length <= count) return items;
  const today = todayStr();
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = (hash * 31 + today.charCodeAt(i)) & 0x7fffffff;
  }
  const offset = hash % items.length;
  const result = [];
  for (let i = 0; i < Math.min(count, items.length); i++) {
    result.push(items[(offset + i) % items.length]);
  }
  return result;
}

// ==================== LocalStorage ====================
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('保存失败:', e);
  }
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      state = { ...state, ...JSON.parse(saved) };
    }
    // 兼容旧数据：给没有 adoptedAt 的宠物补上时间戳
    if (state.petStates) {
      Object.keys(state.petStates).forEach(petId => {
        if (!state.petStates[petId].adoptedAt) {
          state.petStates[petId].adoptedAt = state.petStates[petId].lastUpdate || Date.now();
        }
      });
    }
    // 兼容旧数据：确保公司结构存在
    if (!state.company) state.company = { name: '毛孩子有限公司', level: 1, totalEarned: 0, employees: {} };
    if (!state.company.employees) state.company.employees = {};
    if (!state.company.name) state.company.name = '毛孩子有限公司';
    if (state.company.dailyKey === undefined) state.company.dailyKey = null;
    if (state.company.dailyEarned === undefined) state.company.dailyEarned = 0;
    if (!state.gacha) state.gacha = { shards: 0, todayDraws: 0, dailyKey: null, collection: [], lastPrize: null };
    if (!state.gacha.collection) state.gacha.collection = [];
    if (state.gacha.lastPrize === undefined) state.gacha.lastPrize = null;
    if (!state.savings) state.savings = { goal: 0, saved: 0 };
  } catch (e) {
    console.error('加载失败:', e);
  }
}

// ==================== 工具函数 ====================
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getTodayKey() { return todayStr(); }

function getYesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getDaysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: '💡', warning: '⚠️' };
  toast.innerHTML = `<span>${icons[type] || '💡'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

function flyCoins(x, y, count = 3) {
  const container = document.getElementById('coin-fly-container');
  for (let i = 0; i < count; i++) {
    const coin = document.createElement('div');
    coin.className = 'coin-fly';
    coin.textContent = '🪙';
    coin.style.left = (x + (Math.random() - 0.5) * 60) + 'px';
    coin.style.top = y + 'px';
    coin.style.animationDelay = (i * 0.1) + 's';
    container.appendChild(coin);
    setTimeout(() => coin.remove(), 1200);
  }
}

function launchConfetti() {
  const container = document.getElementById('confetti-container');
  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#C7CEEA', '#FFB7B2', '#B5EAD7'];
  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (1.5 + Math.random() * 1) + 's';
    confetti.style.animationDelay = (Math.random() * 0.5) + 's';
    if (Math.random() > 0.5) confetti.style.borderRadius = '50%';
    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

function bounceCoinDisplay() {
  const display = document.getElementById('coin-display');
  display.classList.add('bounce');
  setTimeout(() => display.classList.remove('bounce'), 500);
}

function addCoins(amount, sourceX, sourceY) {
  state.coins += amount;
  state.totalEarned += amount;
  if (sourceX !== undefined && sourceY !== undefined) {
    flyCoins(sourceX, sourceY, Math.min(amount, 5));
  }
  bounceCoinDisplay();
  updateCoinDisplay();
  saveState();
  checkAchievements();
}

function spendCoins(amount) {
  if (state.coins < amount) return false;
  state.coins -= amount;
  updateCoinDisplay();
  saveState();
  return true;
}

function updateCoinDisplay() {
  document.getElementById('coin-amount').textContent = state.coins;
}

// ==================== 小朋友名字展示 ====================
function updateChildNameDisplay() {
  const el = document.getElementById('child-name-display');
  if (el) el.textContent = state.childName || '小朋友';
}

// ==================== 设置系统 ====================

function openSettings() {
  showSettingsPanel();
}

function showSettingsPanel() {
  const overlay = document.getElementById('settings-overlay');
  const content = document.getElementById('settings-content');
  const tasks = getTasks();

  let tasksHtml = tasks.map((t, i) => `
    <div class="settings-task-row">
      <span class="settings-task-icon">${t.icon}</span>
      <div class="settings-task-info">
        <input type="text" value="${escapeHtml(t.name)}" data-field="name" data-idx="${i}" class="settings-input" placeholder="任务名称">
      </div>
      <div class="settings-task-reward">
        <span>🪙</span>
        <input type="number" value="${t.reward}" data-field="reward" data-idx="${i}" class="settings-input small" placeholder="金币" min="1" max="99">
      </div>
      <button class="settings-btn danger" onclick="deleteTask(${i})">✕</button>
    </div>
  `).join('');

  content.innerHTML = `
    <div class="modal-header">
      <h2>⚙️ 家长设置</h2>
      <button class="modal-close" onclick="closeSettings()">✕</button>
    </div>
    <div class="settings-body">
      <div class="settings-section">
        <h3>👶 小朋友名字</h3>
        <div style="display:flex;align-items:center;gap:10px;">
          <input type="text" id="child-name-input" value="${state.childName}" class="settings-input" placeholder="输入名字" style="flex:1;">
          <button class="btn-primary" onclick="saveChildName()" style="white-space:nowrap;">保存</button>
        </div>
      </div>

      <div class="settings-section">
        <h3>📋 任务管理</h3>
        <div class="settings-task-list">${tasksHtml}</div>
        <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;">
          <button class="settings-btn" onclick="addNewTask()">+ 添加任务</button>
          <button class="settings-btn" onclick="saveAllTasks()">💾 保存任务</button>
          <button class="settings-btn" onclick="resetTasks(false)">↺ 恢复默认</button>
        </div>
      </div>

      <div class="settings-section">
        <h3>🪙 金币管理</h3>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span style="font-size:16px;font-weight:bold;">当前：🪙 ${state.coins}</span>
          <input type="number" id="coin-amount-input" class="settings-input small" placeholder="数量" min="1" value="10">
          <button class="settings-btn" onclick="adjustCoins(1)">+ 添加</button>
          <button class="settings-btn" onclick="adjustCoins(-1)">- 扣除</button>
        </div>
      </div>

      <div class="settings-section">
        <h3>📊 数据管理</h3>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="settings-btn danger" onclick="resetAllData()">⚠️ 重置所有数据</button>
        </div>
        <p style="margin-top:8px;font-size:12px;color:var(--text-light);">此操作将清除所有数据，包括金币、宠物、打卡记录等，不可恢复！</p>
      </div>
    </div>
  `;
  overlay.classList.add('active');
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, c => map[c]);
}

function saveChildName() {
  const input = document.getElementById('child-name-input');
  state.childName = input.value.trim() || '小朋友';
  saveState();
  updateChildNameDisplay();
  showToast('名字修改成功！', 'success');
}

function saveAllTasks() {
  const rows = document.querySelectorAll('.settings-task-row');
  const newTasks = [];
  rows.forEach((row, i) => {
    const nameInput = row.querySelector('[data-field="name"]');
    const rewardInput = row.querySelector('[data-field="reward"]');
    if (nameInput && nameInput.value.trim()) {
      const oldTask = getTasks()[i];
      newTasks.push({
        id: oldTask ? oldTask.id : ('custom_' + Date.now() + '_' + i),
        name: nameInput.value.trim(),
        icon: oldTask ? oldTask.icon : '⭐',
        reward: parseInt(rewardInput?.value) || 1,
        category: oldTask ? oldTask.category : 'daytime',
      });
    }
  });
  state.tasksConfig = newTasks;
  saveState();
  closeSettings();
  if (currentTab === 'tasks') renderTasks();
  showToast('任务保存成功！', 'success');
}

function addNewTask() {
  const list = document.querySelector('.settings-task-list');
  const idx = list.children.length;
  const row = document.createElement('div');
  row.className = 'settings-task-row';
  row.innerHTML = `
    <span class="settings-task-icon">⭐</span>
    <div class="settings-task-info">
      <input type="text" data-field="name" data-idx="${idx}" class="settings-input" placeholder="新任务名称">
    </div>
    <div class="settings-task-reward">
      <span>🪙</span>
      <input type="number" value="2" data-field="reward" data-idx="${idx}" class="settings-input small" placeholder="金币" min="1">
    </div>
    <button class="settings-btn danger" onclick="this.closest('.settings-task-row').remove()">✕</button>
  `;
  list.appendChild(row);
}

function deleteTask(idx) {
  const rows = document.querySelectorAll('.settings-task-row');
  if (rows[idx]) rows[idx].remove();
  // Re-index the data attributes
  document.querySelectorAll('.settings-task-row').forEach((row, i) => {
    row.querySelectorAll('[data-field]').forEach(el => el.dataset.idx = i);
  });
}

function resetTasks(showConfirm = true) {
  if (showConfirm && !confirm('确定恢复默认任务列表吗？自定义任务将丢失。')) return;
  state.tasksConfig = null; // null表示使用默认
  saveState();
  showSettingsPanel();
  showToast('已恢复默认任务', 'success');
}

function adjustCoins(sign) {
  const input = document.getElementById('coin-amount-input');
  const amount = parseInt(input.value) || 0;
  if (amount <= 0) { showToast('请输入有效数量', 'warning'); return; }
  if (sign < 0 && state.coins < amount) { showToast('扣除数量不能超过当前金币', 'warning'); return; }
  state.coins += sign * amount;
  if (sign > 0) state.totalEarned += amount;
  saveState();
  updateCoinDisplay();
  showSettingsPanel();
  showToast(`金币${sign > 0 ? '增加' : '减少'}了 ${amount}！`, sign > 0 ? 'success' : 'warning');
}

function resetAllData() {
  if (!confirm('⚠️ 确定要重置所有数据吗？\n\n这将清除：\n- 所有金币\n- 所有宠物\n- 所有打卡记录\n- 所有学习进度\n- 所有成就\n\n此操作不可恢复！')) return;
  if (!confirm('再次确认：真的要删除所有数据吗？')) return;
  state = {
    coins: 0, totalEarned: 0, totalTasksDone: 0,
    streak: 0, lastActiveDate: null, allTasksInOneDay: false,
    perfectQuizzes: 0, learningCompleted: 0,
    pets: [], activePetId: null, petStates: {}, petNames: {},
    foodInventory: {}, tasks: {}, tasksConfig: null,
    learningProgress: {}, achievements: [], checkInDates: [],
    childName: state.childName,
  };
  saveState();
  closeSettings();
  updateCoinDisplay();
  updateChildNameDisplay();
  switchTab('tasks');
  showToast('所有数据已重置', 'warning');
}

function closeSettings() {
  document.getElementById('settings-overlay').classList.remove('active');
}

// ==================== 宠物换名 ====================
function openRenamePet(petId) {
  const pet = PETS.find(p => p.id === petId);
  const currentName = state.petNames[petId] || pet.name;
  const overlay = document.getElementById('rename-modal-overlay');
  const content = document.getElementById('rename-modal-content');
  content.innerHTML = `
    <div class="modal-header">
      <h2>✏️ 给${pet.emoji}换名字</h2>
      <button class="modal-close" onclick="closeRenamePet()">✕</button>
    </div>
    <div style="text-align:center;padding:20px;">
      <div style="font-size:60px;margin-bottom:16px;">${getPetMediaHtml(petId, 'rename-pet-img')}</div>
      <p style="font-size:14px;color:var(--text-soft);margin-bottom:16px;">原名：${pet.name}</p>
      <input type="text" id="pet-rename-input" value="${escapeHtml(currentName)}" class="settings-input" placeholder="新名字" style="width:200px;text-align:center;font-size:18px;" 
        onkeydown="if(event.key==='Enter') confirmRenamePet('${petId}')" autocomplete="off">
      <div style="margin-top:20px;">
        <button class="btn-primary" onclick="confirmRenamePet('${petId}')">确认改名</button>
      </div>
    </div>
  `;
  overlay.classList.add('active');
  setTimeout(() => document.getElementById('pet-rename-input').focus().select(), 300);
}

function confirmRenamePet(petId) {
  const input = document.getElementById('pet-rename-input');
  const name = input.value.trim();
  if (!name) { showToast('请输入名字', 'warning'); return; }
  state.petNames[petId] = name;
  saveState();
  closeRenamePet();
  renderPetHome();
  showToast('宠物名字修改成功！', 'success');
}

function closeRenamePet() {
  document.getElementById('rename-modal-overlay').classList.remove('active');
}

function getPetDisplayName(petId) {
  return state.petNames[petId] || (PETS.find(p => p.id === petId)?.name || '未知');
}

// ==================== 日期与打卡 ====================
function updateDateDisplay() {
  const d = new Date();
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  document.getElementById('date-display').textContent =
    `${d.getMonth() + 1}月${d.getDate()}日 ${weekdays[d.getDay()]}`;
}

function checkDailyReset() {
  const today = todayStr();
  if (state.lastActiveDate !== today) {
    // 检查连续天数
    if (state.lastActiveDate) {
      const diff = getDaysBetween(state.lastActiveDate, today);
      if (diff === 1) {
        state.streak += 1;
      } else if (diff > 1) {
        state.streak = 1;
      }
    } else {
      state.streak = 1;
    }
    state.lastActiveDate = today;

    // 添加打卡日期
    if (!state.checkInDates.includes(today)) {
      state.checkInDates.push(today);
    }

    // 宠物属性衰减
    decayAllPets();

    // 每日重置学习进度（可重复赚金币）
    const todayLearn = Object.keys(state.learningProgress).filter(k => state.learningProgress[k]).length;
    state.totalLearnAllTime = (state.totalLearnAllTime || 0) + todayLearn;
    state.learningProgress = {};
    state.learnResetDate = today;

    saveState();
  } else if (state.learnResetDate !== today) {
    // 兜底：如果日期不一致但没触发上面的逻辑
    const todayLearn = Object.keys(state.learningProgress).filter(k => state.learningProgress[k]).length;
    state.totalLearnAllTime = (state.totalLearnAllTime || 0) + todayLearn;
    state.learningProgress = {};
    state.learnResetDate = today;
    saveState();
  }
}

// ==================== 宠物系统 ====================
function decayAllPets() {
  const now = Date.now();
  Object.keys(state.petStates).forEach(petId => {
    const ps = state.petStates[petId];
    if (!ps) return;
    const hoursPassed = (now - ps.lastUpdate) / (1000 * 60 * 60);
    ps.hunger = Math.max(0, ps.hunger - hoursPassed * 8);
    ps.happiness = Math.max(0, ps.happiness - hoursPassed * 5);
    ps.energy = Math.max(0, ps.energy - hoursPassed * 1);
    ps.lastUpdate = now;
  });
  saveState();
}

function initPetState(petId) {
  state.petStates[petId] = {
    hunger: 80,
    happiness: 80,
    energy: 80,
    lastUpdate: Date.now(),
    adoptedAt: Date.now(),
  };
}

// 获取宠物成长阶段
function getPetGrowthStage(petId) {
  const ps = state.petStates[petId];
  if (!ps || !ps.adoptedAt) return 'adult';
  const growth = PET_GROWTH[petId];
  if (!growth) return 'adult';
  const hoursOwned = (Date.now() - ps.adoptedAt) / (1000 * 60 * 60);
  if (hoursOwned < growth.babyHours) return 'baby';
  if (hoursOwned < growth.youngHours) return 'young';
  return 'adult';
}

// 获取宠物当前形态的emoji
function getPetGrowthEmoji(petId) {
  const growth = PET_GROWTH[petId];
  if (!growth) return PETS.find(p => p.id === petId)?.emoji || '🐾';
  const stage = getPetGrowthStage(petId);
  return growth[stage] || PETS.find(p => p.id === petId)?.emoji || '🐾';
}

// 获取宠物图片或emoji HTML（优先用image字段）
function getPetMediaHtml(petId, sizeClass) {
  const pet = PETS.find(p => p.id === petId);
  if (pet?.image) {
    const cls = sizeClass || 'pet-adult-img';
    return `<img src="${pet.image}" class="${cls}" alt="${pet.name}"
      onerror="this.style.display='none';this.nextElementSibling.style.display='';"
    /><span style="display:none">${pet.emoji}</span>`;
  }
  // 成长期有3D图的用3D图
  const growth = PET_GROWTH[petId];
  const stage = getPetGrowthStage(petId);
  if (growth && stage === 'adult' && growth.adultImage) {
    return `<img src="${growth.adultImage}" class="${sizeClass || 'pet-adult-img'}" alt="宠物形象"
      onerror="this.style.display='none';this.nextElementSibling.style.display='';"
    /><span style="display:none">${growth.adult}</span>`;
  }
  // 默认emoji
  const emoji = getPetGrowthEmoji(petId);
  return `<span>${emoji}</span>`;
}

// 获取宠物展示HTML（带wrapper）
function getPetDisplayHtml(petId) {
  const pet = PETS.find(p => p.id === petId);
  const rarity = pet?.rarity || '普通';
  return `<div class="pet-3d-wrapper" data-rarity="${rarity}">${getPetMediaHtml(petId)}</div>`;
}

// 获取成长阶段中文名
function getGrowthStageLabel(petId) {
  const stage = getPetGrowthStage(petId);
  const map = { baby: '🌱 幼崽期', young: '🌿 少年期', adult: '🌳 成年期' };
  return map[stage] || '🌳 成年期';
}

// 获取距离下一阶段的时间描述
function getGrowthProgress(petId) {
  const ps = state.petStates[petId];
  if (!ps || !ps.adoptedAt) return '';
  const growth = PET_GROWTH[petId];
  if (!growth) return '';
  const stage = getPetGrowthStage(petId);
  const hoursOwned = (Date.now() - ps.adoptedAt) / (1000 * 60 * 60);

  if (stage === 'baby') {
    const remaining = Math.max(0, growth.babyHours - hoursOwned);
    const pct = Math.min(100, (hoursOwned / growth.babyHours) * 100);
    const remainingStr = remaining < 1 ? `${Math.round(remaining * 60)}分钟` : `${Math.round(remaining)}小时`;
    return { label: `→ 少年期还需 ${remainingStr}`, pct: pct };
  }
  if (stage === 'young') {
    const remaining = Math.max(0, growth.youngHours - hoursOwned);
    const elapsed = hoursOwned - growth.babyHours;
    const span = growth.youngHours - growth.babyHours;
    const pct = Math.min(100, (elapsed / span) * 100);
    const remainingStr = remaining < 1 ? `${Math.round(remaining * 60)}分钟` : `${Math.round(remaining)}小时`;
    return { label: `→ 成年期还需 ${remainingStr}`, pct: pct };
  }
  return { label: '已成年 🎉', pct: 100 };
}

function getPetMood(petState) {
  if (!petState) return { emoji: '😴', text: '未知' };
  const avg = (petState.hunger + petState.happiness + petState.energy) / 3;
  if (avg >= 70) return { emoji: '😊', text: '开心' };
  if (avg >= 40) return { emoji: '😐', text: '一般' };
  if (petState.hunger < 30) return { emoji: '🥺', text: '好饿啊...' };
  if (petState.happiness < 30) return { emoji: '😢', text: '不开心...' };
  return { emoji: '😰', text: '需要照顾' };
}

// 检查宠物进化并通知
function checkPetEvolution() {
  if (!state.pets.length) return;
  if (!state.petEvoNotified) state.petEvoNotified = {};

  state.pets.forEach(pid => {
    const growth = PET_GROWTH[pid];
    if (!growth) return;
    const ps = state.petStates[pid];
    if (!ps || !ps.adoptedAt) return;

    const hoursOwned = (Date.now() - ps.adoptedAt) / (1000 * 60 * 60);

    // 检查是否刚进入少年期
    if (hoursOwned >= growth.babyHours && !state.petEvoNotified[pid + '_young']) {
      state.petEvoNotified[pid + '_young'] = true;
      const name = getPetDisplayName(pid);
      showToast(`🎉 ${name} 从幼崽成长为少年期了！`, 'success');
      launchConfetti();
    }
    // 检查是否刚进入成年期
    if (hoursOwned >= growth.youngHours && !state.petEvoNotified[pid + '_adult']) {
      state.petEvoNotified[pid + '_adult'] = true;
      const name = getPetDisplayName(pid);
      showToast(`🎊 ${name} 成年了！它变得更厉害了！`, 'success');
      launchConfetti();
    }
  });
  saveState();
}

function renderPetHome() {
  const container = document.getElementById('pet-home-content');

  if (state.pets.length === 0) {
    container.innerHTML = `
      <div class="pet-home-empty">
        <span class="empty-icon">🐾</span>
        <h3>还没有宠物哦~</h3>
        <p>去商店买一只可爱的宠物吧！</p>
        <button class="btn-primary" onclick="switchTab('shop')">🛒 去商店逛逛</button>
      </div>
    `;
    return;
  }

  // 确保有选中宠物
  if (!state.activePetId || !state.pets.includes(state.activePetId)) {
    state.activePetId = state.pets[0];
  }

  const pet = PETS.find(p => p.id === state.activePetId);
  const petState = state.petStates[state.activePetId] || initPetState(state.activePetId);
  const mood = getPetMood(petState);
  const rarityCfg = RARITY_CONFIG[pet.rarity] || RARITY_CONFIG['普通'];
  const growthEmoji = getPetGrowthEmoji(state.activePetId);
  const growthStage = getGrowthStageLabel(state.activePetId);
  const growthProgress = getGrowthProgress(state.activePetId);

  let petListHtml = state.pets.map(pid => {
    const p = PETS.find(x => x.id === pid);
    if (!p) return '';
    const ps = state.petStates[pid] || {};
    const m = getPetMood(ps);
    const stage = getGrowthStageLabel(pid);
    return `
      <div class="ph-card ${pid === state.activePetId ? 'active' : ''}" onclick="switchActivePet('${pid}')">
        <div class="ph-card-emoji" data-rarity="${p.rarity || '普通'}">${getPetMediaHtml(pid, 'ph-card-img')}</div>
        <div class="ph-card-name">${getPetDisplayName(pid)}</div>
        <div class="ph-card-foot">
          <span class="ph-card-stage">${stage}</span>
          <span class="ph-card-mood">${m.emoji}</span>
        </div>
      </div>`;
  }).join('');

  // 环形状态环（conic-gradient 进度）
  const ring = (val, color, track, icon) => `
    <div class="ph-ring" style="background: conic-gradient(${color} 0% ${val}%, ${track} ${val}% 100%);">
      <div class="ph-ring-inner">
        <span class="ph-ring-icon">${icon}</span>
        <span class="ph-ring-num">${Math.round(val)}</span>
      </div>
    </div>`;

  container.innerHTML = `
    <div class="pet-home-main">
      <div class="pet-display-area" id="pet-display-area">
        <div class="ph-mood">${mood.emoji} ${mood.text}</div>
        <div class="ph-rings">
          ${ring(petState.hunger, '#FF8E53', '#FFE3CC', '🍖')}
          ${ring(petState.happiness, '#8B5CF6', '#E6DEFF', '😊')}
          ${ring(petState.energy, '#2BB673', '#CDEEDD', '⚡')}
        </div>
        <div class="ph-stage-floor">
          ${getPetDisplayHtml(state.activePetId)}
          <div class="ph-mat"></div>
        </div>
        <div class="ph-name-row">
          <span class="ph-name-lg">${getPetDisplayName(pet.id)}</span>
          <button class="pet-rename-btn" onclick="event.stopPropagation();openRenamePet('${pet.id}')" title="改名字">✏️</button>
          <span class="pet-rarity-badge" style="background:${rarityCfg.color};color:white;">${pet.rarity}</span>
          <span class="pet-growth-badge">${growthStage}</span>
        </div>
        ${growthProgress ? `
        <div class="pet-growth-bar-wrap">
          <div class="pet-growth-bar"><div class="pet-growth-fill" style="width:${growthProgress.pct}%"></div></div>
          <span class="pet-growth-label">${growthProgress.label}</span>
        </div>
        ` : ''}
        <div class="pet-actions">
          <button class="pet-action-btn feed" onclick="openFeedModal('${pet.id}')">🍖 喂食</button>
          <button class="pet-action-btn play" onclick="playWithPet('${pet.id}')">🎾 玩耍</button>
          <button class="pet-action-btn recycle" onclick="confirmRecyclePet('${pet.id}')">♻️ 回收</button>
        </div>
      </div>
      <div class="pet-sidebar">
        <h3>🐾 我的宠物 (${state.pets.length})</h3>
        <div class="ph-card-grid">${petListHtml}</div>
      </div>
    </div>
  `;
}

function switchActivePet(petId) {
  state.activePetId = petId;
  saveState();
  renderPetHome();
}

// 宠物半价回收
function confirmRecyclePet(petId) {
  const pet = PETS.find(p => p.id === petId);
  if (!pet) return;
  // 至少要留一只？不限制，可以全回收
  const refund = Math.floor(pet.price / 2);
  const petName = getPetDisplayName(petId);

  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <div class="modal-header">
      <h2>♻️ 回收宠物</h2>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="text-align:center;padding:16px 0;">
      <span style="font-size:56px;display:block;margin-bottom:12px;">${getPetGrowthEmoji(petId)}</span>
      <p style="font-size:18px;margin-bottom:8px;">确定要回收 <b>${petName}</b> 吗？</p>
      <div style="background:var(--bg-card);border-radius:12px;padding:16px;margin:16px 0;">
        <div style="font-size:14px;color:var(--text-soft);margin-bottom:6px;">回收可返还</div>
        <div style="font-size:28px;font-weight:bold;color:var(--primary);">🪙 ${refund}</div>
        <div style="font-size:12px;color:var(--text-soft);margin-top:4px;">原价 ${pet.price}🪙，半价回收</div>
      </div>
      <p style="font-size:13px;color:var(--warning);margin-bottom:20px;">⚠️ 回收后宠物将离开你，此操作不可撤销</p>
      <div style="display:flex;gap:12px;justify-content:center;">
        <button class="btn-secondary" onclick="closeModal()">再想想</button>
        <button class="btn-danger" onclick="recyclePet('${petId}')">确认回收</button>
      </div>
    </div>
  `;
  overlay.classList.add('active');
}

function recyclePet(petId) {
  const pet = PETS.find(p => p.id === petId);
  if (!pet) return;
  const refund = Math.floor(pet.price / 2);
  const petName = getPetDisplayName(petId);

  // 返还金币
  state.coins += refund;
  // 移除宠物
  state.pets = state.pets.filter(id => id !== petId);
  delete state.petStates[petId];
  if (state.petNames) delete state.petNames[petId];
  // 切换激活宠物
  if (state.activePetId === petId) {
    state.activePetId = state.pets.length > 0 ? state.pets[0] : null;
  }

  saveState();
  updateCoinDisplay();
  closeModal();
  renderPetHome();
  renderShop();
  checkAchievements();
  showToast(`${petName} 回收成功，获得 ${refund}🪙`, 'success');
  launchConfetti();
}

function openFeedModal(petId) {
  const pet = PETS.find(p => p.id === petId);
  const overlay = document.getElementById('feed-modal-overlay');
  const content = document.getElementById('feed-modal-content');

  let foodHtml = PET_FOODS.map(food => {
    const owned = state.foodInventory[food.id] || 0;
    const canBuy = state.coins >= food.price;
    return `
      <div class="food-option ${canBuy ? '' : 'disabled'}" onclick="${canBuy ? `buyAndFeed('${petId}', '${food.id}')` : ''}">
        <span class="food-emoji">${food.emoji}</span>
        <span class="food-name">${food.name}</span>
        <span class="food-price">🪙 ${food.price}</span>
        <span class="food-effect">饱+${food.hunger} 乐+${food.happiness}${food.energy ? ' 体+'+food.energy : ''}</span>
      </div>
    `;
  }).join('');

  const gEmoji = getPetGrowthEmoji(petId);
  const rarity = pet?.rarity || '普通';
  content.innerHTML = `
    <div class="modal-header">
      <h2>🍖 给${getPetDisplayName(petId)}喂食</h2>
      <button class="modal-close" onclick="closeFeedModal()">✕</button>
    </div>
    <div class="feed-pet-info">
      <span class="feed-pet-emoji" data-rarity="${rarity}">${getPetMediaHtml(petId, 'feed-pet-img')}</span>
      <div class="feed-pet-name">${getPetDisplayName(petId)}</div>
    </div>
    <p style="text-align:center;color:var(--text-soft);font-size:13px;margin-bottom:16px;">
      选择食物给宠物吃，每样食物有不同的效果~<br>
      当前金币：🪙 ${state.coins}
    </p>
    <div class="food-options">${foodHtml}</div>
  `;

  overlay.classList.add('active');
}

function closeFeedModal() {
  document.getElementById('feed-modal-overlay').classList.remove('active');
}

function buyAndFeed(petId, foodId) {
  const food = PET_FOODS.find(f => f.id === foodId);
  if (!food) return;
  if (state.coins < food.price) {
    showToast('金币不够啦！去完成任务赚金币吧~', 'warning');
    return;
  }

  state.coins -= food.price;
  const ps = state.petStates[petId] || initPetState(petId);
  ps.hunger = Math.min(100, ps.hunger + food.hunger);
  ps.happiness = Math.min(100, ps.happiness + food.happiness);
  ps.energy = Math.min(100, ps.energy + (food.energy || 0));
  ps.lastUpdate = Date.now();
  state.petStates[petId] = ps;

  saveState();
  updateCoinDisplay();
  closeFeedModal();
  renderPetHome();
  showToast(`${getPetDisplayName(petId)} 吃了${food.name}，好开心！${food.emoji}`, 'success');

  // 喂食互动动画
  triggerFeedAnimation(petId, food);
}

// 喂食互动动画
function triggerFeedAnimation(petId, food) {
  const petArea = document.getElementById('pet-display-area');
  const petEl = document.getElementById('pet-main-emoji');
  if (!petArea || !petEl) return;

  // 1. 宠物跳动
  petArea.classList.add('animating');
  petEl.style.animation = 'none';
  petEl.offsetHeight;
  petEl.style.animation = 'feedBounce 0.6s ease';

  // 2. 飘出爱心
  spawnHearts(petArea);

  // 3. 飘出食物粒子
  spawnParticles(petArea, food.emoji);

  // 4. 说话气泡
  showPetBubble(petArea, getRandomFeedReaction());

  setTimeout(() => {
    petEl.style.animation = 'petBounce 2s ease-in-out infinite';
    petArea.classList.remove('animating');
  }, 700);
}

function spawnHearts(container) {
  const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '😍'];
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      heart.style.left = (30 + Math.random() * 40) + '%';
      heart.style.animationDuration = (1 + Math.random() * 1.5) + 's';
      heart.style.animationDelay = '0s';
      heart.style.fontSize = (16 + Math.random() * 20) + 'px';
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 2000);
    }, i * 80);
  }
}

function spawnParticles(container, foodEmoji) {
  const particles = ['✨', '💫', '⭐', foodEmoji, foodEmoji];
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const p = document.createElement('span');
      p.className = 'feed-particle';
      p.textContent = particles[i];
      p.style.left = (25 + Math.random() * 50) + '%';
      p.style.animationDuration = (0.8 + Math.random() * 0.8) + 's';
      container.appendChild(p);
      setTimeout(() => p.remove(), 1800);
    }, i * 60);
  }
}

function showPetBubble(container, text) {
  const bubble = document.createElement('div');
  bubble.className = 'pet-speech-bubble';
  bubble.textContent = text;

  // Position above the pet
  const existing = container.querySelector('.pet-speech-bubble');
  if (existing) existing.remove();

  container.appendChild(bubble);
  setTimeout(() => bubble.remove(), 2000);
}

function getRandomFeedReaction() {
  const reactions = [
    '好吃！😋', '太美味了！', '还要还要！', 'miamia~', '谢谢主人！❤️',
    '好满足~', '再来一口！', '真香！', '好吃到飞起！', '呜~好吃！',
  ];
  return reactions[Math.floor(Math.random() * reactions.length)];
}

function playWithPet(petId) {
  const ps = state.petStates[petId] || initPetState(petId);
  if (ps.energy < 15) {
    showToast('宠物太累了，先喂点东西吧~', 'warning');
    return;
  }
  ps.happiness = Math.min(100, ps.happiness + 20);
  ps.energy = Math.max(0, ps.energy - 15);
  ps.lastUpdate = Date.now();
  state.petStates[petId] = ps;
  saveState();
  renderPetHome();
  showToast(`和${getPetDisplayName(petId)}玩了一会儿，它好开心！🎾`, 'success');
  launchConfetti();

  // 玩耍动画
  setTimeout(() => {
    const petArea = document.getElementById('pet-display-area');
    const petEl = document.getElementById('pet-main-emoji');
    if (petArea && petEl) {
      petArea.classList.add('animating');
      petEl.style.animation = 'none';
      petEl.offsetHeight;
      petEl.style.animation = 'playSpin 0.8s ease';
      spawnHearts(petArea);
      showPetBubble(petArea, getRandomPlayReaction());
      setTimeout(() => {
        petEl.style.animation = 'petBounce 2s ease-in-out infinite';
        petArea.classList.remove('animating');
      }, 900);
    }
  }, 100);
}

function getRandomPlayReaction() {
  const reactions = [
    '好开心！😆', '再来一次！', '耶~🎉', '好好玩！', '嘻嘻！',
    '主人最好了！', '哈哈！', '蹦蹦跳！', '转圈圈~', '开心到飞起！',
  ];
  return reactions[Math.floor(Math.random() * reactions.length)];
}

// ==================== 宠物公司系统 ====================
function getAdultPetCount() {
  return state.pets.filter(pid => getPetGrowthStage(pid) === 'adult').length;
}

// 升级费用：指数增长 200 × 1.6^(等级-1)
function companyUpgradeCost() {
  return Math.floor(200 * Math.pow(1.6, state.company.level - 1));
}

// 单只宠物待领取工资（离线累计，封顶12小时）
function pendingEarnings(petId) {
  const comp = state.company;
  const emp = comp.employees[petId];
  if (!emp) return 0;
  const hours = Math.min(12, (Date.now() - emp.lastEarn) / 3600000);
  const job = COMPANY_JOBS.find(j => j.id === emp.job);
  const wage = (job ? job.baseWage : 1) * comp.level;
  return Math.floor(hours * wage);
}

function totalPending() {
  return Object.keys(state.company.employees).reduce((sum, id) => sum + pendingEarnings(id), 0);
}

function jobActionText(action) {
  const map = {
    singer: '🎤 拿话筒唱歌中…',
    chef: '🍳 颠勺炒菜中…',
    guard: '🛡️ 持盾巡逻中…',
    courier: '📦 扛包裹搬运中…',
    cleaner: '🧹 挥扫把清洁中…',
  };
  return map[action] || '工作中…';
}

// 渲染宠物公司标签页
function renderCompany() {
  const panel = document.getElementById('company-content');
  if (!panel) return;
  const comp = state.company;
  const employeeIds = Object.keys(comp.employees);
  const adultCount = getAdultPetCount();
  const cost = companyUpgradeCost();
  const canUpgrade = state.coins >= cost && adultCount >= 3;
  const pending = totalPending();

  if (state.pets.length === 0) {
    panel.innerHTML = `
      <div class="pet-home-empty">
        <span class="empty-icon">🏢</span>
        <h3>还没有宠物哦~</h3>
        <p>先去商店买一只宠物，让它们来公司上班吧！</p>
        <button class="btn-primary" onclick="switchTab('shop')">🛒 去商店逛逛</button>
      </div>`;
    return;
  }

  const employeeCards = employeeIds.length ? employeeIds.map(pid => {
    const p = PETS.find(x => x.id === pid);
    const emp = comp.employees[pid];
    const job = COMPANY_JOBS.find(j => j.id === emp.job);
    const stage = getGrowthStageLabel(pid);
    const wagePerHour = job.baseWage * comp.level;
    const rarityCls = p.rarity || '普通';
    return `
      <div class="employee-card rarity-${rarityCls}" data-empid="${pid}">
        <div class="employee-pet act-${job.action}" onclick="tapEmployee('${pid}')" title="点我看看它在干嘛~">
          <div class="pet-3d-wrapper" data-rarity="${rarityCls}">
            ${getPetMediaHtml(pid, 'employee-pet-img')}
          </div>
          <span class="job-prop act-${job.action}">${job.prop}</span>
        </div>
        <div class="employee-info">
          <div class="employee-name">${getPetDisplayName(pid)} <span class="employee-stage">${stage}</span></div>
          <div class="employee-job"><span class="job-badge act-${job.action}">${job.emoji} ${job.name}</span></div>
          <div class="employee-action-text">${jobActionText(job.action)}</div>
          <div class="employee-wage">时薪 <b>${wagePerHour}</b> · 累计 <b id="pending-${pid}">${pendingEarnings(pid)}</b></div>
        </div>
        <button class="employee-off-btn" onclick="offWorkPet('${pid}')">下班</button>
      </div>`;
  }).join('') : `<div class="company-no-employee">还没有宠物在上班 🐾<br>点击「派遣宠物上班」让员工开始赚钱吧！</div>`;

  panel.innerHTML = `
    <div class="panel-header company-header">
      <h2>🏢 宠物公司</h2>
      <button class="btn-primary dispatch-btn" onclick="openDispatchModal()">➕ 派遣宠物上班</button>
    </div>

    <div class="company-hq">
      <div class="company-logo">
        <svg viewBox="0 0 64 64" width="60" height="60" xmlns="http://www.w3.org/2000/svg" aria-label="宠物公司LOGO">
          <circle cx="32" cy="32" r="29" fill="none" stroke="#9A6B1E" stroke-width="2.4"/>
          <circle cx="32" cy="32" r="23" fill="none" stroke="#C8A24B" stroke-width="1.2" opacity="0.6"/>
          <path d="M32,36 C26,36 22,41 23,46 C24,50 28,51 32,51 C36,51 40,50 41,46 C42,41 38,36 32,36 Z" fill="#9A6B1E"/>
          <ellipse cx="20" cy="28" rx="4.2" ry="5.4" fill="#9A6B1E"/>
          <ellipse cx="29" cy="22" rx="4.2" ry="5.4" fill="#9A6B1E"/>
          <ellipse cx="43" cy="22" rx="4.2" ry="5.4" fill="#9A6B1E"/>
          <ellipse cx="44" cy="30" rx="4.2" ry="5.4" fill="#9A6B1E"/>
        </svg>
      </div>
      <div class="company-hq-info">
        <div class="company-hq-name">
          <span id="company-name-text">${comp.name}</span>
          <span class="company-en">MAOKIDS PET CO.</span>
          <span class="b-lv-badge">★ Lv.${comp.level}</span>
          <button class="company-rename-btn" onclick="openRenameCompanyModal()" title="给公司改名">✏️ 改名</button>
        </div>
        <div class="company-hq-level">工资倍率 ×${comp.level}</div>
      </div>
    </div>

    <!-- 方案B：成就环形统计 -->
    <div class="ringrow">
      <div class="ring"><b>${employeeIds.length}</b><span>在职</span></div>
      <div class="ring"><b>×${comp.level}</b><span>工资倍率</span></div>
      <div class="ring"><b>${comp.totalEarned || 0}</b><span>累计营收</span></div>
    </div>

    <div class="company-toolbar">
      <div class="company-pending">🪙 待领取工资：<b id="company-pending-total">${pending}</b></div>
      <button class="btn-primary collect-btn" onclick="collectSalary()">💰 一键领工资</button>
    </div>
    <div class="company-cap-note">📅 今日公司工资已领 <b id="company-daily-earned">${comp.dailyEarned || 0}</b> / ${COMPANY_DAILY_CAP} 金（每日封顶）</div>

    <div class="company-upgrade ${canUpgrade ? 'ready' : ''}">
      <div class="upgrade-info">
        <span class="upgrade-title">⬆️ 升级公司</span>
        <span class="upgrade-desc">提升工资倍率，需 ≥3 只成年宠物</span>
      </div>
      <button class="upgrade-btn" onclick="upgradeCompany()" ${canUpgrade ? '' : 'disabled'}>
        ${canUpgrade ? `升级 (${cost} 🪙)` : (adultCount < 3 ? `需 ${3 - adultCount} 只成年宠物` : `需 ${cost} 🪙`)}
      </button>
    </div>

    <h3 class="company-section-title">👷 在职员工 (${employeeIds.length})</h3>
    <div class="employee-grid">${employeeCards}</div>
  `;
}

// 打开派遣弹窗
let dispatchSelectedJob = null;
function openDispatchModal() {
  dispatchSelectedJob = null;
  renderDispatchModal();
  document.getElementById('dispatch-overlay').classList.add('active');
}
function closeDispatchModal() {
  document.getElementById('dispatch-overlay').classList.remove('active');
}
function renderDispatchModal() {
  const content = document.getElementById('dispatch-content');
  const workingIds = Object.keys(state.company.employees);
  const available = state.pets.filter(pid => !workingIds.includes(pid));
  const jobCards = COMPANY_JOBS.map(j => `
    <button class="dispatch-job ${dispatchSelectedJob === j.id ? 'selected' : ''}" onclick="dispatchSelectJob('${j.id}')">
      <span class="dispatch-job-emoji">${j.emoji}</span>
      <span class="dispatch-job-name">${j.name}</span>
      <span class="dispatch-job-wage">时薪 ${j.baseWage}×Lv</span>
      <span class="dispatch-job-desc">${j.desc}</span>
    </button>`).join('');
  const petCards = available.length ? available.map(pid => {
    const p = PETS.find(x => x.id === pid);
    const stage = getGrowthStageLabel(pid);
    const disabled = !dispatchSelectedJob;
    return `<button class="dispatch-pet ${disabled ? 'disabled' : ''}" onclick="dispatchAssign('${pid}')" ${disabled ? 'disabled' : ''}>
      <div class="pet-3d-wrapper" data-rarity="${p.rarity || '普通'}">${getPetMediaHtml(pid, 'dispatch-pet-img')}</div>
      <span class="dispatch-pet-name">${getPetDisplayName(pid)}</span>
      <span class="dispatch-pet-stage">${stage}</span>
    </button>`;
  }).join('') : `<p class="dispatch-empty">所有宠物都在上班啦！去把他们换下来吧~</p>`;

  content.innerHTML = `
    <div class="modal-header">
      <h2>🏢 派遣宠物上班</h2>
      <button class="modal-close" onclick="closeDispatchModal()">✕</button>
    </div>
    <p class="dispatch-tip">${dispatchSelectedJob ? '已选岗位，点击下方宠物即可上岗 👇' : '第一步：先选一个工作岗位 👇'}</p>
    <div class="dispatch-jobs">${jobCards}</div>
    <h3 class="dispatch-section-title">🐾 选择宠物</h3>
    <div class="dispatch-pets">${petCards}</div>
  `;
}
function dispatchSelectJob(jobId) {
  dispatchSelectedJob = jobId;
  renderDispatchModal();
}
function dispatchAssign(petId) {
  if (!dispatchSelectedJob) { showToast('请先选择一个岗位', 'warning'); return; }
  state.company.employees[petId] = { job: dispatchSelectedJob, lastEarn: Date.now() };
  saveState();
  closeDispatchModal();
  const job = COMPANY_JOBS.find(j => j.id === dispatchSelectedJob);
  showToast(`🎉 ${getPetDisplayName(petId)} 上岗当${job.name}啦！`, 'success');
  renderCompany();
}

// 公司每日工资封顶，防止金币通胀
const COMPANY_DAILY_CAP = 500;

// 一键领工资（离线累计，封顶12小时；上班消耗体力，体力耗尽自动下班）
function collectSalary() {
  const comp = state.company;
  const now = Date.now();
  // 每日封顶重置
  const todayKey = todayStr();
  if (comp.dailyKey !== todayKey) { comp.dailyKey = todayKey; comp.dailyEarned = 0; }

  let total = 0;
  const toRemove = [];
  Object.keys(comp.employees).forEach(petId => {
    const emp = comp.employees[petId];
    const hours = Math.min(12, (now - emp.lastEarn) / 3600000);
    const job = COMPANY_JOBS.find(j => j.id === emp.job);
    const wage = (job ? job.baseWage : 1) * comp.level;
    total += Math.floor(hours * wage);
    const ps = state.petStates[petId];
    if (ps) {
      ps.energy = Math.max(0, ps.energy - Math.min(ps.energy, hours * 2));
      ps.lastUpdate = now;
      if (ps.energy <= 0) toRemove.push(petId);
    }
    emp.lastEarn = now;
  });
  toRemove.forEach(id => delete comp.employees[id]);

  if (total <= 0) {
    showToast('暂时还没有可领取的工资哦~', 'info');
    renderCompany();
    return;
  }
  const remaining = COMPANY_DAILY_CAP - (comp.dailyEarned || 0);
  if (remaining <= 0) {
    showToast(`今日公司工资已封顶（${COMPANY_DAILY_CAP}金），多上的班算做贡献啦，明天再来领~`, 'info');
    renderCompany();
    return;
  }
  const give = Math.min(total, remaining);
  addCoins(give);
  comp.totalEarned = (comp.totalEarned || 0) + give;
  comp.dailyEarned = (comp.dailyEarned || 0) + give;
  saveState();
  if (give < total) {
    showToast(`💰 领取了 ${give} 金（今日封顶${COMPANY_DAILY_CAP}金，余下算加班贡献）`, 'success');
  } else {
    showToast(`💰 领取了 ${give} 金币工资！`, 'success');
  }
  launchConfetti();
  renderCompany();
}

// 升级公司（需金币 + ≥3 成年宠物）
function upgradeCompany() {
  const comp = state.company;
  const cost = companyUpgradeCost();
  const adultCount = getAdultPetCount();
  if (adultCount < 3) { showToast(`还需 ${3 - adultCount} 只成年宠物才能升级`, 'warning'); return; }
  if (state.coins < cost) { showToast('金币不够哦，先去赚一点~', 'error'); return; }
  spendCoins(cost);
  comp.level += 1;
  saveState();
  showToast(`🎉 宠物公司升级到 Lv.${comp.level}！工资 ×${comp.level}`, 'success');
  launchConfetti();
  renderCompany();
}

// 宠物下班
function offWorkPet(petId) {
  delete state.company.employees[petId];
  saveState();
  renderCompany();
  showToast(`${getPetDisplayName(petId)} 下班休息啦~`, 'info');
}

// 点击工作中的宠物：弹跳 + 气泡 + 闪光反馈
function tapEmployee(petId) {
  const card = document.querySelector(`[data-empid="${petId}"]`);
  const pet = card ? card.querySelector('.employee-pet') : null;
  if (!pet) return;
  // 弹跳
  pet.classList.remove('tap-pop');
  void pet.offsetWidth; // 触发重排以重启动画
  pet.classList.add('tap-pop');
  setTimeout(() => pet.classList.remove('tap-pop'), 480);

  const emp = state.company.employees[petId];
  if (!emp) return;
  const job = COMPANY_JOBS.find(j => j.id === emp.job);
  const rect = pet.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top;

  // 气泡：显示当前在做的动作
  const bubble = document.createElement('div');
  bubble.className = 'pet-feedback-bubble';
  bubble.textContent = jobActionText(job.action);
  bubble.style.left = cx + 'px';
  bubble.style.top = cy + 'px';
  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 1000);

  // 闪光粒子
  const icons = ['✨', '🪙', '⭐', '💫'];
  for (let i = 0; i < 4; i++) {
    const s = document.createElement('div');
    s.className = 'pet-feedback-spark';
    s.textContent = icons[i % icons.length];
    const dx = (i - 1.5) * 24;
    s.style.left = cx + dx + 'px';
    s.style.top = cy + 'px';
    s.style.setProperty('--dx', dx + 'px');
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 900);
  }
}

// 给宠物公司改名
function openRenameCompanyModal() {
  const overlay = document.getElementById('rename-company-overlay');
  const content = document.getElementById('rename-company-content');
  content.innerHTML = `
    <div class="rename-company-box">
      <h3>🏢 给公司起个名字</h3>
      <input type="text" id="company-name-input" class="rename-company-input"
             maxlength="12" placeholder="输入公司名字" value="${state.company.name}">
      <div class="rename-company-tip">最多 12 个字，给公司起个好听的名字吧！</div>
      <div class="rename-company-actions">
        <button class="btn-secondary" onclick="closeRenameCompanyModal()">取消</button>
        <button class="btn-primary" onclick="confirmRenameCompany()">确认命名</button>
      </div>
    </div>`;
  overlay.classList.add('active');
  const input = document.getElementById('company-name-input');
  input.focus();
  input.select();
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') confirmRenameCompany();
  });
}
function closeRenameCompanyModal() {
  document.getElementById('rename-company-overlay').classList.remove('active');
}
function confirmRenameCompany() {
  const input = document.getElementById('company-name-input');
  let name = (input.value || '').trim();
  if (!name) {
    showToast('公司名字不能为空哦~', 'warning');
    return;
  }
  if (name.length > 12) name = name.slice(0, 12);
  const old = state.company.name;
  state.company.name = name;
  saveState();
  closeRenameCompanyModal();
  renderCompany();
  if (old !== name) showToast(`🏢 公司改名为「${name}」`, 'success');
}

// ==================== 商店系统 ====================
function renderShop() {
  const container = document.getElementById('shop-content');

  if (currentShopTab === 'pets') {
    let html = '<div class="shop-grid">';
    // 置顶：粉色神龙（九天神兽）— 幸运扭蛋专属，无法购买
    const dragon = PETS.find(p => p.id === 'p63');
    if (dragon) {
      const rc = RARITY_CONFIG[dragon.rarity] || RARITY_CONFIG['普通'];
      const owned = state.pets.includes(dragon.id);
      const mediaHtml = dragon.image
        ? `<img class="pd-feature-img" src="${dragon.image}" alt="${dragon.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"/><span class="pd-feature-emoji" style="display:none">${dragon.emoji}</span>`
        : `<span class="pd-feature-emoji">${dragon.emoji}</span>`;
      html += `
        <div class="shop-item pink-dragon-feature">
          <div class="pd-feature-media">${mediaHtml}</div>
          <div class="shop-item-name">${dragon.name}</div>
          <div class="shop-item-rarity" style="background:${rc.color};color:#fff;">${dragon.rarity}</div>
          <div class="shop-item-desc">${dragon.desc}</div>
          <div class="pd-locked-badge ${owned ? 'owned' : ''}">${owned ? '✅ 已拥有' : '🔒 无法购买'}</div>
          <div class="pd-get-hint">${owned ? '🎉 你已通过「幸运扭蛋」集齐碎片召唤它！' : `🎰 在「幸运扭蛋」集齐 ${GACHA_SHARD_REDEEM} 枚神兽碎片召唤`}</div>
        </div>`;
    }
    PETS.forEach(pet => {
      if (pet.redeemOnly) return;
      const owned = state.pets.includes(pet.id);
      const canBuy = state.coins >= pet.price && !owned;
      const rarityCfg = RARITY_CONFIG[pet.rarity] || RARITY_CONFIG['普通'];

      html += `
        <div class="shop-item ${owned ? 'owned' : ''}">
          <span class="shop-item-emoji" data-rarity="${pet.rarity}">${pet.emoji}</span>
          <div class="shop-item-name">${pet.name}</div>
          <div class="shop-item-desc">${pet.desc}</div>
          ${PET_GROWTH[pet.id] ? '<div class="shop-growth-tag">🌱 可成长</div>' : ''}
          <div class="shop-item-rarity" style="background:${rarityCfg.color};color:white;">${pet.rarity}</div>
          <div class="shop-item-price">🪙 ${pet.price}</div>
          ${owned ? '' : `<button class="shop-buy-btn" ${canBuy ? '' : 'disabled'} onclick="buyPet('${pet.id}')">${canBuy ? '购买' : '金币不足'}</button>`}
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  } else {
    let html = '<div class="shop-grid">';
    PET_FOODS.forEach(food => {
      const owned = state.foodInventory[food.id] || 0;
      const canBuy = state.coins >= food.price;
      html += `
        <div class="shop-item food-item">
          <span class="shop-item-emoji">${food.emoji}</span>
          <div class="shop-item-name">${food.name}</div>
          <div class="shop-item-desc">${food.desc}</div>
          <div class="food-stats">
            <span class="food-stat hunger">饱+${food.hunger}</span>
            <span class="food-stat happiness">乐+${food.happiness}</span>
            ${food.energy ? `<span class="food-stat energy">体+${food.energy}</span>` : ''}
          </div>
          <div class="shop-item-price">🪙 ${food.price}</div>
          <div style="font-size:12px;color:var(--text-light);margin-bottom:8px;">已有 ${owned} 份</div>
          <button class="shop-buy-btn" ${canBuy ? '' : 'disabled'} onclick="buyFood('${food.id}')">${canBuy ? '购买' : '金币不足'}</button>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  }
}

function buyPet(petId) {
  const pet = PETS.find(p => p.id === petId);
  if (!pet) return;
  if (state.coins < pet.price) {
    showToast('金币不够啦！', 'warning');
    return;
  }
  if (state.pets.includes(petId)) {
    showToast('已经拥有这只宠物了~', 'info');
    return;
  }

  state.coins -= pet.price;
  state.pets.push(petId);
  initPetState(petId);
  if (!state.activePetId) state.activePetId = petId;

  saveState();
  updateCoinDisplay();
  renderShop();
  checkAchievements();
  showToast(`恭喜获得 ${pet.emoji} ${pet.name}！`, 'success');
  launchConfetti();
}

function buyFood(foodId) {
  const food = PET_FOODS.find(f => f.id === foodId);
  if (!food) return;
  if (state.coins < food.price) {
    showToast('金币不够啦！', 'warning');
    return;
  }
  state.coins -= food.price;
  state.foodInventory[foodId] = (state.foodInventory[foodId] || 0) + 1;
  saveState();
  updateCoinDisplay();
  renderShop();
  showToast(`购买了 ${food.emoji} ${food.name}！`, 'success');
}

// ==================== 扭蛋机 + 储蓄罐 ====================
function renderGacha() {
  const panel = document.getElementById('gacha-content');
  if (!panel) return;
  const todayKey = todayStr();
  if (state.gacha.dailyKey !== todayKey) { state.gacha.dailyKey = todayKey; state.gacha.todayDraws = 0; }
  const drawsLeft = Math.max(0, GACHA_DAILY_LIMIT - state.gacha.todayDraws);
  const shards = state.gacha.shards || 0;
  const canRedeem = shards >= GACHA_SHARD_REDEEM;
  const s = state.savings;
  const goal = s.goal || 0;
  const saved = s.saved || 0;
  const pct = goal > 0 ? Math.min(100, Math.round(saved / goal * 100)) : 0;
  const canRedeemSav = goal > 0 && saved >= goal;

  // 上次扭到的奖品（扭蛋后可见奖品与碎片）
  const lp = state.gacha.lastPrize;
  let lastPrizeHtml;
  if (!lp) {
    lastPrizeHtml = '<span class="glp-empty">还没有扭蛋记录，点「扭」试试手气~</span>';
  } else if (lp.type === 'shard') {
    lastPrizeHtml = '<span class="glp-item shard">🔷 <b>神兽碎片 +1</b></span>';
  } else {
    const f = PET_FOODS.find(x => x.id === lp.id);
    lastPrizeHtml = `<span class="glp-item">${f ? f.emoji : '🍖'} <b>${f ? f.name : '宠物粮'}</b></span>`;
  }

  // 随机生成舱内彩球颜色，制造满满的真实感
  const ballColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3', '#A8D8EA'];
  const ballsHtml = Array.from({ length: 28 }).map((_, i) => {
    const c = ballColors[i % ballColors.length];
    const r = 10 + Math.random() * 18;
    const x = 8 + Math.random() * 74;
    const y = 8 + Math.random() * 74;
    return `<span class="gacha-ball-mini" style="--gc:${c};--gr:${r}px;left:${x}%;top:${y}%;"></span>`;
  }).join('');

  panel.innerHTML = `
    <div class="panel-header">
      <h2>🎰 幸运扭蛋</h2>
      <p class="panel-subtitle">花金币抽惊喜，集碎片召唤传说神兽，存钱养好习惯！</p>
    </div>

    <div class="gacha-arena">
      <!-- 真实扭蛋机 -->
      <div class="gacha-machine-real">
        <div class="gacha-machine-sign"><span>🎰</span> 神兽扭蛋机</div>
        <div class="gacha-machine-body">
          <div class="gacha-led-ring" id="gacha-led-ring"></div>
          <div class="gacha-glass-dome">
            <div class="gacha-balls-layer" id="gacha-balls-layer">${ballsHtml}</div>
            <div class="gacha-dome-glare"></div>
          </div>
          <div class="gacha-machine-base">
            <div class="gacha-coin-slot">
              <div class="slot-hole"></div>
              <small>投币 ${GACHA_COST}🪙</small>
            </div>
            <button class="gacha-knob ${drawsLeft <= 0 ? 'disabled' : ''}" id="gacha-knob" onclick="drawCapsule()">
              <div class="knob-grip"></div>
              <span>扭</span>
            </button>
          </div>
          <div class="gacha-chute">
            <div class="gacha-chute-door" id="gacha-chute-door"></div>
            <div class="gacha-prize-tray" id="gacha-prize-tray"></div>
          </div>
        </div>
        <div class="gacha-machine-feet">
          <span></span><span></span>
        </div>
      </div>

      <!-- 状态条 -->
      <div class="gacha-status-bar">
        <div class="gacha-status-pill">
          <span>🎟️ 今日次数</span>
          <b>${drawsLeft} / ${GACHA_DAILY_LIMIT}</b>
        </div>
        <div class="gacha-status-pill shard">
          <span>🔷 神兽碎片</span>
          <b>${shards} / ${GACHA_SHARD_REDEEM}</b>
        </div>
      </div>

      <!-- 碎片进度 -->
      <div class="gacha-shard-track">
        <div class="gacha-shard-progress" style="width:${Math.min(100, shards / GACHA_SHARD_REDEEM * 100)}%"></div>
      </div>
      <button class="btn-secondary gacha-redeem-btn" onclick="redeemLegendary()" ${canRedeem ? '' : 'disabled'}>
        ${canRedeem ? '✨ 召唤传说神兽' : '集齐 10 枚碎片可召唤'}
      </button>
      <p class="gacha-tip">💡 扭蛋必中：宠物粮 或 神兽碎片（不会空手）</p>
    </div>

    <!-- 成长储蓄罐 -->
    <div class="savings-box-premium">
      <div class="savings-piggy">🐷</div>
      <div class="savings-info">
        <h3>成长储蓄罐</h3>
        <p>设定目标，把金币存起来，达成领取惊喜大礼包！</p>
      </div>
      <div class="savings-set">
        <span>目标</span>
        <input type="number" id="savings-goal-input" class="savings-input" value="${goal}" min="1" placeholder="如 300">
        <button class="btn-secondary" onclick="setSavingsGoal()">设定</button>
      </div>
      <div class="savings-progress-track">
        <div class="savings-progress-fill" style="width:${pct}%">
          <span class="savings-progress-bubble">${goal > 0 ? pct + '%' : '0%'}</span>
        </div>
      </div>
      <div class="savings-stats">
        <span>已存 <b>${saved}</b> 金</span>
        <span>${goal > 0 ? '目标 ' + goal + ' 金' : '未设目标'}</span>
      </div>
      <div class="savings-deposit">
        <input type="number" id="savings-deposit-input" class="savings-input" min="1" placeholder="存入金额">
        <button class="btn-primary" onclick="depositSavings()">存入</button>
      </div>
      <button class="btn-secondary savings-redeem" onclick="redeemSavings()" ${canRedeemSav ? '' : 'disabled'}>
        ${canRedeemSav ? '🎁 达成目标！领取奖励' : '存够目标可领取奖励'}
      </button>
    </div>

    <!-- 最近扭到：扭蛋后可见奖品与碎片 -->
    <div class="gacha-last-prize">
      <span class="glp-title">🎁 上次扭到</span>
      ${lastPrizeHtml}
      <span class="glp-shards">🔷 现有神兽碎片 <b>${shards}</b> / ${GACHA_SHARD_REDEEM}</span>
    </div>
  `;
}

function pickGachaLoot() {
  const total = GACHA_LOOT.reduce((sum, l) => sum + l.weight, 0);
  let r = Math.random() * total;
  for (const l of GACHA_LOOT) {
    if (r < l.weight) return l;
    r -= l.weight;
  }
  return GACHA_LOOT[0];
}

function drawCapsule() {
  if (window._gachaBusy) return;
  const todayKey = todayStr();
  if (state.gacha.dailyKey !== todayKey) { state.gacha.dailyKey = todayKey; state.gacha.todayDraws = 0; }
  if (state.gacha.todayDraws >= GACHA_DAILY_LIMIT) { showToast('今天扭蛋次数用完啦，明天再来~', 'info'); return; }
  if (state.coins < GACHA_COST) { showToast('金币不够啦，先去赚一点~', 'warning'); return; }

  window._gachaBusy = true;
  state.coins -= GACHA_COST;
  state.gacha.todayDraws += 1;
  updateCoinDisplay();
  saveState();

  const pick = pickGachaLoot();
  const food = pick.type === 'food' ? PET_FOODS.find(f => f.id === pick.id) : null;
  const isRare = pick.type === 'shard' || pick.id === 'f21';

  const knob = document.getElementById('gacha-knob');
  const ballsLayer = document.getElementById('gacha-balls-layer');
  const ledRing = document.getElementById('gacha-led-ring');
  const chuteDoor = document.getElementById('gacha-chute-door');
  const tray = document.getElementById('gacha-prize-tray');

  // 1. 旋钮旋转 + 灯光闪烁 + 球舱震动
  if (knob) knob.classList.add('spinning');
  if (ballsLayer) ballsLayer.classList.add('shaking');
  if (ledRing) ledRing.classList.add('flashing');

  setTimeout(() => {
    // 2. 一个球掉出来，沿滑道滚下
    const dropBall = document.createElement('div');
    dropBall.className = 'gacha-drop-ball' + (isRare ? ' rare' : '');
    dropBall.innerHTML = '<span></span>';
    if (tray) tray.appendChild(dropBall);

    // 舱门打开
    setTimeout(() => { if (chuteDoor) chuteDoor.classList.add('open'); }, 200);

    // 3. 球落到底部后炸开，展示奖品
    setTimeout(() => {
      dropBall.classList.add('pop');

      const reveal = document.createElement('div');
      reveal.className = 'gacha-reveal-premium' + (isRare ? ' rare' : '');
      reveal.innerHTML = pick.type === 'shard'
        ? `<span class="gacha-reveal-emoji">🔷</span><b>神兽碎片 +1</b>`
        : `<span class="gacha-reveal-emoji">${food.emoji}</span><b>${food.name}</b>`;
      if (tray) tray.appendChild(reveal);

      applyGachaReward(pick);
      state.gacha.lastPrize = pick.type === 'shard' ? { type: 'shard' } : { type: 'food', id: pick.id };
      saveState();
      if (isRare) launchConfetti();

      // 清理动画状态
      setTimeout(() => {
        if (knob) knob.classList.remove('spinning');
        if (ballsLayer) ballsLayer.classList.remove('shaking');
        if (ledRing) ledRing.classList.remove('flashing');
        if (chuteDoor) chuteDoor.classList.remove('open');
        if (dropBall) dropBall.remove();
        if (reveal) reveal.remove();
        window._gachaBusy = false;
        renderGacha();
      }, 1800);
    }, 900);
  }, 1100);
}

function applyGachaReward(pick) {
  if (pick.type === 'shard') {
    state.gacha.shards += 1;
    showToast(`🎉 获得神兽碎片！集齐 ${GACHA_SHARD_REDEEM} 枚召唤传说神兽`, 'success');
  } else {
    const food = PET_FOODS.find(f => f.id === pick.id);
    state.foodInventory[pick.id] = (state.foodInventory[pick.id] || 0) + 1;
    showToast(`获得 ${food.emoji} ${food.name}！`, 'success');
  }
  saveState();
}

function redeemLegendary() {
  if (state.gacha.shards < GACHA_SHARD_REDEEM) { showToast('碎片还不够哦~', 'warning'); return; }
  state.gacha.shards -= GACHA_SHARD_REDEEM;
  if (!state.pets.includes('p63')) {
    state.pets.push('p63');
    initPetState('p63');
    if (!state.activePetId) state.activePetId = 'p63';
  }
  if (!state.gacha.collection.includes('p63')) state.gacha.collection.push('p63');
  saveState();
  launchConfetti();
  showToast('🦖 召唤出传说神兽·九天神兽！', 'success');
  renderGacha();
}

function depositSavings() {
  const input = document.getElementById('savings-deposit-input');
  let amt = parseInt(input.value, 10);
  if (!amt || amt <= 0) { showToast('请输入要存入的金额', 'warning'); return; }
  amt = Math.min(amt, state.coins);
  if (amt <= 0) { showToast('金币不够存哦~', 'warning'); return; }
  state.coins -= amt;
  state.savings.saved += amt;
  saveState();
  updateCoinDisplay();
  showToast(`🐷 存入储蓄罐 ${amt} 金`, 'success');
  renderGacha();
}

function setSavingsGoal() {
  const input = document.getElementById('savings-goal-input');
  let g = parseInt(input.value, 10);
  if (!g || g <= 0) { showToast('请输入目标金额', 'warning'); return; }
  state.savings.goal = g;
  saveState();
  showToast(`目标设定为 ${g} 金`, 'success');
  renderGacha();
}

function redeemSavings() {
  const s = state.savings;
  if (!s.goal || s.saved < s.goal) { showToast('还没存够目标哦~', 'warning'); return; }
  s.saved = 0;
  // 储蓄达成只发宠物粮大礼包，限定神兽仍由「幸运扭蛋」专属产出
  ['f21', 'f8', 'f4', 'f10'].forEach(id => { state.foodInventory[id] = (state.foodInventory[id] || 0) + 2; });
  saveState();
  launchConfetti();
  showToast('🎉 储蓄达成！获得豪华宠物粮大礼包', 'success');
  renderGacha();
}

// ==================== 任务系统 ====================
function renderTasks() {
  const container = document.getElementById('task-groups');
  const today = todayStr();
  const todayTasks = state.tasks[today] || {};

  // 按分类分组
  const groups = {};
  getTasks().forEach(task => {
    if (!groups[task.category]) groups[task.category] = [];
    groups[task.category].push(task);
  });

  let html = '';
  Object.entries(groups).forEach(([catKey, tasks]) => {
    const cat = TASK_CATEGORIES[catKey];
    const doneCount = tasks.filter(t => todayTasks[t.id]).length;
    html += `
      <div class="task-group">
        <div class="task-group-header">
          <span class="group-icon">${cat.icon}</span>
          <span class="group-name">${cat.name}</span>
          <span class="group-count">${doneCount} / ${tasks.length}</span>
        </div>
        <div class="task-list">
          ${tasks.map(task => {
            const done = todayTasks[task.id];
            return `
              <div class="task-card ${done ? 'completed' : ''}" onclick="toggleTask('${task.id}', event)">
                <div class="task-checkbox">${done ? '✓' : ''}</div>
                <span class="task-icon">${task.icon}</span>
                <div class="task-info">
                  <div class="task-name">${task.name}</div>
                </div>
                <div class="task-reward">🪙 +${task.reward}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // 检查是否全部完成
  const allDone = getTasks().every(t => todayTasks[t.id]);
  if (allDone) {
    const banner = document.createElement('div');
    banner.className = 'all-done-banner';
    banner.innerHTML = `
      <span class="banner-icon">🎉</span>
      <h3>太棒了！今天的任务全部完成！</h3>
      <p>你真是个自律的好孩子！继续加油~</p>
    `;
    container.insertBefore(banner, container.firstChild);
    if (!state.allTasksInOneDay) {
      state.allTasksInOneDay = true;
      saveState();
      checkAchievements();
    }
  }

  updateDailySummary();
}

function toggleTask(taskId, event) {
  const today = todayStr();
  if (!state.tasks[today]) state.tasks[today] = {};
  const wasDone = state.tasks[today][taskId];

  if (wasDone) {
    // 取消完成（退回金币）
    state.tasks[today][taskId] = false;
    const task = getTasks().find(t => t.id === taskId);
    state.coins = Math.max(0, state.coins - task.reward);
    saveState();
    updateCoinDisplay();
  } else {
    // 完成任务
    state.tasks[today][taskId] = true;
    const task = getTasks().find(t => t.id === taskId);
    state.totalTasksDone += 1;

    // 获取点击位置
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    if (event && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top;
    }

    addCoins(task.reward, x, y);
    showToast(`${task.icon} ${task.name} 完成！+${task.reward}🪙`, 'success');
  }

  saveState();
  renderTasks();
  checkAchievements();
}

function updateDailySummary() {
  const today = todayStr();
  const todayTasks = state.tasks[today] || {};
  const doneCount = getTasks().filter(t => todayTasks[t.id]).length;
  const earned = getTasks().filter(t => todayTasks[t.id]).reduce((sum, t) => sum + t.reward, 0);
  const totalReward = getTasks().reduce((sum, t) => sum + t.reward, 0);
  const remaining = totalReward - earned;

  document.getElementById('daily-progress-text').textContent = `${doneCount} / ${getTasks().length}`;
  document.getElementById('daily-progress-fill').style.width = (doneCount / getTasks().length * 100) + '%';
  document.getElementById('today-earned').textContent = earned;
  document.getElementById('today-done').textContent = doneCount;
  document.getElementById('today-remaining').textContent = remaining;

  // 更新连续天数
  document.getElementById('streak-count').textContent = state.streak;
}

// ==================== 学习系统 ====================
function renderLearn() {
  const container = document.getElementById('learn-content');
  const subject = LEARNING_DATA[currentSubject];

  // 每日轮换：复习选2项，预习选2项（少于则全显示）
  const dailyReview = getDailyLearnItems(subject.review, 2);
  const dailyPreview = getDailyLearnItems(subject.preview, 2);
  const todayDone = Object.keys(state.learningProgress).filter(k => state.learningProgress[k]).length;
  const todayTotal = dailyReview.length + dailyPreview.length;

  // 记录今日轮换内容（供明日"昨日复习"使用）
  const todayKey = getTodayKey();
  if (!state.dailyLearnLog) state.dailyLearnLog = {};
  state.dailyLearnLog[todayKey] = { review: dailyReview.map(i => i.id), preview: dailyPreview.map(i => i.id) };
  saveState();

  // 获取昨日的学习内容
  const yesterdayKey = getYesterdayKey();
  const yesterdayItems = (state.dailyLearnLog && state.dailyLearnLog[yesterdayKey])
    ? state.dailyLearnLog[yesterdayKey]
    : null;

  // 固定口算练习（位置1：乘法口诀+表内除法，仅数学科目显示）
  const mathPracticeExtra = (currentSubject === 'math') ? [
    subject.review.find(i => i.id === 'm_r_14'),
    subject.review.find(i => i.id === 'm_r_15'),
  ].filter(Boolean) : [];

  let html = `
    <div class="learn-daily-banner">
      <span class="learn-daily-icon">📅</span>
      <span class="learn-daily-text">今日${subject.name}学习 · 每天${todayTotal}项新内容，完成可得 ${todayTotal * 5} 🪙</span>
      <span class="learn-daily-progress">${todayDone}/${todayTotal} 已完成</span>
    </div>
    <div class="learn-section">
      <div class="learn-section-title">
        ${subject.icon} ${subject.name} - 复习
        <span class="badge review">二年级</span>
      </div>
      <div class="learn-grid">
        ${dailyReview.map(item => renderLearnCard(item, 'review')).join('')}
        ${mathPracticeExtra.map(item => renderLearnCard(item, 'review')).join('')}
      </div>
    </div>
    <div class="learn-section">
      <div class="learn-section-title">
        ${subject.icon} ${subject.name} - 预习
        <span class="badge preview">三年级</span>
      </div>
      <div class="learn-grid">
        ${dailyPreview.map(item => renderLearnCard(item, 'preview')).join('')}
      </div>
    </div>
  `;

  // 位置2：昨日复习（仅当有昨日数据时显示）
  if (yesterdayItems && (yesterdayItems.review.length > 0 || yesterdayItems.preview.length > 0)) {
    const yesterdayReviewIds = new Set(yesterdayItems.review);
    const yesterdayPreviewIds = new Set(yesterdayItems.preview);
    const allYesterdayItems = [
      ...subject.review.filter(i => yesterdayReviewIds.has(i.id)),
      ...subject.preview.filter(i => yesterdayPreviewIds.has(i.id)),
    ];
    if (allYesterdayItems.length > 0) {
      html += `
        <div class="learn-section">
          <div class="learn-section-title">
            🔄 昨日复习
            <span class="badge yesterday">巩固记忆</span>
          </div>
          <div class="learn-grid">
            ${allYesterdayItems.map(item => renderLearnCard(item, 'yesterday')).join('')}
          </div>
        </div>
      `;
    }
  }

  container.innerHTML = html;
}

function renderLearnCard(item, type) {
  const done = state.learningProgress[item.id];
  const typeNames = { flashcard: '闪卡学习', quiz: '趣味测验', practice: '练习题', word_problem: '应用题', reading: '阅读' };
  const typeIcons = { flashcard: '🎴', quiz: '❓', practice: '✏️', word_problem: '📝', reading: '📖' };
  // 优先使用题目独立图标，无则按类型回退
  const cardIcon = item.icon || (typeIcons[item.type] || '📌');
  return `
    <div class="learn-card ${done ? 'completed' : ''}" onclick="openLearnActivity('${item.id}', '${item.type}', '${item.title}')">
      <div class="learn-card-header">
        <span class="learn-card-icon">${cardIcon}</span>
        <span class="learn-card-title">${item.title}</span>
      </div>
      <div class="learn-card-desc">${item.desc}</div>
      <span class="learn-card-type">${done ? '已完成 ✓' : typeNames[item.type]}</span>
      <div class="learn-card-reward">完成奖励：🪙 +5</div>
    </div>
  `;
}

function openLearnActivity(itemId, type, title) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  if (type === 'flashcard') {
    openFlashcard(itemId, title, overlay, content);
  } else if (type === 'quiz') {
    openQuiz(itemId, title, overlay, content);
  } else if (type === 'practice' || type === 'word_problem') {
    openPractice(itemId, title, overlay, content);
  } else if (type === 'reading') {
    openReading(itemId, title, overlay, content);
  }
}

// --- 闪卡 ---
function openFlashcard(itemId, title, overlay, content) {
  const cards = FLASHCARDS[itemId] || [];
  if (cards.length === 0) {
    showToast('暂无内容', 'warning');
    return;
  }

  let currentIdx = 0;
  let flipped = false;

  function renderCard() {
    const card = cards[currentIdx];
    content.innerHTML = `
      <div class="modal-header">
        <h2>🎴 ${title}</h2>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <div class="flashcard-container">
        <div class="flashcard ${flipped ? 'flipped' : ''}" onclick="flipCard()">
          <div class="flashcard-face flashcard-front">
            <div class="flashcard-text">${card.front}</div>
            <div class="flashcard-hint">👆 点击翻牌</div>
          </div>
          <div class="flashcard-face flashcard-back">
            <div class="flashcard-text">${card.back}</div>
            <div class="flashcard-hint">👆 点击翻回</div>
          </div>
        </div>
      </div>
      <div class="flashcard-nav">
        <button class="flashcard-nav-btn" onclick="prevCard()" ${currentIdx === 0 ? 'disabled' : ''}>⬅ 上一张</button>
        <span class="flashcard-counter">${currentIdx + 1} / ${cards.length}</span>
        <button class="flashcard-nav-btn" onclick="nextCard()" ${currentIdx === cards.length - 1 ? 'disabled' : ''}>下一张 ➡</button>
      </div>
      ${currentIdx === cards.length - 1 ? `
        <div style="text-align:center;margin-top:16px;">
          <button class="btn-primary" onclick="finishLearn('${itemId}')">完成学习 +5🪙</button>
        </div>
      ` : ''}
    `;
  }

  window.flipCard = () => { flipped = !flipped; renderCard(); };
  window.prevCard = () => { if (currentIdx > 0) { currentIdx--; flipped = false; renderCard(); } };
  window.nextCard = () => { if (currentIdx < cards.length - 1) { currentIdx++; flipped = false; renderCard(); } };

  renderCard();
  overlay.classList.add('active');
}

// --- 测验 ---
function openQuiz(itemId, title, overlay, content) {
  const questions = QUIZZES[itemId] || [];
  if (questions.length === 0) {
    showToast('暂无内容', 'warning');
    return;
  }

  let qIdx = 0;
  let correctCount = 0;
  let answered = false;

  function renderQuestion() {
    const q = questions[qIdx];
    answered = false;
    content.innerHTML = `
      <div class="modal-header">
        <h2>❓ ${title}</h2>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <div class="practice-progress">第 ${qIdx + 1} / ${questions.length} 题 | 已答对 ${correctCount} 题</div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" onclick="answerQuiz(${i})">${opt}</button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="quiz-feedback"></div>
      <button class="quiz-next-btn" id="quiz-next-btn" onclick="nextQuestion()">
        ${qIdx < questions.length - 1 ? '下一题 ➡' : '完成测验 🎉'}
      </button>
    `;
  }

  window.answerQuiz = (selected) => {
    if (answered) return;
    answered = true;
    const q = questions[qIdx];
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
      opt.disabled = true;
      if (i === q.answer) opt.classList.add('correct');
      if (i === selected && i !== q.answer) opt.classList.add('wrong');
    });

    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('quiz-next-btn');
    if (selected === q.answer) {
      correctCount++;
      feedback.className = 'quiz-feedback show correct';
      feedback.textContent = '✅ 答对了！真棒！';
    } else {
      feedback.className = 'quiz-feedback show wrong';
      feedback.textContent = `❌ 答错了，正确答案是：${q.options[q.answer]}`;
    }
    nextBtn.classList.add('show');
  };

  window.nextQuestion = () => {
    if (qIdx < questions.length - 1) {
      qIdx++;
      renderQuestion();
    } else {
      // 测验结束
      const isPerfect = correctCount === questions.length;
      if (isPerfect) {
        state.perfectQuizzes++;
      }
      const reward = isPerfect ? 8 : correctCount >= questions.length * 0.6 ? 5 : 2;
      if (!state.learningProgress[itemId]) {
        state.learningProgress[itemId] = true;
        state.learningCompleted++;
        addCoins(reward);
      }
      // 已完成的项目不再重复加钱
      saveState();
      checkAchievements();

      content.innerHTML = `
        <div class="modal-header">
          <h2>🎉 测验完成！</h2>
          <button class="modal-close" onclick="closeModal()">✕</button>
        </div>
        <div style="text-align:center;padding:20px 0;">
          <div style="font-size:60px;margin-bottom:16px;">${isPerfect ? '🏆' : '👏'}</div>
          <div style="font-size:28px;font-weight:bold;color:var(--primary);margin-bottom:8px;">
            答对 ${correctCount} / ${questions.length} 题
          </div>
          <div style="font-size:18px;color:var(--text-soft);margin-bottom:16px;">
            ${isPerfect ? '全对！太厉害了！' : correctCount >= questions.length * 0.6 ? '不错哦，继续加油！' : '没关系，多练习就会进步！'}
          </div>
          <div style="font-size:22px;font-weight:bold;color:#B8860B;margin-bottom:20px;">
            🪙 +${reward}
          </div>
          ${isPerfect ? '<div style="font-size:16px;color:var(--success);margin-bottom:20px;">⭐ 全对奖励翻倍！</div>' : ''}
          <button class="btn-primary" onclick="closeModal(); renderLearn();">完成</button>
        </div>
      `;
      if (isPerfect) launchConfetti();
    }
  };

  renderQuestion();
  overlay.classList.add('active');
}

// --- 练习（数学运算）---
function openPractice(itemId, title, overlay, content) {
  const problems = generateMathProblems(itemId);
  if (problems.length === 0) {
    // 非生成的题型用闪卡或测验
    showToast('该内容即将上线', 'info');
    return;
  }

  let pIdx = 0;
  let correctCount = 0;

  function renderProblem() {
    const p = problems[pIdx];
    const isTime = p.isTime;
    content.innerHTML = `
      <div class="modal-header">
        <h2>✏️ ${title}</h2>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <div class="practice-progress">第 ${pIdx + 1} / ${problems.length} 题 | 已答对 ${correctCount} 题</div>
      ${p.hint ? `<div class="practice-hint">💡 ${p.hint}</div>` : ''}
      <div class="practice-question">${p.q}</div>
      <div class="practice-input">
        <input type="text" inputmode="${isTime ? 'text' : 'decimal'}" id="practice-answer" 
          placeholder="${isTime ? '输入答案' : '?'}" 
          onkeydown="if(event.key==='Enter') submitPractice()" autocomplete="off">
        <button class="practice-submit" onclick="submitPractice()">提交</button>
      </div>
      <div class="quiz-feedback" id="practice-feedback"></div>
      <button class="quiz-next-btn" id="practice-next-btn" onclick="nextProblem()">
        ${pIdx < problems.length - 1 ? '下一题 ➡' : '完成练习 🎉'}
      </button>
    `;
    document.getElementById('practice-answer').focus();
  }

  window.submitPractice = () => {
    const input = document.getElementById('practice-answer');
    const feedback = document.getElementById('practice-feedback');
    const nextBtn = document.getElementById('practice-next-btn');
    const p = problems[pIdx];
    const rawVal = input.value.trim();

    if (!rawVal) {
      showToast('请输入答案', 'warning');
      return;
    }

    let isCorrect = false;
    if (p.isTime) {
      // 灵活匹配：时间题 "3点整" / "3点" / "3点0分" / "6点半" / "6点30分"
      // 以及有余数除法 "5...余2" / "5余2" / "5...2"
      const normalize = (s) => s.replace(/[点整时分余\.]/g, '').replace('半', '30').replace('…', '').trim();
      const userNorm = normalize(rawVal);
      const ansNorm = normalize(p.answer);
      isCorrect = userNorm === ansNorm || rawVal === p.answer;
    } else {
      const userAns = parseFloat(rawVal);
      if (isNaN(userAns)) {
        showToast('请输入数字答案', 'warning');
        return;
      }
      isCorrect = userAns === p.answer;
    }

    input.disabled = true;
    if (isCorrect) {
      input.classList.add('correct');
      correctCount++;
      feedback.className = 'quiz-feedback show correct';
      feedback.textContent = '✅ 答对了！真棒！';
    } else {
      input.classList.add('wrong');
      feedback.className = 'quiz-feedback show wrong';
      feedback.textContent = `❌ 答错了，正确答案是：${p.answer}`;
    }
    nextBtn.classList.add('show');
  };

  window.nextProblem = () => {
    if (pIdx < problems.length - 1) {
      pIdx++;
      renderProblem();
    } else {
      const isPerfect = correctCount === problems.length;
      const reward = isPerfect ? 8 : correctCount >= problems.length * 0.6 ? 5 : 2;
      if (!state.learningProgress[itemId]) {
        state.learningProgress[itemId] = true;
        state.learningCompleted++;
        addCoins(reward);
      }
      // 已完成的项目不再重复加钱
      saveState();
      checkAchievements();

      content.innerHTML = `
        <div class="modal-header">
          <h2>🎉 练习完成！</h2>
          <button class="modal-close" onclick="closeModal()">✕</button>
        </div>
        <div style="text-align:center;padding:20px 0;">
          <div style="font-size:60px;margin-bottom:16px;">${isPerfect ? '🏆' : '👏'}</div>
          <div style="font-size:28px;font-weight:bold;color:var(--primary);margin-bottom:8px;">
            答对 ${correctCount} / ${problems.length} 题
          </div>
          <div style="font-size:18px;color:var(--text-soft);margin-bottom:16px;">
            ${isPerfect ? '全对！数学小天才！' : correctCount >= problems.length * 0.6 ? '不错哦，继续加油！' : '多练习就会进步！'}
          </div>
          <div style="font-size:22px;font-weight:bold;color:#B8860B;margin-bottom:20px;">
            🪙 +${reward}
          </div>
          <button class="btn-primary" onclick="closeModal(); renderLearn();">完成</button>
        </div>
      `;
      if (isPerfect) launchConfetti();
    }
  };

  renderProblem();
  overlay.classList.add('active');
}

// --- 阅读理解 ---
function openReading(itemId, title, overlay, content) {
  const passage = READING_PASSAGES[itemId];
  if (!passage) { showToast('暂无内容', 'warning'); return; }

  let readingStep = 0; // 0: 短文, 1+: 题目
  let qIdx = 0;
  let correctCount = 0;
  let answered = false;

  function renderReading() {
    if (readingStep === 0) {
      // 显示短文
      content.innerHTML = `
        <div class="modal-header">
          <h2>📖 ${title}</h2>
          <button class="modal-close" onclick="closeModal()">✕</button>
        </div>
        <div class="reading-passage">
          <div class="reading-title">${passage.title}</div>
          <div class="reading-text">${passage.passage.split('\n').map(p => `<p>${p}</p>`).join('')}</div>
        </div>
        <div style="text-align:center;margin-top:16px;">
          <button class="btn-primary" onclick="startReadingQuestions()">开始答题 ➡</button>
        </div>
      `;
    } else {
      // 显示题目
      const q = passage.questions[qIdx];
      answered = false;
      content.innerHTML = `
        <div class="modal-header">
          <h2>📖 ${title} - 答题</h2>
          <button class="modal-close" onclick="closeModal()">✕</button>
        </div>
        <div class="practice-progress">第 ${qIdx + 1} / ${passage.questions.length} 题 | 已答对 ${correctCount} 题</div>
        <div class="reading-text-ref">📄 提示：${passage.title} (上面短文已读过)</div>
        <div class="quiz-question">${q.q}</div>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" onclick="answerReading(${i})">${opt}</button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="reading-feedback"></div>
        <button class="quiz-next-btn" id="reading-next-btn" onclick="nextReadingQuestion()">
          ${qIdx < passage.questions.length - 1 ? '下一题 ➡' : '完成阅读 🎉'}
        </button>
      `;
    }
  }

  window.startReadingQuestions = () => { readingStep = 1; qIdx = 0; correctCount = 0; renderReading(); };

  window.answerReading = (selected) => {
    if (answered) return;
    answered = true;
    const q = passage.questions[qIdx];
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
      opt.disabled = true;
      if (i === q.answer) opt.classList.add('correct');
      if (i === selected && i !== q.answer) opt.classList.add('wrong');
    });

    const feedback = document.getElementById('reading-feedback');
    const nextBtn = document.getElementById('reading-next-btn');
    if (selected === q.answer) {
      correctCount++;
      feedback.className = 'quiz-feedback show correct';
      feedback.textContent = '✅ 答对了！';
    } else {
      feedback.className = 'quiz-feedback show wrong';
      feedback.textContent = `❌ 答错了，正确答案是：${q.options[q.answer]}`;
    }
    nextBtn.classList.add('show');
  };

  window.nextReadingQuestion = () => {
    if (qIdx < passage.questions.length - 1) {
      qIdx++;
      renderReading();
    } else {
      const isPerfect = correctCount === passage.questions.length;
      const reward = isPerfect ? 8 : correctCount >= passage.questions.length * 0.6 ? 5 : 2;
      if (!state.learningProgress[itemId]) {
        state.learningProgress[itemId] = true;
        state.learningCompleted++;
        addCoins(reward);
      }
      // 已完成的项目不再重复加钱
      saveState();
      checkAchievements();

      content.innerHTML = `
        <div class="modal-header">
          <h2>🎉 阅读完成！</h2>
          <button class="modal-close" onclick="closeModal()">✕</button>
        </div>
        <div style="text-align:center;padding:20px 0;">
          <div style="font-size:60px;margin-bottom:16px;">${isPerfect ? '🏆' : '👏'}</div>
          <div style="font-size:28px;font-weight:bold;color:var(--primary);margin-bottom:8px;">
            ${passage.title}
          </div>
          <div style="font-size:20px;font-weight:bold;color:var(--text-soft);margin-bottom:8px;">
            答对 ${correctCount} / ${passage.questions.length} 题
          </div>
          <div style="font-size:16px;color:var(--text-soft);margin-bottom:16px;">
            ${isPerfect ? '全对！理解力满分！' : correctCount >= passage.questions.length * 0.6 ? '不错哦，理解得很好！' : '可以再读一遍短文试试~'}
          </div>
          <div style="font-size:22px;font-weight:bold;color:#B8860B;margin-bottom:20px;">
            🪙 +${reward}
          </div>
          <button class="btn-primary" onclick="closeModal(); renderLearn();">完成</button>
        </div>
      `;
      if (isPerfect) launchConfetti();
    }
  };

  renderReading();
  overlay.classList.add('active');
}

function finishLearn(itemId) {
  if (!state.learningProgress[itemId]) {
    state.learningProgress[itemId] = true;
    state.learningCompleted++;
    addCoins(5);
    saveState();
    checkAchievements();
    showToast('学习完成！+5🪙', 'success');
    launchConfetti();
  }
  closeModal();
  renderLearn();
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
}

// ==================== 成长记录 ====================
function renderProgress() {
  const container = document.getElementById('progress-overview');
  const today = todayStr();
  const todayTasks = state.tasks[today] || {};
  const todayDone = getTasks().filter(t => todayTasks[t.id]).length;
  const learnDone = Object.keys(state.learningProgress).filter(k => state.learningProgress[k]).length;
  const learnAllTime = (state.totalLearnAllTime || 0) + learnDone;

  container.innerHTML = `
    <div class="stat-card">
      <span class="stat-icon">🪙</span>
      <div class="stat-value">${state.totalEarned}</div>
      <div class="stat-label">累计金币</div>
    </div>
    <div class="stat-card">
      <span class="stat-icon">🔥</span>
      <div class="stat-value">${state.streak}</div>
      <div class="stat-label">连续天数</div>
    </div>
    <div class="stat-card">
      <span class="stat-icon">✅</span>
      <div class="stat-value">${state.totalTasksDone}</div>
      <div class="stat-label">完成任务</div>
    </div>
    <div class="stat-card">
      <span class="stat-icon">🐾</span>
      <div class="stat-value">${state.pets.length}</div>
      <div class="stat-label">拥有宠物</div>
    </div>
    <div class="stat-card">
      <span class="stat-icon">📚</span>
      <div class="stat-value">${learnDone} <span style="font-size:14px;color:var(--text-soft);">今日</span></div>
      <div class="stat-label">累计${learnAllTime}次</div>
    </div>
    <div class="stat-card">
      <span class="stat-icon">📅</span>
      <div class="stat-value">${state.checkInDates.length}</div>
      <div class="stat-label">打卡天数</div>
    </div>
  `;

  renderAchievements();
  renderCalendar();
}

function renderAchievements() {
  const container = document.getElementById('achievements-grid');
  const stats = {
    totalTasksDone: state.totalTasksDone,
    allTasksInOneDay: state.allTasksInOneDay,
    streak: state.streak,
    totalEarned: state.totalEarned,
    petsOwned: state.pets.length,
    learningCompleted: state.learningCompleted,
    perfectQuizzes: state.perfectQuizzes,
  };

  container.innerHTML = ACHIEVEMENTS.map(ach => {
    const unlocked = state.achievements.includes(ach.id) || ach.condition(stats);
    if (unlocked && !state.achievements.includes(ach.id)) {
      state.achievements.push(ach.id);
      saveState();
      showToast(`🏆 解锁成就：${ach.name}！`, 'success');
    }
    return `
      <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
        <span class="ach-icon">${ach.icon}</span>
        <div class="ach-name">${ach.name}</div>
        <div class="ach-desc">${ach.desc}</div>
      </div>
    `;
  }).join('');
}

function renderCalendar() {
  const container = document.getElementById('calendar-grid');
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  let html = weekdays.map(w => `<div class="calendar-weekday">${w}</div>`).join('');

  for (let i = 0; i < firstDay; i++) {
    html += '<div class="calendar-day empty"></div>';
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const checked = state.checkInDates.includes(dateStr);
    const isToday = d === today;
    html += `<div class="calendar-day ${checked ? 'checked' : ''} ${isToday ? 'today' : ''}">${d}</div>`;
  }

  container.innerHTML = html;
}

function checkAchievements() {
  const stats = {
    totalTasksDone: state.totalTasksDone,
    allTasksInOneDay: state.allTasksInOneDay,
    streak: state.streak,
    totalEarned: state.totalEarned,
    petsOwned: state.pets.length,
    learningCompleted: state.learningCompleted,
    perfectQuizzes: state.perfectQuizzes,
  };

  ACHIEVEMENTS.forEach(ach => {
    if (!state.achievements.includes(ach.id) && ach.condition(stats)) {
      state.achievements.push(ach.id);
      saveState();
      showToast(`🏆 解锁成就：${ach.name}！`, 'success');
    }
  });
}

// ==================== 标签导航 ====================
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `panel-${tab}`);
  });

  // 渲染对应内容
  switch (tab) {
    case 'tasks': renderTasks(); break;
    case 'pets': renderPetHome(); break;
    case 'shop': renderShop(); break;
    case 'learn': renderLearn(); break;
    case 'progress': renderProgress(); break;
    case 'company': renderCompany(); break;
    case 'gacha': renderGacha(); break;
  }
}

// ==================== 初始化 ====================
function init() {
  loadState();
  checkDailyReset();
  updateDateDisplay();
  updateCoinDisplay();
  updateChildNameDisplay();
  document.getElementById('streak-count').textContent = state.streak;

  // 检查宠物进化
  checkPetEvolution();

  // 标签点击
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // 商店子标签
  document.querySelectorAll('.shop-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentShopTab = btn.dataset.shopTab;
      document.querySelectorAll('.shop-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderShop();
    });
  });

  // 学科标签
  document.querySelectorAll('.subject-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentSubject = btn.dataset.subject;
      document.querySelectorAll('.subject-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderLearn();
    });
  });

  // 点击遮罩关闭弹窗
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') closeModal();
  });
  document.getElementById('feed-modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'feed-modal-overlay') closeFeedModal();
  });
  document.getElementById('settings-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'settings-overlay') closeSettings();
  });
  document.getElementById('rename-modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'rename-modal-overlay') closeRenamePet();
  });
  document.getElementById('dispatch-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'dispatch-overlay') closeDispatchModal();
  });

  // 初始渲染
  renderTasks();

  // 定时检查宠物状态衰减（每5分钟）
  setInterval(() => {
    decayAllPets();
    if (currentTab === 'pets') renderPetHome();
  }, 5 * 60 * 1000);

  // 每分钟检查日期变化
  setInterval(() => {
    checkDailyReset();
    updateDateDisplay();
    if (currentTab === 'tasks') renderTasks();
  }, 60 * 1000);

  // 宠物公司待领取工资实时刷新（每3秒）
  setInterval(() => {
    if (currentTab === 'company' && state.company) {
      Object.keys(state.company.employees).forEach(pid => {
        const el = document.getElementById('pending-' + pid);
        if (el) el.textContent = pendingEarnings(pid);
      });
      const totalEl = document.getElementById('company-pending-total');
      if (totalEl) totalEl.textContent = totalPending();
    }
  }, 3000);
}

// 启动
init();
