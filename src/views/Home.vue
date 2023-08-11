<template>
  <div class="home container">
    <!---Header-->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>发票</h1>
        <span>共有 {{ invoiceData.length }} 个发票</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="flex filter">
          <span
            >过滤
            <span v-if="filteredInvoice">: {{ filteredInvoice }}</span></span
          >
          <img src="../assets/icon-arrow-down.svg" alt="" />
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filteredInvoices">草稿</li>
            <li @click="filteredInvoices">待办</li>
            <li @click="filteredInvoices">付清</li>
            <li @click="filteredInvoices">清除过滤</li>
          </ul>
        </div>
        <div @click="newInvoice" class="button flex">
          <div class="inner-button flex">
            <img src="../assets/icon-plus.svg" alt="" />
          </div>
          <span>创建发票</span>
        </div>
      </div>
    </div>
    <!-- Invoices -->
    <div v-if="invoiceData.length > 0">
      <Invoice
        v-for="(invoice, index) in filteredData"
        v-bind:invoice="invoice"
        :key="index"
      />
    </div>
    <div v-else class="empty flex flex-column">
      <img src="../assets/illustration-empty.svg" alt="" />
      <h3>这里还没有发票</h3>
      <p>
        点击“创建发票”创建一个吧！
      </p>
    </div>
  </div>
</template>

<script>
import Invoice from "../components/Invoice.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      filterMenu: null,
      filteredInvoice: null,
    };
  },
  components: {
    Invoice,
  },
  methods: {
    ...mapMutations(["TOGGLE_INVOICE"]),

    newInvoice() {
      this.TOGGLE_INVOICE();
    },

    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },
    filteredInvoices(event) {
      if (event.target.innerText === "清除过滤") {
        this.filteredInvoice = null;
        return;
      }

      this.filteredInvoice = event.target.innerText;
    },
  },
  computed: {
    ...mapState(["invoiceData"]),

    filteredData() {
      return this.invoiceData.filter((invoice) => {
        if (this.filteredInvoice === "草稿") {
          return invoice.invoiceDraft === true;
        }
        if (this.filteredInvoice === "待办") {
          return invoice.invoicePending === true;
        }
        if (this.filteredInvoice === "付清") {
          return invoice.invoicePaid === true;
        }
        return invoice;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;

  .header {
    margin-bottom: 65px;

    .left,
    .right {
      flex: 1;
    }

    .right {
      justify-content: flex-end;
      align-items: center;

      .button,
      .filter {
        align-items: center;

        span {
          font-size: 12px;
        }
      }

      .filter {
        position: relative;
        margin-right: 40px;
        cursor: pointer;

        img {
          margin-left: 12px;
          width: 9px;
          height: 5px;
        }

        .filter-menu {
          width: 120px;
          position: absolute;
          top: 25px;
          list-style: none;
          background-color: #1e2139;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          li {
            cursor: pointer;
            font-size: 12px;
            padding: 10px 20px;

            &:hover {
              color: #1e2139;
              background-color: #fff;
            }
          }
        }
      }
      .button {
        padding: 8px 10px;
        background-color: #7c5dfa;
        border-radius: 40px;

        // &:click {
        //   transform: translateX(700px);
        //   transition: 0.8 ease all;
        // }

        .inner-button {
          margin-right: 8px;
          border-radius: 50%;
          padding: 8px;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          img {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }
  .empty {
    margin-top: 160px;
    align-items: center;

    img {
      width: 214px;
      height: 200px;
    }

    h3 {
      font-size: 20px;
      margin-top: 40px;
    }

    p {
      text-align: center;
      max-width: 224px;
      font-size: 12px;
      font-weight: 300;
      margin-top: 16px;
    }
  }
}
</style>
