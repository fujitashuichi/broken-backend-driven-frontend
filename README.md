# Broken Backend Driven Frontend
矛盾データや遅延などの問題を抱えたBEを作成し、これらをFEで安全に処理する練習です

---

## 要件
* APIデータの扱いに専念するために、UIで表示や更新をする機能のみ実装します。
* 定期的に設計に制限をかけ、これを**方針**として扱います。（ログを参照）
* 訓練のために、敢えて欠陥のある設計を受け入れ、後から改修します。

---

## 開発ログ
### **方針**: UIやdtoの境界を明確にするために、Provider/Boundary/useSuccess を保留する
* 型定義の場所を決定
* **方針**に沿うために、Service層とUIを直接交信。まずは、バリデーションなしのdto垂れ流しにしてみる
* 今回はAPIが信用できないケースのため、Serviceをクラス化して、例外処理に重点を置く
* Serviceの実装が完了

### 現時点での問題点
* Service と UI の契約に落とし穴
* 問題点のまとめ → [problem.server_result_type.md]("./docs/problem.server_result_type.md")