export interface CodeDemoProps {
  code: string;
  language?: string;
  className?: string;
  title?: string;
  description?: string;
  theme?: 'light' | 'dark' | 'auto';
}

export interface CodeDemoScope {
  [key: string]: unknown;
}

export interface CodeDemoComponentProps extends CodeDemoProps {
  scope?: CodeDemoScope;
  defaultMode?: 'static' | 'interactive';
  showModeToggle?: boolean;
  defaultCode?: string;
}

export interface ReactRunnerWrapperProps {
  code: string;
  scope: Record<string, unknown>;
  onError?: (error: string | null) => void;
}
