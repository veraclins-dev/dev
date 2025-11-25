import { useEffect } from 'react';
import { toast as showToast, Toaster } from 'sonner';

import { type Toast } from './toast';

type ToasterProps = React.ComponentProps<typeof Toaster>;

export const EpicToaster = ({ theme, ...props }: ToasterProps) => (
  <Toaster theme={theme} richColors {...props} />
);

export const toast = (options: Toast) =>
  showToast[options.type](options.title, {
    id: options.id,
    description: options.description,
  });

export function useToast(options?: Toast | null) {
  useEffect(() => {
    if (options) {
      setTimeout(() => {
        toast(options);
      }, 0);
    }
  }, [options]);
}
