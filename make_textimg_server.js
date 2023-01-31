import { serve, handleWeb, handleAPI, rescors } from "https://js.sabae.cc/wsutil.js";
import { Base64 } from "https://js.sabae.cc/Base64.js";

serve(async (req, path, conninfo) => {
  console.log(path);
  if (path.startsWith("/save/")) {
    return await handleAPI(async (param, req, path, conninfo) => {
      //console.log(path, param);
      const ss = path.split("/");
      const fn = ss[ss.length - 1];
      const bin = Base64.decode(param);
      await Deno.writeFile("data/" + fn, bin);
      return { response: "OK" }
    }, req, path, conninfo);
  }
  return await handleWeb(".", req, path, conninfo);
});
