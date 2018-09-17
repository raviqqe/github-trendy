declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.json" {
  const obj: { [key: string]: any };
  export default obj;
}
