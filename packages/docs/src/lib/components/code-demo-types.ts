export interface CodeDemoProps {
  code: string;
  language?: string;
  className?: string;
  theme?: 'light' | 'dark';
}

export type CodeDemoMode = 'static' | 'interactive';

export interface CodeDemoScope {
  [key: string]: unknown;
}

export interface CodeDemoComponentProps extends CodeDemoProps {
  scope?: CodeDemoScope;
  mode?: CodeDemoMode;
  defaultCode?: string;
}

export interface ReactRunnerWrapperProps {
  code: string;
  scope: Record<string, unknown>;
  onError?: (error: string | null) => void;
}
