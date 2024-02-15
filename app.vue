<template>
  <div class="my-5">
    <div class="container-fluid">
      <h1 class="fw-bold my-5">報價單產生器</h1>
      <form class="p-4 bg-light">
        <h2 class="mb-4 text-secondary">公司資料</h2>
        <div class="mb-3">
          <label for="fileImg" class="form-label">公司LOGO</label>
          <input
            class="form-control"
            type="file"
            id="fileImg"
            @change="handleFileChange"
          />
        </div>
        <div class="row mb-3">
          <div class="mb-3 col">
            <label for="companyName" class="form-label">公司名稱</label>
            <input
              type="text"
              class="form-control"
              id="companyName"
              v-model="data.companyName"
              placeholder="請輸入公司名稱"
            />
          </div>
          <div class="mb-3 col">
            <label for="contactPerson" class="form-label">聯絡人</label>
            <input
              type="text"
              class="form-control"
              id="contactPerson"
              v-model="data.contactPerson"
              placeholder="請輸入公司聯絡人"
            />
          </div>
        </div>
        <div class="row mb-3">
          <div class="mb-3 col">
            <label for="companyTel" class="form-label">電話</label>
            <input
              type="text"
              class="form-control"
              id="companyTel"
              v-model="data.companyTel"
              placeholder="請輸入公司電話"
            />
          </div>
          <div class="mb-3 col">
            <label for="companyFax" class="form-label">傳真</label>
            <input
              type="text"
              class="form-control"
              id="companyFax"
              v-model="data.companyFax"
              placeholder="請輸入公司傳真"
            />
          </div>
        </div>
        <div class="mb-3 col">
          <label for="companyMail" class="form-label">E-Mail</label>
          <input
            type="text"
            class="form-control"
            id="companyMail"
            v-model="data.companyMail"
            placeholder="請輸入E-Mail"
          />
        </div>
        <div class="mb-3 col">
          <label for="companyAddress" class="form-label">地址</label>
          <input
            type="text"
            class="form-control"
            id="companyAddress"
            v-model="data.companyAddress"
            placeholder="請輸入公司地址"
          />
        </div>
        <div class="row">
          <div class="mb-3 col-6 ">
            <label for="quoteDate" class="form-label">報價日期</label>
            <div>
              <client-only>
              <el-date-picker
                v-model="data.quoteDate"
                type="date"
                id="quoteDate"
              />
            </client-only>
            </div>
          </div>
          <div class="mb-3 col-6">
            <label for="validDate" class="form-label">有效日期</label>
            <div>
              <client-only>
              <el-date-picker
                v-model="data.validDate"
                type="date"
                id="validDate"
              />
            </client-only>
            </div>
          </div>
        </div>

        <div class="border my-4"></div>

        <h2 class="mb-4 text-secondary">客戶資料</h2>
        <div class="row mb-3">
          <div class="mb-3 col">
            <label for="clientCompanyName" class="form-label">客戶名稱</label>
            <input
              type="text"
              class="form-control"
              id="clientCompanyName"
              v-model="data.clientCompanyName"
              placeholder="請輸入客戶名稱"
            />
          </div>
          <div class="mb-3 col">
            <label for="clientContactPerson" class="form-label">聯絡人</label>
            <input
              type="text"
              class="form-control"
              id="clientContactPerson"
              v-model="data.clientContactPerson"
              placeholder="請輸入客戶聯絡人"
            />
          </div>
        </div>
        <div class="row mb-3">
          <div class="mb-3 col">
            <label for="clientTel" class="form-label">電話</label>
            <input
              type="text"
              class="form-control"
              id="clientTel"
              v-model="data.clientTel"
              placeholder="請輸入客戶電話"
            />
          </div>
          <div class="mb-3 col">
            <label for="taxIDNumber" class="form-label">統一編號</label>
            <input
              type="text"
              class="form-control"
              id="taxIDNumber"
              v-model="data.taxIDNumber"
              placeholder="請輸入統一編號"
            />
          </div>
        </div>
        <div class="mb-3 col">
          <label for="clientAddress" class="form-lable mb-2">地址</label>
          <input
            type="text"
            class="form-control"
            id="clientAddress"
            v-model="data.clientAddress"
            placeholder="請輸入客戶地址"
          />
        </div>
        <div class="border my-4"></div>
        <div class="d-flex justify-content-between mb-4">
          <h2 class="text-secondary">產品資料</h2>
          <button type="button" class="btn btn-primary" @click="addProduct">
            新增項目
          </button>
        </div>
        <div
          class="d-flex align-items-center justify-content-center"
          v-for="(item, index) in productList"
          :key="index"
        >
          <div class="row">
            <div class="col-12 mb-3">
              <button
                type="button"
                class="btn btn-outline-danger d-md-none d-block"
                @click="removeProduct(index)"
              >
                X
              </button>
            </div>
            <div class="col-md-3 col-6 mb-3">
              <input
                type="text"
                class="form-control"
                id="productName"
                placeholder="品名"
                v-model="item.name"
              />
            </div>
            <div class="col-md-2 col-6 mb-3">
              <input
                type="text"
                class="form-control"
                id="productPrice"
                placeholder="單價"
                v-model="item.price"
              />
            </div>
            <div class="col-md-2 col-6 mb-3">
              <input
                type="number"
                class="form-control"
                id="productQuantity"
                placeholder="數量"
                v-model="item.quantity"
              />
            </div>
            <div class="col-md-2 col-6 mb-3">
              <input
                type="text"
                class="form-control"
                id="unit"
                placeholder="單位"
                v-model="item.unit"
              />
            </div>
            <div class="col-md-2">
              <input
                type="text"
                class="form-control bg-blue-light text-secondary"
                id="itemSubTotal"
                :value="itemSubTotal[index]"
                placeholder="小計"
                readonly
              />
            </div>
            <div class="col-1 ms-auto d-md-block d-none">
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="removeProduct(index)"
              >
                X
              </button>
            </div>
          </div>

          <hr />
        </div>
        <h3 class="text-end my-3">產品數量 : {{ itemSubTotal.length }}</h3>
        <h3 class="text-end text-danger my-3">未稅 合計:NT${{ subTotal }}元</h3>

        <div class="border my-4"></div>

        <h2 class="text-secondary mb-4">稅率</h2>
        <div class="row mb-3">
          <div class="mb-3 col-md-4 col-6">
            <input
              type="text"
              class="form-control"
              id="taxType"
              v-model="data.taxType"
              placeholder="請輸入稅別"
            />
          </div>
          <div
            class="mb-3 d-flex justify-content-between align-items-center col-md-4 col-6"
          >
            <input
              type="text"
              class="form-control"
              id="taxRate"
              v-model="taxRate"
              placeholder="請輸入稅率"
            />
            <span class="ps-3">%</span>
          </div>
          <div class="mb-3 col-md-4">
            <input
              type="text"
              class="form-control bg-blue-light text-secondary"
              id="taxTotal"
              placeholder="稅金"
              :value="taxTotal"
              readonly
            />
          </div>
        </div>
        <h3 class="text-end text-danger my-3">含稅 合計:NT${{ total }}元</h3>

        <div class="border my-4"></div>

        <h2 class="text-secondary mb-4">備註</h2>
        <client-only>
          <textarea
            cols="10"
            rows="3"
            class="form-control"
            v-model="data.note"
            style="resize: none"
          >
          </textarea>
        </client-only>
        <div class="border my-4"></div>

        <div class="d-flex justify-content-end">
          <button
            type="button"
            class="btn btn-secondary me-3"
            @click="show = true"
          >
            預覽
          </button>
          <button type="submit" class="btn btn-primary">產生報價單</button>
        </div>
      </form>
    </div>
  </div>

  <PreviewModal
    v-model="show"
    @confirm="() => confirm()"
    :data="data"
    :logoImg="fileImg"
    :productList="productList"
  />
