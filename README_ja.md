# はじめに
 
GridDB 接続用Tableauプラグインにより、[Tableau](https://www.tableau.com/why-tableau/what-is-tableau) からGridDBのデータベースにアクセスが可能となります。

<br>
 
# 必要なソフト
 
- Tableau Desktop 2020.3 以降
- GridDB V4.3 以降  

<br>

# インストール手順

1. GridDB JDBCドライバのコピー

   GridDB JDBCドライバファイル(gridstore-jdbc-4.X.X.jar)を以下のディレクトリにコピーします。
   
       C:\Program Files\Tableau\Drivers\

2. GridDB プラグインファイルをコピー  

    griddb_jdbc.tacoを下記のディレクトリに配置してください。

       C:\Users\[Windows User]\Documents\My Tableau Repository\Connectors

    このディレクトリは日本語環境では以下となります。（注1）
    
       C:\Users\[Windows User]\Documents\マイ Tableau リポジトリ\コネクタ

3. 以下の引数を指定して、Tableau.exeを起動
   
     -DDisableVerifyConnectorPluginSignature=true

    
       "C:\Program Files\Tableau\Tableau 2020.3\bin\tableau.exe" -DDisableVerifyConnectorPluginSignature=true


<br>
 
# 利用方法
 
1. Tableau起動後、  [サーバへ] -> [その他] を選択
 
2. 「Toshiba による GridDB JDBC」を選択

3. 接続先のGridDBの情報を入力するダイアログが表示されますので、情報を入力

    Server: GridDBのクラスタを固定リスト方式で指定します  
    　（例1：192.168.10.10:20001）  
    　（例2：192.168.10.11:20001,192.168.10.12:20001,192.168.10.13:20001）  

    Username: GridDBのユーザ名を指定します  
    Password: GridDBのパスワードを指定します
    ClusterName: GridDBのクラスタ名を指定します  
    Database: GridDBのデータベース名を指定します  

4. 入力後、「Sign In」ボタンを押す  
<br>
     
# 注意事項
 
注1: Tableau Desktop 2020.3.1以前のバージョンの制限事項

 GridDB Tableauコネクタの配置場所のパスにマルチバイト文字が含まれているとTableauのコネクタの読み込み時にエラーとなり、Tableauの画面にコネクタが表示されない問題が発生します。  
 
この問題はTableau 2020.3.2にて修正される予定です。
  
そのため、2020.3.1以前のバージョンでは以下の対処を行ってください。
  1. griddb_jdbc.tacoの配置場所をパスにマルチバイト文字が含まれない場所に変更  
     （例：C:\tableau_taco）
     
  2. tableau.exeに以下の引数を追加指定して、Tableauを起動 
     -DConnectPluginsPath=[griddb_jdbc.tacoを配置したパス]  
     （例：-DConnectPluginsPath="C:\tableau_taco"）

```bash
"C:\Program Files\Tableau\Tableau 2020.3\bin\tableau.exe" -DDisableVerifyConnectorPluginSignature=true -DConnectPluginsPath="C:\tableau_plugin"
```
<br>

# 制限事項
 
- 結合条件

  右結合、完全結合は使用できません。

- フィルター

  フィルターで「条件」を選択した際に指定できる条件の種類のうち下記のものは使用できません。  
  「中央値」「百分位」「標準偏差」「標準偏差（母集団）」「分散」「分散（母集団）」
  
- TIMESTAMP型のカラム

  「列」や「行」にTIMESTAMP型のカラムを選択した後、
  「四半期  第2四半期」「月  5月」…となっている選択肢は使用可能ですが、
  「四半期  2015年第2四半期」「月  2015年5月」…となっている選択肢は使用できません。

<br>

# 構成ファイル
- 構成ファイルは以下です。
  - connectionBuilder.js   
     JDBC接続先URLを生成するスクリプトファイルです。
  - connection-fields.xml   
     接続ダイアログの内容を定義するファイルです。
  - connection-metadata.xml   
     接続後に開かれる、データベース、スキーマ、テーブル情報を入力する画面の設定を保存するファイルです。
  - connectionProperties.js   
     JDBC接続時に用いるファイルです。ユーザ名、パスワードの設定に使用しています。
  - connectionResolver.tdr   
     ベンダ固有のパラメータ使用時に設定が必要となるファイルです。
  - dialect.tdd   
     SQLの文法の違いを吸収するための設定ファイルです。
  - manifest.xml   
     コネクタ名を保存するファイルです。利用可能なコネクタ名リストを表示する際に使われます。

<br>
   

# 【参考】tacoファイル生成方法
- tacoファイルの作成に必要なソフトウェア
  - Python 3.7.3以上
  - Java JDK
  - git

- tacoファイル生成方法   
詳細は   
Package and Sign Your Connector for Distribution   
[https://tableau.github.io/connector-plugin-sdk/docs/package-sign](https://tableau.github.io/connector-plugin-sdk/docs/package-sign)   
を参照ください。   
Windows OSで、tacoファイルを生成する手順の概要を記述します。

1. Tableau Connector SDKのリポジトリをクローン   
    git にて、Tableau Connector SDKのリポジトリをクローンします。
    ```
    git clone https://github.com/tableau/connector-plugin-sdk.git
    ```

2.  venv で仮想環境を作成する   
    venvでtacoファイルを生成する作業を行う仮想環境を作成します。  
    まず、コマンドプロンプトにて、クローンしたconnector-packagerフォルダへ移動します。
    ```
    例）
    cd connector-plugin-sdk\connector-packager
    ```
    
    新しい環境を作成、アクティベート実施します。
    ```
    python -m venv .venv
    .\.venv\Scripts\activate 
    ```

3. 必要なモジュールをインストール
    tacoファイル生成に必要なモジュールをインストールします。
    ```
    python setup.py install
    ```

4. tacoファイル生成
    tacoファイルを生成します。
    ```
   python -m connector_packager.package [connection-fields.xml、connectionBuilder.jsなどのファイルを配置したパス] --dest [tacoファイル出力先のパス] -l [ログファイル出力先のパス]
    ```
    出力先のパスにtacoファイルと実行時のログが出力されます。


# コミュニティ
  * Issues  
    質問、不具合報告はissue機能をご利用ください。
  * PullRequest  
    GridDB Contributor License Agreement(CLA_rev1.1.pdf)に同意して頂く必要があります。
    PullRequest機能をご利用の場合はGridDB Contributor License Agreementに同意したものとみなします。

# ライセンス
  Copyright (c) 2020 Toshiba Digital Solutions Corporation.  
  GridDB 接続用TableauプラグインのライセンスはApache License, version 2.0です。  
