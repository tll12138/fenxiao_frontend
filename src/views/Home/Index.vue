<template>
  <div class="workplace-container">
    <!-- 顶部欢迎卡片 -->
    <el-card
      class="welcome-card"
      :shadow="cardShadow"
      hover
    >
      <el-skeleton :loading="loading" animated>
        <el-row :gutter="24" justify="space-between" align="middle">
          <!-- 左侧用户信息 -->
          <el-col :xl="10" :lg="12" :md="12" :sm="24" :xs="24" class="user-info-col">
            <div class="user-info-wrapper flex items-center">
              <el-avatar
                :src="avatar || defaultAvatar"
                size="80"
                class="user-avatar mr-24px"
                fit="cover"
              />
              <div class="user-text-content">
                <div class="welcome-text text-22px font-medium">
                  {{ t('workplace.welcome') }}
                  <span class="username text-primary">{{ username }}</span>，
                  {{ t('workplace.happyDay') }}
                </div>
                <div class="current-time text-14px text-gray-500 mt-8px">
                  {{ formatTime(new Date(), 'yyyy-MM-dd HH:mm:ss') }}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-skeleton>
    </el-card>

    <!-- 下方内容区：通知 + 快捷操作（关键优化：统一外层容器对齐） -->
    <el-row class="content-row mt-24px" :gutter="24" align="top">
      <!-- 通知公告卡片（统一内边距+内容区高度控制） -->
      <el-col :xl="16" :lg="16" :md="24" :sm="24" :xs="24">
        <el-card
          class="content-card notice-card"
          :shadow="cardShadow"
          hover
        >
          <template #header>
            <div class="card-header flex justify-between items-center">
              <span class="header-title text-16px font-medium">
                <i class="el-icon-bell text-primary mr-8px"></i>
                {{ t('workplace.notice') }}
              </span>
              <el-link
                type="primary"
                :underline="false"
                class="more-link hover:text-primary/80 transition-colors"
              >
                {{ t('action.more') }}
                <i class="el-icon-arrow-right text-12px ml-4px"></i>
              </el-link>
            </div>
          </template>

          <el-skeleton :loading="loading" animated>
            <!-- 通知内容区：固定最小高度，确保与快捷入口视觉对齐 -->
            <div class="card-content notice-list">
              <div v-if="notice.length === 0" class="empty-notice flex flex-col items-center justify-center py-32px h-full">
                <el-empty description="暂无最新通知" />
              </div>
              <div v-else class="notice-list__inner">
                <div
                  v-for="(item, index) in notice"
                  :key="`notice-${index}`"
                  class="notice-item flex items-center py-16px px-8px rounded-lg hover:bg-gray-50 transition-bg"
                >
                  <div class="notice-icon-wrapper w-40px h-40px rounded-full bg-primary/10 flex items-center justify-center mr-16px flex-shrink-0">
                    <i class="el-icon-bullhorn text-primary text-18px"></i>
                  </div>
                  <div class="notice-content flex-1">
                    <div class="notice-title text-14px font-normal">
                      <span class="notice-type text-primary">{{ item.type }}：</span>
                      {{ item.title }}
                      <span class="unread-dot ml-8px w-4px h-4px rounded-full bg-primary inline-block"></span>
                    </div>
                    <div class="notice-time text-12px text-gray-400 mt-8px">
                      {{ formatTime(item.date, 'yyyy-MM-dd HH:mm') }}
                    </div>
                  </div>
                </div>
                <!-- 空填充：当通知少于3条时，用空元素维持高度，确保与快捷入口对齐 -->
                <div
                  class="notice-item empty-filler py-16px px-8px"
                  v-for="i in Math.max(0, 3 - notice.length)"
                  :key="`filler-${i}`"
                ></div>
              </div>
            </div>
          </el-skeleton>
        </el-card>
      </el-col>

      <!-- 快捷操作卡片（统一内边距+网格基线对齐） -->
      <el-col :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
        <el-card
          class="content-card shortcut-card"
          :shadow="cardShadow"
          hover
        >
          <template #header>
            <div class="card-header flex justify-between items-center">
              <span class="header-title text-16px font-medium">
                <i class="el-icon-rocket text-primary mr-8px"></i>
                {{ t('workplace.shortcutOperation') }}
              </span>
            </div>
          </template>

          <el-skeleton :loading="loading" animated>
            <!-- 快捷内容区：与通知区统一内边距和最小高度 -->
            <div class="card-content shortcut-grid">
              <div
                v-for="(item, index) in shortcut"
                :key="`shortcut-${index}`"
                class="shortcut-item flex flex-col items-center justify-center p-16px rounded-lg hover:bg-primary/5 transition-all hover:scale-105 cursor-pointer"
                @click="setWatermark(item.name)"
              >
                <div class="shortcut-icon-wrapper w-56px h-56px rounded-full bg-primary/10 flex items-center justify-center mb-12px">
                  <img
                    :src="getShortcutIcon(item.icon)"
                    alt="shortcut-icon"
                    class="w-32px h-32px object-contain"
                    @error="handleImageError($event)"
                  />
                </div>
                <div class="shortcut-name text-14px">{{ item.name }}</div>
              </div>
              <!-- 空填充：当快捷入口少于4条时，用空元素维持高度 -->
              <div
                class="shortcut-item empty-filler p-16px"
                v-for="i in Math.max(0, 4 - shortcut.length)"
                :key="`filler-${i}`"
              ></div>
            </div>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { formatTime } from '@/utils'