</template>

<script setup lang="ts">
useSeoMeta({
  title: "報價單產生器", // 頁面標題
  ogTitle: "報價單產生器", // Open Graph 標題
  description: "這是一個報價單產生器網頁，你可以在這裡快速產生報價單", // 頁面描述
  ogDescription: "這是一個報價單產生器網頁，你可以在這裡快速產生報價單", // Open Graph 描述
  ogImage: "/og-image.jpg", // Open Graph 圖片
});

type Data = {
  companyName: string;
  contactPerson: string;
  companyTel: string;
  companyFax?: string;
  companyMail?: string;
  companyAddress: string;
  quoteDate: string | Date;
  validDate?: string | Date;
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

const fileImg = ref<null | string>(null);
const itemSubTotal = computed(() => {
  return productList.value.map((item) => {
    return Number(item.price) * Number(item.quantity);
  });
});

const total = computed(() => {
  return subTotal.value + taxTotal.value;
});
//稅率
const taxRate = ref<number>(0);
//稅金
const taxTotal = computed(() => {
  return subTotal.value * (Number(taxRate.value) / 100);
});

//未稅合計
const subTotal = computed(() => {
  return itemSubTotal.value.reduce((acc, cur) => {
    return acc + Number(cur);
  }, 0);
});
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    // 檢查檔案類型
    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      alert("請上傳 png 或 jpeg 格式的圖片");
      return;
    }

    // 讀取檔案
    const reader = new FileReader();
    reader.onload = (e) => {
      // e.target.result 包含了圖片的 data URL
      // 你可以將它存到變數中，或者直接使用
      fileImg.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};


type ProductList = {
  name: string;
  price: string;
  quantity: string;
  unit: string;
  subTotal: string;
}
const productList = ref<ProductList[]>([
  {
    name: "",
    price: "",
    quantity: "",
    unit: "",
    subTotal: "",
  },
]);

watchEffect(() => {
  productList.value.forEach((item, index) => {
    item.subTotal = itemSubTotal.value[index].toString();
  });
});

const addProduct = () => {
  productList.value.push({
    name: "",
    price: "",
    quantity: "",
    unit: "",
    subTotal: "",
  });
};

const removeProduct = (index: number) => {
  productList.value.splice(index, 1);
};

const data = ref<Data>({
  companyName: "",
  contactPerson: "",
  companyTel: "",
  companyFax: "",
  companyMail: "",
  companyAddress: "",
  quoteDate: "",
  validDate: "",
  clientCompanyName: "",
  clientContactPerson: "",
  clientTel: "",
  taxIDNumber: "",
  clientAddress: "",
  subTotal: subTotal.value,
  taxType: "",
  taxRate: taxRate.value,
  taxTotal: taxTotal.value,
  note: "",
});

const show = ref(false);

function confirm() {
  show.value = false;
}
</script>

<style lang="scss"></style>
