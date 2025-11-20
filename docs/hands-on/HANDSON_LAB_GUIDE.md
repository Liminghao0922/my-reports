# Power BI Report Site - Hands-on Lab 完全ガイド

## 📚 概要

このドキュメントは、Power BI Report Site の Hands-on Lab 完全ガイドです。  
事前準備から当日の実習内容、各ステップの所要時間まで、全てをカバーしています。

**学習スタイル**: 完成済みテンプレートを活用（コーディング不要）  
**対象者**: 全レベル  
**所要時間**: 30分〜4時間（コースにより選択可能）  

---

## 🎯 ワークショップの特徴

```
✅ コーディング不要（設定とカスタマイズが中心）
✅ 短時間で確実に成果が出る
✅ 初心者でも参加可能
✅ 当日中にデモ可能な成果物を持ち帰れる
✅ すぐにPoC環境で使える
```

---

## 📅 タイムライン全体像

| フェーズ | 所要時間 | 内容 |
|---------|---------|------|
| **事前準備** | 1.5-2.5時間 | ソフトウェアインストール、アカウント準備、リポジトリクローン |
| **Hands-on 当日** | 1-1.5時間 | Azure AD 設定、認証理解、ローカル実行、Azure デプロイ、GitHub CI/CD |

---

# 📝 事前準備（Hands-on 開催前）

**⚠️ 重要: 以下の準備を Hands-on 当日までに必ず完了してください。**

## 1. ソフトウェアのインストール（所要時間: 30-60分）

### 1.1 ハードウェア要件確認（5分）

**必須:**
- [ ] **ノートパソコン**
  - OS: Windows 10/11、macOS 10.15+、または Linux
  - RAM: **最低 8GB**（推奨 16GB）
  - ストレージ空き容量: **5GB 以上**
  - **管理者権限あり**（重要！）
- [ ] **安定したインターネット接続**
  - Wi-Fi または有線 LAN
  - 企業ネットワークの場合、npm/GitHub/Azure へのアクセス可能か IT 部門に確認

**推奨:**
- [ ] マウス（作業効率向上）
- [ ] デュアルモニター（講師画面と作業画面を同時表示）

---

### 1.2 必須ソフトウェアのインストール（20-40分）

#### ① Node.js 18 以上のインストール（10-15分）

**インストール手順:**
1. https://nodejs.org/ にアクセス
2. **LTS（推奨版）** をダウンロード（v18.x 以上）
3. インストーラーを実行（デフォルト設定で OK）
4. インストール完了後、確認コマンドを実行

```powershell
# 確認コマンド
node --version   # v18.0.0 以上であること
npm --version    # v9.0.0 以上であること
```

**✅ 成功例:**
```
v22.21.0
10.9.4
```

**❌ エラーが出た場合:**
- PC を再起動して再度確認
- PATH 環境変数が設定されているか確認

---

#### ② Git のインストール（5-10分）

**Windows:**
1. https://git-scm.com/download/win にアクセス
2. インストーラーをダウンロード・実行
3. デフォルト設定で OK（全て "Next" でOK）

**macOS:**
```bash
# Homebrew を使う場合
brew install git

# または Xcode Command Line Tools
xcode-select --install
```

**確認コマンド:**
```powershell
git --version   # git version 2.30.0 以上
```

**初期設定（必須）:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

#### ③ Visual Studio Code のインストール（5-10分）

**インストール手順:**
1. https://code.visualstudio.com/ にアクセス
2. お使いの OS 用インストーラーをダウンロード
3. インストール実行

**推奨拡張機能のインストール:**

VS Code を起動 → 拡張機能アイコン（左サイドバー）→ 以下を検索してインストール:

- ✅ **ES7+ React/Redux/React-Native snippets**
- ✅ **Prettier - Code formatter**
- ✅ **ESLint**
- ✅ **Japanese Language Pack for VS Code**（日本語化）

---

#### ④ ブラウザの準備（5分）

- [ ] **Google Chrome** または **Microsoft Edge**（最新版）
- [ ] 開発者ツールの基本操作を確認（F12 キーで開く）

---

## 2. アカウント・ライセンスの準備（所要時間: 30-45分）

### 2.1 Azure Subscription の準備（5-10分）

**Azure サブスクリプションの取得:**

