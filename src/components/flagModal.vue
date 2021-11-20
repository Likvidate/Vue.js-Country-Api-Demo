<template>
    <div>
        <a-modal v-if="type === 'image'" bodyStyle="background-color: lightgray" :afterClose="close" v-model="visible" :footer="false" closable centered>
            <img width="100%" :src="`${img}`">
        </a-modal>
        <a-modal :width="1000" v-if="type === 'info'" :afterClose="close" v-model="visible" :footer="false" closable centered>
            <template>
            <a-descriptions :title="data.name.common" bordered>
                <a-descriptions-item label="Official name">
                    {{data.name.official}}
                </a-descriptions-item>
                <a-descriptions-item label="Timezone">
                <template>
                    {{data.timezones[0]}}
                </template>
                </a-descriptions-item>
                <a-descriptions-item label="Start of the week">
                    {{data.startOfWeek}}
                </a-descriptions-item>
                <a-descriptions-item label="Currency">
                <li v-for="(currency, key) in data.currencies" v-bind:key="key">
                    {{currency.name}}
                </li>
                </a-descriptions-item>
                <a-descriptions-item label="Currency symbol">
                <li v-for="(currency, key) in data.currencies" v-bind:key="key">
                    {{currency.symbol}}
                </li>
                </a-descriptions-item>
                <a-descriptions-item label="Independent">
                    <template v-if="data.independent === true">
                        Yes
                    </template>
                    <template v-if="data.independent === false">
                        No
                    </template>
                </a-descriptions-item>
                <a-descriptions-item label="Languages">
                    <li v-for="(language, key) in data.languages" v-bind:key="key">
                            {{ language }}
                        </li>
                </a-descriptions-item>
            </a-descriptions>
            </template>
        </a-modal>
    </div>
</template>

<script>
export default {
  name: 'flagModal',
  props: {
      visible: Boolean,
      img: String,
      data: null,
      type: String
  },
  data: function () {
    return {
        currencies: this.data.currencies,
        columns: [
            {
                title: 'Languages',
                name: 'languages',
            }
        ]
    }
  },
  created () {

  },
  methods: {
      close () {
        this.$store.commit('showVis', false)
      }
  }
}
</script>

<style>
</style>
