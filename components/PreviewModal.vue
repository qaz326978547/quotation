<template>
  <VueFinalModal
    class="row justify-content-center align-items-center"
    content-class="d-flex flex-column mx-3 p-3 bg-white border rounded-lg col-md-8 col-10"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <div id="elementId" class="p-3">
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
              <span
                class="col-md-9 col-6"
                v-if="key !== 'quoteDate' && key !== 'validDate'"
                >{{ data[key] }}</span
              >
              <span
                class="col-md-9 col-6"
                v-if="key === 'quoteDate' || key === 'validDate'"
                >{{ new Date(data[key]).toISOString().slice(0, 10) }}</span
              >
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
      <div class="my-4 border">
        <el-table border :data="productList" style="width: 100%">
          <el-table-column prop="name" label="品名"></el-table-column>
          <el-table-column prop="price" label="單價"></el-table-column>
          <el-table-column prop="quantity" label="數量"></el-table-column>
          <el-table-column prop="unit" label="單位"></el-table-column>
          <el-table-column prop="subTotal" label="小計"></el-table-column>
        </el-table>
        <div class="text-end m-3">
          <p class="mb-1">
            未稅:NT$
            <span class="text-danger fs-5">{{ taxData.unTaxTotal }}</span
            >元
          </p>
          <p class="mb-1" v-if="taxData.taxTotal">
            {{ taxData.taxType }}稅:{{ taxData.taxRate }}% : NT$
            <span class="text-danger fs-5">{{ taxData.taxTotal }} </span>元
          </p>
          <p class="mb-1">
            含稅:NT$<span class="text-danger fs-2">{{ taxData.total }}</span
            >元
          </p>
        </div>
        <div v-if="data.note">
          <p class="fw-bold border p-1">備註:</p>
          <p class="px-3">{{ data.note }}</p>
        </div>
      </div>

      <div class="border py-5 px-3">
        <p class="fw-bold mb-0">客戶簽章</p>
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <button class="btn btn-primary" @click="downloadPDF">下載PDF</button>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


enum CompanyText {
  "companyName" = "名稱",
  "contactPerson" = "聯絡人",
  "companyTel" = "聯絡電話",
  "companyFax" = "傳真",
  "companyMail" = "信箱",
  "companyAddress" = "地址",
  "quoteDate" = "報價日期",
  "validDate" = "有效日期",
}
enum ClientText {
  "clientCompanyName" = "名稱",
  "clientContactPerson" = "聯絡人",
  "clientTel" = "電話",
  "taxIDNumber" = "統一編號",
  "clientAddress" = "地址",
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
  note?: string;
};
type TaxData = {
  unTaxTotal: number;
  taxType: string;
  taxRate: number;
  taxTotal: number;
  total: number;
};
type ProductList = {
  name: string;
  price: string;
  quantity: string;
  unit: string;
  subTotal: string;
};


const props =  defineProps<{
  logoImg?: string;
  data: Data;
  productList: ProductList[];
  taxData: TaxData;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", modelValue: boolean): void;
  (e: "confirm"): void;
}>();


const downloadPDF = () => {
  const element = document.getElementById("elementId") as HTMLElement;
  const button = document.querySelector(".btn.btn-outline-danger.border-danger.rounded-lg") as HTMLElement;
  if (element && button) {
    button.style.display = 'none'; // 隱藏按鈕
    html2canvas(element, { scale: 2 }).then((canvas) => { // 提高 html2canvas 的解析度
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF('p', 'mm', 'a4'); // 使用 A4 紙張大小
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      
      pdf.save(`${props.data.quoteDate.toLocaleString()}.pdf`);
      button.style.display = 'block'; // 顯示按鈕
    });
  }
};
</script>
