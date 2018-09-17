import { config } from "@vue/test-utils";
import fetch from "unfetch";

config.logModifiedComponents = false;
window.fetch = fetch;
