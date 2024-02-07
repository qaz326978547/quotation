<template>

  <div class="container ">
    <h1 class="fw-bold mt-5">報價單產生器</h1>
    <form class="p-4 ">
      <h2>主要資料</h2>
      <div class="mb-3">
        <label for="companyName" class="form-label">公司名稱</label>
        <input type="text" class="form-control" id="companyName" placeholder="請輸入公司名稱">
      </div>
      <div class="row mb-30">
        <div class="mb-3 col">
        <label for="companyAddress" class="form-label">公司地址</label>
        <input type="text" class="form-control" id="companyAddress" placeholder="請輸入公司地址">
      </div>
      <div class="mb-3 col">
        <label for="companyTel" class="form-label">公司電話</label>
        <input type="text" class="form-control" id="companyTel" placeholder="請輸入公司電話">
      </div>
      </div>
     
   
    </form>
  </div>

</template>

<script setup lang="ts">

useSeoMeta({
  title: '報價單產生器', // 頁面標題
  ogTitle: '報價單產生器', // Open Graph 標題
  description: '這是一個報價單產生器網頁，你可以在這裡快速產生報價單', // 頁面描述
  ogDescription: '這是一個報價單產生器網頁，你可以在這裡快速產生報價單', // Open Graph 描述
  ogImage: '/og-image.jpg', // Open Graph 圖片
})
</script>

<style lang="scss">


</style>