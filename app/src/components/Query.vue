<template>
  <ApolloQuery
    :prefetch="variables"
    :query="query"
    :variables="variables"
    fetchPolicy="cache-first"
  >
    <template slot-scope="{ result: { data } }">
      <slot v-bind="data" />
    </template>
  </ApolloQuery>
</template>

<script lang="ts">
import * as vueApollo from "vue-apollo";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: { ApolloQuery: (vueApollo as any).ApolloQuery }
})
export default class extends Vue {
  @Prop(Object)
  private query;
  @Prop(Object)
  private variables;
}
</script>