import { useUserStore } from '@/store/modules/user'
import { useWatermark } from '@/hooks/web/useWatermark'
import { useI18n } from 'vue-i18n'
import { ElEmpty, ElAvatar, ElLink, ElCard, ElRow, ElCol, ElSkeleton } from 'element-plus'

// 导入图片资源（使用ES6模块语法）
import defaultAvatarImg from '@/assets/imgs/avatar.gif'

// 类型定义
type WorkplaceTotal = {
  project: number
  access: number
  todo: number
}
type Project = {
  name: string
  icon: string
  message: string
  personal: string
  time: Date
}
type Notice = {
  title: string
  type: string
  keys: string[]
  date: Date
}
type Shortcut = {
  name: string
  icon: string
  url: string
}

// 统计项通用组件（若后续恢复统计功能可保留，不影响当前对齐）
const StatItem = defineProps<{
  label: string
  value: number
  icon: string
  color: string
}>()
const StatItemComponent = {
  template: `
    <div class="stat-item flex flex-col items-center px-20px py-8px text-center">
      <div class="stat-icon text-24px mb-8px" :style="{ color }">
        <i :class="icon"></i>
      </div>
      <div class="stat-label text-14px text-gray-500 mb-4px">{{ t(label) }}</div>
      <div class="stat-value text-20px font-medium" :style="{ color }">
        {{ value }}
      </div>
    </div>
  `,
  props: StatItem,
  setup() {
    const { t } = useI18n()
    return { t }
  }
}

// 基础配置
defineOptions({ name: 'HomeWorkplace' })
const { t } = useI18n()
const userStore = useUserStore()
const { setWatermark } = useWatermark()
const loading = ref(true)
const cardShadow = computed(() => loading.value ? 'never' : 'hover')

// 静态资源默认值（补充defaultShortcutIcon定义，之前遗漏）
const defaultAvatar = ref(defaultAvatarImg)

// 用户信息
const avatar = ref(userStore.getUser.avatar || defaultAvatar.value)
const username = ref(userStore.getUser.nickname || t('common.guest'))

// 数据状态
const totalSate = reactive<WorkplaceTotal>({ project: 0, access: 0, todo: 0 })
const projects = reactive<Project[]>([])
const notice = reactive<Notice[]>([])
const shortcut = reactive<Shortcut[]>([])

// 处理快捷图标加载（补充返回默认图标逻辑，避免空值）
const getShortcutIcon = (iconName: string) => {
  try {
    return new URL(`../../assets/imgs/${iconName}.png`, import.meta.url).href
  } catch (error) {
    console.warn(`图标 ${iconName}.png 加载失败，使用默认图标`)
  }
}

// 图片加载失败处理
const handleImageError = (event: Event) => {
  const imgElement = event.target as HTMLImageElement
  imgElement.src = defaultShortcutIcon.value
}

