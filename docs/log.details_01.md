## 型定義を修正
* 複数のコンポーネントでProduct型と同値な型を定義していた
* Product型を再利用するように修正

## Invalid JSON
* HTMLデータがfetchされている。バリデーションに漏れがあるため、最優先に修正
* fetchが複数UIに散見され、共通コードも多いため切り出す
* 主にAdaptorを呼び出す非同期処理が多いため、UIとAdaptorの間にControllerを追加
* ControllerはFEデータとしてのバリデーションを行う。将来Providerで使用できることを最低限の課題とする。
  そのため、多少UI側に処理を残してLoaderの責務境界を明確にする