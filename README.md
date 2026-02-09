# Broken Backend Driven Frontend
矛盾データや遅延などの問題を抱えたBEを作成し、これらをFEで安全に処理する練習です

---

## 要件
* APIデータの扱いに専念するために、UIで表示や更新をする機能のみ実装します。
* 定期的に設計に制限をかけ、これを**制限方針**として扱います。（ログを参照）
* 訓練のために、敢えて欠陥のある設計を受け入れ、後から改修します。

---

## 開発ログ
### **制限方針**: UIやdtoの境界を明確にするために、Provider/Boundary/useSuccess を保留する
* 型定義の場所を決定
* **制限方針**に沿うために、Service層とUIを直接交信。まずは、バリデーションなしのdto垂れ流しにしてみる
* 今回はAPIが信用できないケースのため、Serviceをクラス化して、例外処理に重点を置く
* Serviceの実装が完了

### 現時点での問題点
* Service と UI の契約に落とし穴
* 問題点のまとめ → [problem.server_result_type.md]("./docs/problem.server_result_type.md")

### 改修案
* Serviceの下にUnionに整える層を追加する
* Unionに整えた後にProviderで配布し、Boundaryを設ける

### 制限方針
* Service の直下に Union整形専用レイヤーを追加する
* Service の public API（戻り値・例外仕様）は 変更禁止
* UI コンポーネントは 一切修正しない
* Provider / Boundary / useSuccess は まだ導入しない
* Union は「成功・失敗・不明」を必ず区別できる形にするが、
* UI がそれを利用できなくても構わない

### 改修案
* Service直下にLoaderを追加し、**ApiUnion型**を返すように
* 後々、一定時間fetchを設けデータ整合性を取る余地を意識する
* Loader全体でステータスを共有して取りうる状態を少なくしたかったが、同時処理が制限されすぎてしまうため廃案
* ServiceでもUnionに変更する余地は残す

### LoaderからAdaptorへ
* 現在Loaderとしている関数群は状態まで持たせると重くなってしまうため、Adaptorと割り切って責務を抑えた
* AdaptorはServiceから渡った成功/失敗情報を意味のあるものに変換する
* この時点でstatus: "error" | "success" まで整理される