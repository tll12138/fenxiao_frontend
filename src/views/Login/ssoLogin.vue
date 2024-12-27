<template>
  <div class="background">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <div class="loading">登录中...</div>
  </div>

</template>

<script lang="ts" setup>
import * as authUtil from '@/utils/auth'
import { usePermissionStore } from '@/store/modules/permission'
import * as LoginApi from '@/api/login'
const route = useRoute() // 查询参数
const { currentRoute, push } = useRouter()

defineOptions({name: 'ssoLogin'})
const loading = ref(true)
const init = async () => {
  const data = route.query;
  const token = data.token as string;
  let redirect = data.redirect as string;
  console.log(redirect)
  try {
    if(token){
      const res = await LoginApi.ssoLogin(token);
      if (!res) {
        return
      }
      authUtil.setToken(res)
      if (!redirect) {
        redirect = '/'
      }
      push({ path: redirect})
    }
  }finally {
    loading.value = false
  }
}
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 65%;
  left: 47%;
}
body {
  margin: 0;
  overflow: hidden;
}

.background {
  width: 100vw;
  height: 100vh;
  background: white;
  --amount: 20;
}

$animationDuration: 3s;
$amount: 6;
$particleRadius: 4vmin;
.background span {
  width: $particleRadius * 2;
  height: $particleRadius * 2;
  border-radius: $particleRadius;
  backface-visibility: hidden;
  position: absolute;
  animation-name: move;
  animation-timing-function: cubic-bezier(0.4, 0, 1, 0.8);
  animation-iteration-count: infinite;
  animation-duration: $animationDuration;
  top: calc(50% - #{$particleRadius});
  left: 50%;
  transform-origin: ($particleRadius*-1) center;

  $colors: (
    #C5F0A4,
    #35B0AB,
    #226B80
  );

  @for $i from 1 through $amount {
    &:nth-child(#{$i}) {
      background: nth($colors, random(length($colors)));
      animation-delay: ($i / $amount) * $animationDuration * -1;
      opacity: 0;
    }
  }
}

@keyframes move {
  0% {
    transform: scale(1) rotate(0deg) translate3d(0, 0, 1px);
  }
  30% {
    opacity: 1;
  }
  100% {
    z-index: 10;
    transform: scale(0) rotate(360deg) translate3d(0, 0, 1px);
  }
}
</style>
