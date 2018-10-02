<template>
  <ApolloQuery
    :query="query"
    :variables="variables"
    fetchPolicy="cache-first"
  >
    <template slot-scope="{ result: { data } }">
      <template v-if="!data">
        <div class="loading-wrapper"><Loading /></div>
      </template>
      <template v-else>
        <slot v-bind="data" />
      </template>
    </template>
  </ApolloQuery>
</template>

<script lang="ts">
import * as vueApollo from "vue-apollo";
import { Component, Prop, Vue } from "vue-property-decorator";

import Loading from "./Loading.vue";

@Component({
  components: { ApolloQuery: (vueApollo as any).ApolloQuery, Loading }
})
export default class extends Vue {
  @Prop(Object)
  private query;
  @Prop(Object)
  private variables;
}
</script>

<style scoped lang="scss">
.loading-wrapper {
  display: flex;
  font-size: 2em;
  justify-content: center;
}
</style>
