<template>
  <VueFinalModal
    class="row justify-content-center align-items-center"
    content-class="d-flex flex-column mx-3 p-3 bg-white border rounded-lg col-md-8 col-10"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <div class="d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <img v-if="logoImg" class="d-block" :src="logoImg" alt="logo" />
        <span v-if="logoImg">-</span>
        <h1 class="mb-0 fw-bold">報價單</h1>
      </div>
      <button
        class="btn btn-outline-danger border-danger rounded-lg"
        @click="emit('confirm')"
      >
        X
      </button>
    </div>
    <hr />
    <div class="d-flex">
      <div class="w-50" v-if="data.companyName">
        <h2 class="fw-bold">公司資訊</h2>
        <template v-for="(value, key) in CompanyText" :key="key">
          <div class="row" v-if="data[key]">
            <span class="fw-bold col-md-3 col-6">{{ value }} :</span>
            <span class="col-md-9 col-6" v-if="key !== 'quoteDate' && key !== 'validDate' ">{{ data[key] }}</span>
            <span class="col-md-9 col-6" v-if="key === 'quoteDate' || key === 'validDate'">{{ new Date(data[key]).toISOString().slice(0, 10) }}</span>
          </div>
        </template>
      </div>
      <div class="w-50">
        <h2 class="fw-bold" v-if="data.clientCompanyName">客戶資訊</h2>
        <template v-for="(value, key) in ClientText" :key="key">
          <div class="row" v-if="data[key]">
            <span class="fw-bold col-md-4 col-6">{{ value }} :</span>
            <span class="col-md-8 col-6">{{ data[key] }}</span>
          </div>
        </template>
      </div>
    </div>

    <el-table :data="productList" style="width: 100%">
      <el-table-column prop="name" label="品名" ></el-table-column>
      <el-table-column prop="price" label="單價"></el-table-column>
      <el-table-column prop="quantity" label="數量"></el-table-column>
      <el-table-column prop="unit" label="單位"></el-table-column>
      <el-table-column prop="subTotal" label="小計"></el-table-column>
  </el-table>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";

enum CompanyText {
  "companyName" = "公司名稱",
  "contactPerson" = "聯絡人",
  "companyTel" = "公司電話",
  "companyFax" = "公司傳真",
  "companyMail" = "公司信箱",
  "companyAddress" = "公司地址",
  "quoteDate" = "報價日期",
  "validDate" = "有效日期"
}
enum ClientText {
  "clientCompanyName" = "客戶名稱",
  "clientContactPerson" = "客戶聯絡人",
  "clientTel" = "客戶電話",
  "taxIDNumber" = "統一編號",
  "clientAddress" = "客戶地址",
}

enum TaxText {
  "subTotal" = "小計",
  "taxType" = "稅類",
  "taxRate" = "稅率",
  "taxTotal" = "稅金",
  "note" = "備註",
}

type Data = {
  companyName: string;
  contactPerson: string;
  companyTel: string;
  companyFax?: string;
  companyMail?: string;
  companyAddress: string;
  quoteDate: string | Date;
  validDate: string | Date;
  clientCompanyName: string;
  clientContactPerson: string;
  clientTel: string;
  taxIDNumber?: string;
  clientAddress: string;
  subTotal: number;
  taxType: string;
  taxRate: number;
  taxTotal: number;
  note?: string;
};
type ProductList = {
  name: string;
  price: string;
  quantity: string;
  unit: string;
  subTotal: string;
}
defineProps<{
  logoImg?: string;
  data: Data;
  productList: ProductList[];
}>();



const emit = defineEmits<{
  (e: "update:modelValue", modelValue: boolean): void;
  (e: "confirm"): void;
}>();
</script>