- [ ] **Azure 無料アカウント**を作成（まだお持ちでない場合）
  - https://azure.microsoft.com/free/ にアクセス
  - Microsoft アカウントでサインアップ
  - クレジットカード登録が必要（本人確認のため、12ヶ月間は無料）
  - 200 USD 分の無料クレジット付与（30日間有効）

- [ ] **既存のサブスクリプション**がある場合
  - 企業アカウント: IT 部門に使用可能なサブスクリプションを確認
  - 個人アカウント: Pay-As-You-Go または無料試用版

**確認手順:**
1. https://portal.azure.com にサインイン
2. 検索バーで「サブスクリプション」を検索
3. 利用可能なサブスクリプションが表示されることを確認
4. サブスクリプション ID をメモ（後で使用）

**⚠️ 重要:**
- Azure Static Web Apps のデプロイには Azure サブスクリプションが必須

---

### 2.2 Azure AD アカウントの準備（10-15分）

#### 個人アカウント（推奨）

- [ ] **Microsoft アカウント**を作成（outlook.com、hotmail.com など）
  - 既にお持ちの場合はそのまま使用 OK
  - 新規作成: https://signup.live.com/

- [ ] **Azure Portal** にアクセスできることを確認
  - https://portal.azure.com にサインイン
  - 初回ログイン時に Azure AD テナントが自動作成される

**確認手順:**
1. Azure Portal にログイン
2. 検索バーで「Azure Active Directory」を検索
3. 左メニューから「アプリの登録」をクリック
4. **「+ 新規登録」ボタン**が表示されれば ✅ OK

---

#### 企業アカウントの場合（要確認）

⚠️ **IT 部門に以下を確認してください:**

- [ ] Azure AD アプリ登録の作成権限があるか
- [ ] API アクセス許可の付与権限があるか
- [ ] 外部サービス（Power BI、GitHub、Azure）へのアクセスが許可されているか

**❌ 権限がない場合:**
- 講師が用意したサンプルアカウントを使用
- または IT 部門に一時的な権限付与を依頼

---

### 2.3 Power BI アカウント・ライセンスの準備（15-20分）

#### ① Power BI アカウント作成（5分）

1. https://powerbi.microsoft.com/ にアクセス
2. **「無料で始める」** をクリック
3. Microsoft アカウントでサインアップ
4. メールアドレス認証を完了

---

#### ② Power BI Pro ライセンスの取得（10-15分）

**無料試用版（60日間）を取得:**

1. https://app.powerbi.com/ にサインイン
2. 右上のユーザーアイコンをクリック
3. **「Pro 試用版を開始」** を選択
4. 確認画面で **「試用版を開始」** をクリック

**ライセンス確認:**
1. 右上のユーザーアイコン → **「アカウント設定」**
2. ライセンスタイプが **「Pro」** または **「Premium」** であることを確認

---

#### ③ Power BI レポート情報の収集（5-10分）

**Hands-on 当日に必要な情報をメモ:**

```
📝 以下の情報をメモ帳などに記録してください:

□ Workspace ID: _______________________________
□ Report ID: _______________________________
□ Report Name: _______________________________
```

**取得方法:**
1. https://app.powerbi.com/ でサンプルレポートを開く
2. ブラウザの URL から ID をコピー
   - URL 例: `https://app.powerbi.com/groups/{WorkspaceID}/reports/{ReportID}/...`
3. または、講師が共有する ID を使用

---

### 2.4 GitHub アカウントの作成（5-10分）

**デプロイ体験をする場合のみ必須**

- [ ] https://github.com/ で無料アカウント作成
- [ ] メールアドレス認証を完了
- [ ] ユーザー名を決定（後から変更不可）

**認証方法の選択:**

**オプション A: HTTPS 認証（簡単・推奨）**
```bash
# Git Credential Manager が自動インストールされているか確認
git credential-manager --version
```
→ 初回 push 時にブラウザで認証

**オプション B: SSH 鍵認証（上級者向け）**
```bash
# SSH 鍵を生成
ssh-keygen -t ed25519 -C "your.email@example.com"

# 公開鍵を GitHub に追加
# https://github.com/settings/keys
```

---

## 3. リポジトリのクローンと動作確認（所要時間: 15-30分）

**⚠️ 重要: 当日の時間節約のため、必ず前日までに完了してください！**

