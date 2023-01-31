import { create } from "https://js.sabae.cc/stdcomp.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { html2image } from "https://taisukef.github.io/html2canvas/es/html2image.js";
import { Canvas } from "https://code4fukui.github.io/Canvas/Canvas.js";
import { Base64 } from "https://js.sabae.cc/Base64.js";

const w = 1;
const h = 533 / 800;

// https://code4fukui.github.io/scc_creators_opendata/
// 名前▲▼	名前よみ▲▼	年齢▲▼	出身地▲▼	企業名▲▼	企業住所▲▼	業種▲▼	部署▲▼	座右の銘▲▼	製造に携わっている商品▲▼	以前の職歴▲▼	仕事でのこだわり▲▼	つくるモノに込める想い▲▼	持続可能な未来に繋がると思う取り組み▲▼	未来の望む鯖江の姿▲▼	鯖江の（眼鏡又は繊維又は漆器）▲▼	おすすめの商品二つ▲▼	鯖江の（眼鏡又は繊維又は漆器） について一言で表現していただけますか？▲▼	メイン写真▲
const data0 = await CSV.fetchJSON("https://code4fukui.github.io/scc_creators_opendata/creators.csv");
const data = data0.filter(d => d.メイン写真);
console.log(data);

export const getCreatorLength = () => data.length;

export const getCreator = async (idx, x, y, z, rx, ry, rz, parent) => {
  const d = data[idx];
  const plane = create("a-plane", parent);
  plane.setAttribute("position", { x, y, z });
  plane.setAttribute("rotation", { x: rx, y: ry, z: rz });
  plane.setAttribute("width", w);
  plane.setAttribute("height", h);
  plane.setAttribute("src", d.メイン写真);
  plane.data = d;

  const scale = 0.8;
  plane.setAttribute("scale", { x: scale, y: scale, z: scale });

  const plane2 = create("a-plane", parent);
  plane2.setAttribute("position", { x, y, z });
  plane2.setAttribute("rotation", { x: rx, y: ry + 180 * 1, z: rz });
  plane2.setAttribute("width", w);
  plane2.setAttribute("height", h);
  plane2.setAttribute("scale", { x: scale, y: scale, z: scale });
  //plane2.setAttribute("src", d.メイン写真);


  const div = document.createElement("div");
  div.style.width = "800px";
  div.style.height = "533px";
  div.style.padding = "30px";
  div.innerHTML = `<div style="font-size: 200%;color:black;">${d.名前} / ${d.名前よみ} (${d.年齢})</div>
企業: ${d.企業名} - ${d.業種}<br>
出身: ${d.出身地}<br>`;
  const ss = [];
  const ignore = ["名前", "名前よみ", "年齢", "企業名", "業種"];
  for (const name in d) {
    if (ignore.indexOf(name) >= 0) {
      continue;
    }
    const v = d[name];
    ss.push(`${name}: ${v}<br>`)
  }
  //div.style.visibility = "hidden";
  div.innerHTML += ss.join("\n");
  document.body.appendChild(div);
  const img = await html2image(div);
  //console.log(img);
  const png = Canvas.encodePNG(img);
  const dimg = "data:image/png;base64," + Base64.encode(png);
  //console.log(dimg);
  plane2.setAttribute("src", dimg);
  
  return plane;
};
