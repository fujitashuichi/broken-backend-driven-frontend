# Broken Backend Driven Frontend
矛盾データや遅延などの問題を抱えたBEを作成し、これらをFEで安全に処理する練習です
設計しながらその設計での問題点を洗い出し、改修していきます

## 要件
* APIデータの扱いに専念するために、UIで表示や更新をする機能のみ実装します。
* 定期的に設計に制限をかけ、これを**設計の縛り**として扱います。（ログを参照）
* 訓練のために、敢えて欠陥のある設計を受け入れ、後から改修します。

## 開発ログ
### **設計の縛り**: UIやdtoの境界を明確にするために、Provider/Boundary/useSuccess を保留する
* 型定義の場所を決定
* **設計の縛り**に沿うために、Service層とUIを直接交信。まずは、バリデーションなしのdto垂れ流しにしてみる
* 今回はAPIが信用できないケースのため、Serviceをクラス化して、例外処理に重点を置く
* Serviceの実装が完了

### 現時点での問題点
* Service と UI の契約に落とし穴
* 問題点のまとめ → [problem.server_result_type.md]("./docs/problem.server_result_type.md")

### 改修案
* Serviceの下にUnionに整える層を追加する
* Unionに整えた後にProviderで配布し、Boundaryを設ける

### 設計の縛り
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

### 現時点での問題点
* APIが　ok&error や !ok&successData などを返す場合のバリデーションがされていないため、どこで処理するか決める必要がある

### 設計の縛り
* 以下の7項目を満たすコードをCodexに生成させ、その上で改修する
1. Loader / Adaptor は「直接使われている」
2. Loader / Adaptor の戻り値は既に UI に依存されている
3. UI 側に「一時しのぎコード」が存在する
4. 非同期の競合は考慮されていない
5. 型定義は分散して増殖している
6. エラーは握り潰されたり、そのまま投げられたりしている
7. 設計を知っている人がプロジェクトに一人しかいない

### 改修案
* 第一に動く状態に編集し、動作と意図を確認する

### 改修
* Service → Adaptor → Controller → UI の構造に暫定する
* [詳細ログ](./docs/log.details_01.md)
* 現時点でローディング状態は扱わないことに決定（データパイプにローディング状態は不要）
* ControllerではStatus不整合を弾き、Providerまでunknownデータを保持する
* いずれの層でも、エラーは次の層に流す

### 現在の問題点
* Controller層を通った後のバリデーションがまだ多い
* isProductバリデーションに挑戦したが、TSの構造的に限界を迎えZodの導入を決意
  [Zod導入前のコード](./docs/code.product_validator_old.md)
  [Zod導入後のコード](./docs/code.product_validator_new.md)