### 3.1 リポジトリのクローン（10-15分）

```powershell
# 1. 作業用ディレクトリを作成
mkdir C:\handson
cd C:\handson

# 2. リポジトリをクローン
git clone https://github.com/Liminghao0922/my-reports.git

# 3. ディレクトリに移動
cd .\my-reports\

# 4. 依存関係をインストール（時間がかかる: ~1分）
npm install
```

**✅ 成功例:**
```
added 85 packages, and audited 86 packages in 7s
```

**❌ エラーが出た場合:**
```powershell
# キャッシュをクリアして再試行
npm cache clean --force
rm -rf node_modules
npm install
```

---

### 3.2 環境変数ファイルの準備（5分）

```powershell
# .env.example をコピーして .env を作成
cp .env.example .env

# .env ファイルを開く
notepad .env  # Windows
code .env     # VS Code
```

**準備する情報（まだ入力しない - 当日講師と一緒に設定）:**

```env
# Azure AD App Registration（当日作成）
VITE_POWERBI_CLIENT_ID=
VITE_POWERBI_TENANT_ID=

# Power BI（事前に取得済み）
VITE_POWERBI_WORKSPACE_ID=
VITE_POWERBI_REPORT_ID=
VITE_POWERBI_REPORT_NAME=
```

---

### 3.3 動作確認テスト（5-10分）

**Node.js と npm が正しく動作するか最終確認:**

```powershell
# テスト用の React アプリを作成
npm create vite@latest test-app -- --template react

# ディレクトリに移動
cd test-app

# 依存関係をインストール
npm install

# 開発サーバー起動
npm run dev
```

**✅ 成功:**
- ブラウザで `http://localhost:5173` が自動で開く
- Vite + React のウェルカム画面が表示される

**テスト完了後、削除:**
```powershell
# test-app ディレクトリから抜ける
cd ..

# テストアプリを削除
rm -r test-app
```

---

## 4. 最終確認チェックリスト

**Hands-on 前日の最終確認:**

```
✅ ノート PC（充電済み）
✅ Node.js 18+ インストール済み
✅ Git インストール済み
✅ VS Code インストール済み
✅ リポジトリクローン済み（npm install 完了）
✅ Azure Subscription あり
✅ Azure AD アカウントでログイン可能
✅ Power BI アカウント・Pro ライセンスあり
✅ GitHub アカウント作成済み
✅ 必要な情報をメモ済み（Workspace ID、Report ID）
✅ インターネット接続確認済み
```

**全てチェックできたら準備完了！** 🎉

---

## 5. 当日持参するもの

#### 必須アイテム
- [ ] **ノートパソコン**（充電器も忘れずに！）
- [ ] **マウス**（推奨）
- [ ] **筆記用具とノート**（メモ用）
- [ ] **準備した情報のメモ**
  ```
  □ Azure Subscription ID（デプロイする場合）
  □ Azure AD アカウント情報（メール・パスワード）
  □ Power BI Workspace ID
  □ Power BI Report ID
  □ GitHub アカウント情報（デプロイする場合）
  ```

---

# 🎓 Hands-on 当日の流れ

## 📖 ワークショップ（1-1.5時間）

**対象者**: 全レベル（初心者〜上級者）

### タイムテーブル

| 時間 | セッション | 内容 | 詳細 |
|-----|-----------|------|------|
| **0-5分** | イントロダクション | 本日の流れ説明 | 目標設定、前提確認 |
| **5-25分** | Azure AD 設定 | アプリ登録作成 | SPA タイプ、API 権限追加、管理者同意 |
| **25-35分** | 認証システム理解 | MSAL.js の仕組み | 認証フロー、トークン管理 |
| **35-40分** | 環境変数設定 | .env ファイル編集 | Client ID、Tenant ID、Report ID 入力 |
| **40-45分** | ローカル実行 | npm run dev | http://localhost:5173 で動作確認 |
| **45-55分** | Azure Static Web Apps | リソース作成 | Deployment Token 取得 |
| **55-70分** | GitHub デプロイ | リポジトリ作成・自動デプロイ | Secrets 設定、コード push、CI/CD 確認 |
| **70-75分** | デプロイ結果確認 | 本番 URL アクセス | 動作確認、環境変数設定 |
| **75-90分** | Q&A・まとめ | 質疑応答 | 次のステップ、認定証授与 |

