<template>
  <ApolloQuery
    :prefetch="variables"
    :query="query"
    :variables="variables"
    fetchPolicy="cache-first"
  >
    <template slot-scope="{ result: { data, loading } }">
      <template v-if="loading || !data">
        <VueLoading
          type="spin"
          color="darkgrey"
          :style="{ margin: windowSmall ? 0 : 'auto' }"
        />
      </template>
      <template v-else>
        <slot v-bind="data" />
      </template>
    </template>
  </ApolloQuery>
</template>

<script lang="ts">
import * as vueApollo from "vue-apollo";
import { VueLoading } from "vue-loading-template";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: { ApolloQuery: (vueApollo as any).ApolloQuery, VueLoading }
})
export default class extends Vue {
  @Prop(Object)
  private query;
  @Prop(Object)
  private variables;
}
</script>