// API 模拟
const getCount = async () => {
  const data = { project: 40, access: 2340, todo: 10 }
  Object.assign(totalSate, data)
}
const getProject = async () => {
  const data: Project[] = [
    { name: '扶摇榜', icon: 'fyb', message: 'https://fyb.puqiportal.com/index', personal: '达人管理，AI赋能，内容管理，自动化', time: new Date() },
    { name: '观海BI', icon: 'bi', message: 'https://bi.puqiportal.com/page/n1a062b94126541dcada3a48', personal: '数据可视化，数据分析平台', time: new Date() }
  ]
  Object.assign(projects, data)
}
const getNotice = async () => {
  const data: Notice[] = [
    { title: '蒲岐分销中心系统更新通知', type: '通知', keys: ['通知', '更新', '分销'], date: new Date(Date.now() - 3600 * 1000 * 2) },
    { title: '8月17日系统维护公告', type: '公告', keys: ['维护', '8月', '系统'], date: new Date(Date.now() - 3600 * 1000 * 24) }
  ]
  Object.assign(notice, data)
}
const getShortcut = async () => {
  const data = projects.map(item => ({
    name: item.name,
    icon: item.icon,
    url: item.message
  }))
  Object.assign(shortcut, data)
}

// 初始化加载
const getAllApi = async () => {
  await Promise.all([getCount(), getProject(), getNotice(), getShortcut()])
  setTimeout(() => loading.value = false, 300)
}
getAllApi()
</script>

<style scoped lang="scss">
.workplace-container {
  padding: 24px;
  background-color: #f5f7fa;
}

/* 欢迎卡片样式不变 */
.welcome-card {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.user-info-col {
  padding: 16px 0;
}

.user-info-wrapper {
  @media (max-width: 768px) {
    justify-content: center;
  }
}

.user-avatar {
  border: 4px solid #f0f5ff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.welcome-text {
  color: #303133;
}

.username {
  color: #409eff;
  margin: 0 4px;
}

.current-time {
  color: #909399;
}

/* 关键优化：内容区卡片统一样式（对齐核心） */
.content-row {
  width: 100%;
}

/* 统一通知/快捷卡片的外层样式 */
.content-card {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  height: 100%; /* 让卡片高度随父容器自适应，确保左右对齐 */
  /* 统一卡片内边距：消除左右卡片 padding 不一致导致的错位 */
  & >>> .el-card__body {
    padding: 24px !important; /* 覆盖Element默认padding，确保左右一致 */
    margin: 0 !important;
  }
}

/* 统一卡片头部样式 */
.card-header {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f2f5;
}

.header-title {
  color: #303133;
}

.more-link {
  color: #409eff;
}

/* 关键优化：统一内容区样式（高度+内边距） */
.card-content {
  width: 100%;
  min-height: 320px; /* 固定最小高度，确保左右卡片视觉等高 */
  display: flex;
  flex-direction: column;
}

/* 通知列表样式优化 */
.notice-list {
  &__inner {
    display: flex;
    flex-direction: column;
    gap: 8px; /* 通知项之间增加统一间距，视觉更整齐 */
  }
}

.notice-item {
  border-bottom: 1px solid #f0f2f5;
  &:last-child:not(.empty-filler) {
    border-bottom: none; /* 最后一个非空通知项取消下划线 */
  }
  &.empty-filler {
    height: 72px; /* 空填充高度与正常通知项一致 */
    visibility: hidden; /* 隐藏但保留占位 */
  }
}

.notice-icon-wrapper {
  flex-shrink: 0; /* 确保图标不被压缩，对齐基线 */
}

.notice-title {
  color: #303133;
  word-break: break-all; /* 长标题换行，避免溢出 */
}

.notice-type {
  color: #409eff;
}

.unread-dot {
  vertical-align: middle;
}

.notice-time {
  color: #909399;
}

.empty-notice {
  color: #909399;
  height: 100%; /* 空状态占满内容区高度，确保对齐 */
}

/* 快捷操作样式优化（网格基线对齐） */
.shortcut-grid {
  display: grid;
  /* 2列网格，列宽平均分配， gap 控制间距 */
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  align-items: start; /* 网格项顶部对齐，避免因内容高度不同导致错位 */
}

.shortcut-item {
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  &.empty-filler {
    height: 140px; /* 空填充高度与正常快捷项一致 */
    visibility: hidden;
  }
}

.shortcut-icon-wrapper {
  transition: all 0.2s ease;
  &:hover {
    background-color: #409eff;
  }
  border-radius: 8px;
}
</style>
