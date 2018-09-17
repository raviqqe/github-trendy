import { parse } from "url";

import configuration from "../configuration.json";

test("Check GraphQL endpoint URL", () => {
  const url = parse(configuration.graphQLEndpointURL);

  expect(url.protocol).toBe("https:");
});
