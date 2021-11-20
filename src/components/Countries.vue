<template>
  <div>
    <a-table :columns="columns" :data-source="countries" bordered>
        <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" style="padding: 20px">
          <a-input v-ant-ref="c => (searchInput = c)" :placeholder="`Search ${column.dataIndex}`" :value="selectedKeys[0]" style="width: 188px; margin-bottom: 8px; display: block;" @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])" @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"/>
          <a-button type="primary" icon="search" size="small" style="width: 90px; margin-right: 8px" @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)">
            Search
          </a-button>
          <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">Reset</a-button>
        </div>
        <a-icon slot="filterIcon" slot-scope="filtered" type="search" :style="{ color: filtered ? '#108ee9' : undefined }"/>
        <template slot="customRender" slot-scope="text, record, index, column">
          <span v-if="searchText && searchedColumn === column.dataIndex">
            <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
              <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{ fragment }}</mark>
              <template v-else>{{ fragment }}</template>
            </template>
          </span>
          <template v-else>
            {{ text }}
          </template>
        </template>
        <span slot="operation" slot-scope="text">
          <a-button @click="flagModal(text, 'image')" type="primary" size="small">Show flag</a-button>
          <a-button @click="flagModal(text, 'info')" type="primary" size="small">More info</a-button>
      </span>
    </a-table>
    <flag-modal :data="country" :type="type" :img="img" :visible="this.$store.getters.visible"></flag-modal>
  </div>
</template>

<script>
import flagModal from '@/components/flagModal.vue'
import axios from 'axios';
export default {
  components: {
    flagModal
  },
  name: 'Countries',
  props: {
  },
  data: function () {
    return {
      countries: null,
      searchText: '',
      searchInput: null,
      img: null,
      country: null,
      type: null,
      searchedColumn: '',
      columns: [
        {
          title: 'Name',
          name: 'name',
          dataIndex: 'name.common',
          key: 'name',
          width: 400,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.name.common
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: 'Region',
          name: 'region',
          dataIndex: 'region',
          key: 'region',
          width: 150,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.region
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          }
        },
        {
          title: 'Capital',
          name: 'capital',
          dataIndex: 'capital',
          key: 'capital',
          width: 250,
        },
        {
          title: 'Population',
          name: 'population',
          dataIndex: 'population',
          width: 150,
          sorter: (a, b) => a.population - b.population,
        },
        {
          title: 'Area',
          name: 'area',
          dataIndex: 'area',
          width: 150,
          sorter: (a, b) => a.area - b.area
        },
        {
          title: 'Actions',
          name: 'action',
          dataIndex: '',
          key: 'operation',
          width: 150,
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      axios.get('https://restcountries.com/v3.1/all').then((res) => {
        this.countries = res.data
      })
      .catch((error) => {
        console.error(error)
      })
    },
    handleSearch (selectedKeys, confirm, dataIndex) {
      confirm()
      this.searchText = selectedKeys[0]
      this.searchedColumn = dataIndex
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    flagModal (index, type) {
      this.type = type
      this.country = index
      this.img = index.flags.png
      this.$store.commit('showVis', true)
    },
  },
  computed: {

  }
}
</script>

<style>
</style>

