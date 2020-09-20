// import 文を使って sub.js ファイルを読み込む。
import { hello } from "./sub";
import "../css/style.scss";

const array = ['aaa', 'bbb', 'ccc'];
const newArray = [...array];

console.log(newArray);

// sub.jsに定義されたJavaScriptを実行する。
hello();