---

### Session 1: Azure AD アプリ登録（20分）

#### 1.1 Azure Portal にアクセス

- https://portal.azure.com にサインイン

#### 1.2 アプリ登録の作成

**ステップバイステップ:**

1. 検索バーで「**Azure Active Directory**」を検索
2. 左メニュー → 「**アプリの登録**」
3. **「+ 新規登録」** をクリック

4. **アプリ情報を入力:**
   ```
   名前: PowerBI Report Site
   サポートされるアカウントの種類: 
     → この組織ディレクトリのみのアカウント（シングルテナント）
   リダイレクト URI: 
     → シングルページアプリケーション (SPA)
     → http://localhost:5173
   ```

5. **「登録」をクリック**

6. **Client ID と Tenant ID をコピー**
   - 「概要」ページに表示される
   - メモ帳に保存

7. **API 権限の追加**
   - 左メニュー → 「API のアクセス許可」
   - **「+ アクセス許可の追加」**
   - 「Microsoft API」→ 「**Power BI Service**」を選択
   - 「委任されたアクセス許可」を選択:
     - ✅ **Report.Read.All**
     - ✅ **Dataset.Read.All**
     - ✅ **Workspace.Read.All**
   - **「アクセス許可の追加」** をクリック

8. **管理者の同意を付与**
   - **「{テナント名} に管理者の同意を与えます」** をクリック
   - 「はい」で確定

---

### Session 2: 認証システムの理解（10分）

#### 2.1 MSAL.js 認証フローの解説

**講師が解説する内容:**

1. **MsalProvider の役割**
   ```jsx
   <MsalProvider instance={msalInstance}>
     {/* アプリ全体で認証状態を共有 */}
   </MsalProvider>
   ```

2. **useMsal フックの使い方**
   ```jsx
   const { instance, accounts } = useMsal();
   // instance: MSAL インスタンス（ログイン/ログアウト操作）
   // accounts: 現在ログインしているアカウント情報
   ```

3. **ログイン処理**
   ```jsx
   const handleLogin = () => {
     instance.loginPopup(loginRequest);
   };
   ```

4. **トークン取得とレポート埋め込み**
   ```jsx
   const getPowerBIToken = async () => {
     const response = await instance.acquireTokenSilent({
       scopes: loginRequest.scopes,
       account: accounts[0],
     });
     return response.accessToken;
   };
   ```

**学習ポイント:**
- Azure AD 認証の仕組み（OAuth 2.0）
- トークンベース認証
- Power BI への安全なアクセス

---

### Session 3: 環境変数設定とローカル実行（10分）

#### 3.1 環境変数設定（5分）

```powershell
# .env ファイルを開く
code .env
```

**以下の値を入力:**

```env
# Azure AD App Registration
VITE_POWERBI_CLIENT_ID=<先ほどコピーした Client ID>
VITE_POWERBI_TENANT_ID=<先ほどコピーした Tenant ID>

# Power BI
VITE_POWERBI_WORKSPACE_ID=<事前準備で取得した Workspace ID>
VITE_POWERBI_REPORT_ID=<事前準備で取得した Report ID>
VITE_POWERBI_REPORT_NAME=My Power BI Report
```

**保存して閉じる**

---

#### 3.2 ローカル実行（5分）

```powershell
# 開発サーバー起動
npm run dev
```

**ブラウザで http://localhost:5173 を開く**

**確認項目:**
- ✅ ページが正しく表示される
- ✅ 「Sign In」ボタンが表示される
- ✅ ボタンをクリックすると Azure AD ログイン画面が表示される
- ✅ ログイン後、ユーザー名が表示される
- ✅ Power BI レポートが表示される
- ✅ 「Sign Out」ボタンでログアウトできる

**✅ ローカル環境で正常動作を確認！**

---

### Session 4: Azure Static Web Apps の作成（10分）

#### 4.1 リソースの作成

1. **Azure Portal** にアクセス
   - https://portal.azure.com

2. **Static Web Apps を検索**
   - 検索バーで「Static Web Apps」を検索
   - **「+ 作成」** をクリック

3. **基本情報を入力:**
   ```
   サブスクリプション: <自分のサブスクリプション>
   リソースグループ: 新規作成 → powerbi-report-rg
   名前: powerbi-report-app
   プランの種類: Free
   リージョン: East Asia
   
   デプロイの詳細:
   ソース: GitHub
   ```

