"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** fallback UI — 省略時はデフォルトのエラー画面を表示 */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * React レンダリングエラーをキャッチするデバッグ用バウンダリ。
 * 本番環境ではユーザー向けメッセージ、開発環境ではスタックトレースを表示する。
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // 本番ログ収集サービス（Sentry 等）への送信はここで行う
    console.error("[ErrorBoundary] キャッチしたエラー:", error);
    console.error("[ErrorBoundary] コンポーネントスタック:", info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback) return this.props.fallback;

    const isDev = process.env.NODE_ENV === "development";

    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-900 p-8">
        <div className="max-w-md rounded-xl bg-red-900/40 p-6 text-white">
          <h2 className="mb-2 text-xl font-bold text-red-300">
            予期しないエラーが発生しました
          </h2>
          <p className="mb-4 text-sm text-white/70">
            ページをリロードしてもエラーが続く場合はお問い合わせください。
          </p>
          {isDev && this.state.error && (
            <pre className="overflow-auto rounded bg-black/40 p-3 text-xs text-red-200">
              {this.state.error.stack}
            </pre>
          )}
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium hover:bg-red-600"
          >
            再試行
          </button>
        </div>
      </div>
    );
  }
}