4. **「GitHub でサインイン」をクリック**
   - GitHub アカウントで認証
   - **後でリポジトリを選択するため、まだ何も選択しない**

5. **「確認と作成」→「作成」をクリック**

---

#### 4.2 Deployment Token の取得

1. デプロイ完了後、リソースに移動
2. 左メニュー → 「**概要**」
3. 「**デプロイ トークンの管理**」をクリック
4. **Deployment Token をコピー**してメモ帳に保存

**⚠️ 重要: このトークンは一度しか表示されません！**

---

### Session 5: GitHub リポジトリ作成とデプロイ（15分）

#### 5.1 GitHub リポジトリの作成（5分）

1. **GitHub にアクセス**
   - https://github.com にログイン

2. **新規リポジトリ作成**
   - 右上の「+」→ 「New repository」
   - Repository name: `powerbi-report-site`
   - Description: `Power BI Report Hosting Site`
   - **Private** を選択（推奨）
   - **「Create repository」** をクリック

---

#### 5.2 GitHub Secrets の設定（3分）

1. 作成したリポジトリページで **「Settings」** タブをクリック
2. 左メニュー → 「Secrets and variables」→ 「**Actions**」
3. **「New repository secret」** をクリック

4. **Secret を追加:**
   ```
   Name: AZURE_STATIC_WEB_APPS_API_TOKEN
   Value: <先ほどコピーした Deployment Token>
   ```

5. **「Add secret」** をクリック

---

#### 5.3 ローカルコードを GitHub にプッシュ（7分）

```powershell
# 1. Git リポジトリを初期化（まだの場合）
git init

# 2. リモートリポジトリを追加
git remote add origin https://github.com/<YourUsername>/powerbi-report-site.git

# 3. ブランチ名を main に変更
git branch -M main

# 4. 全てのファイルをステージング
git add .

# 5. コミット
git commit -m "Initial commit: Power BI Report Site"

# 6. GitHub にプッシュ
git push -u origin main
```

**✅ コードが GitHub にアップロードされました！**

---

#### 5.4 GitHub Actions ワークフローの確認（3分）

1. **GitHub リポジトリページ**に戻る
2. **「Actions」** タブをクリック
3. **自動的に開始されたワークフロー**を確認

**ワークフローの内容:**
- ✅ コードのチェックアウト
- ✅ Node.js のセットアップ
- ✅ 依存関係のインストール (`npm install`)
- ✅ ビルド実行 (`npm run build`)
- ✅ Azure Static Web Apps へのデプロイ

**⏳ デプロイ完了まで 2-3分 待機**

---

### Session 6: デプロイ結果の確認（5分）

#### 6.1 Azure Portal で URL を確認

1. **Azure Portal** に戻る
2. **Static Web Apps リソース**を開く
3. 「概要」ページで **URL** をコピー
   - 例: `https://powerbi-report-app.azurestaticapps.net`

---

#### 6.2 本番環境で動作確認

1. **ブラウザで URL を開く**
2. **確認項目:**
   - ✅ サイトが正しく表示される
   - ❌ ログインエラーが表示される（**正常な動作**）

**❓ なぜエラーが出るのか？**
- ローカル環境（`http://localhost:5173`）でしか動作するように設定していないため

---

#### 6.3 Azure AD のリダイレクト URI を更新

1. **Azure Portal** → **Azure Active Directory**
2. **アプリの登録** → 作成したアプリを選択
3. 左メニュー → 「**認証**」
4. 「シングル ページ アプリケーション」セクションで **「+ URI の追加」**
5. 本番 URL を追加:
   ```
   https://powerbi-report-app.azurestaticapps.net
   ```
6. **「保存」** をクリック

---

#### 6.4 Azure Static Web Apps の環境変数を設定

1. **Azure Portal** → **Static Web Apps リソース**
2. 左メニュー → 「**構成**」
3. **「+ 追加」** をクリック

4. **以下の環境変数を追加:**
   ```
   名前: VITE_POWERBI_CLIENT_ID
   値: <Client ID>
   
   名前: VITE_POWERBI_TENANT_ID
   値: <Tenant ID>
   
   名前: VITE_POWERBI_WORKSPACE_ID
   値: <Workspace ID>
   
   名前: VITE_POWERBI_REPORT_ID
   値: <Report ID>
   
   名前: VITE_POWERBI_REPORT_NAME
   値: My Power BI Report
   ```

5. **「保存」** をクリック

**⚠️ 注意: 環境変数を変更すると、自動的に再デプロイされます（2-3分）**

---

#### 6.5 最終確認

1. **再デプロイ完了を待つ**（GitHub Actions で確認）
2. **本番 URL にアクセス**
3. **完全動作確認:**
   - ✅ サインインボタンが表示される
   - ✅ サインインできる
   - ✅ Power BI レポートが表示される
   - ✅ レポート操作ができる（フィルター、ページ切り替え）

**🎉 デプロイ成功！本番環境で Power BI レポートが動作しています！**

---

### Session 7: Q&A・まとめ（15分）

#### 7.1 本日学んだ内容の復習

- ✅ Azure AD アプリ登録
- ✅ MSAL.js による認証
- ✅ Power BI Embedded の仕組み
- ✅ Azure Static Web Apps へのデプロイ
- ✅ GitHub Actions による CI/CD

---

#### 7.2 質疑応答

**よくある質問:**

**Q: 環境変数を変更したい場合は？**
A: Azure Portal → Static Web Apps → 構成 から変更できます。変更後は自動的に再デプロイされます。

**Q: GitHub リポジトリを Private から Public に変更できますか？**
A: はい、可能です。Settings → Danger Zone → Change visibility から変更できます。

**Q: デプロイに失敗した場合は？**
A: GitHub Actions のログを確認してください。ビルドエラーの詳細が表示されます。

**Q: コストはかかりますか？**
A: Azure Static Web Apps の Free プランは無料です。Power BI Pro ライセンスのみ月額約1,000円必要です。

---

## 📊 受講者の到達目標

**このワークショップで習得できること:**

| 項目 | 内容 |
|-----|------|
| **Azure AD 認証** | シングルページアプリケーション（SPA）の認証実装 |
| **Power BI Embedded** | User Owns Data モデルによるレポート埋め込み |
| **Azure Static Web Apps** | 静的サイトホスティングとデプロイ |
| **GitHub Actions** | CI/CD パイプラインの構築と自動デプロイ |
| **本番環境デプロイ** | HTTPS 対応の本番サイトの公開 |

---

## ⚠️ よくあるトラブルと解決方法

### トラブル 1: npm install エラー

**症状:**
```
npm ERR! code ECONNREFUSED
```

**解決方法:**
```powershell
# npm レジストリを変更
npm config set registry https://registry.npmmirror.com

# または元に戻す
npm config set registry https://registry.npmjs.org

# キャッシュクリア
npm cache clean --force
rm -rf node_modules
npm install
```

---

### トラブル 2: Azure AD 権限不足

**症状:**
「アプリの登録を作成する権限がありません」

**解決方法:**
- IT 部門に連絡して一時的な権限付与を依頼
- または講師が用意したサンプルアカウントを使用

---

### トラブル 3: ポート 5173 が使用中

**症状:**
```
Port 5173 is in use
```

**解決方法:**
```powershell
# 別のポートを使用
npm run dev -- --port 3001
```

---

### トラブル 4: Power BI トークンエラー

**症状:**
「Invalid token」または「Unauthorized」

**解決方法:**
1. Azure AD アプリ登録の API 権限を確認
2. 管理者の同意が付与されているか確認
3. .env ファイルの Client ID と Tenant ID が正しいか確認
4. ブラウザのキャッシュをクリアして再ログイン

---



## 📚 フォローアップリソース

### 学習リソース
- **React 公式ドキュメント**: https://react.dev/
- **MSAL.js ドキュメント**: https://learn.microsoft.com/azure/active-directory/develop/msal-overview
- **Power BI Embedded**: https://learn.microsoft.com/power-bi/developer/embedded/

### コミュニティ
- **GitHub Discussions**: このリポジトリの Discussions タブ
- **Stack Overflow**: タグ `powerbi-embedded`, `msal.js`, `react`

### 次のステップ
- [ ] カスタムテーマの作成
- [ ] 複数レポートの追加
- [ ] ユーザー管理機能の実装
- [ ] 本番環境へのデプロイ
- [ ] CI/CD パイプラインの構築

---