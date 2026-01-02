import { useConform, useCustomFetcher } from '@veraclins-dev/form';
import {
  Box,
  HiddenField,
  SelectField,
  TextareaField,
  Typography,
} from '@veraclins-dev/ui';
import { useEffect, useMemo } from 'react';
import { FormModal } from '#app/components/dialogs/form-modal';
import {
  getCategoriesForEntityType,
  getCategoryLabel,
} from '#app/utils/reports/category-mapping';
import { ReportSchema } from '#app/utils/reports/validations';

interface ReportProps {
  entityType: string;
  entityId: string;
  open: boolean;
  onClose: (submitted?: boolean) => void;
  title?: string;
  message?: React.ReactNode;
}

export const Report = ({
  entityType,
  entityId,
  open,
  onClose,
  title = 'Report Content',
  message,
}: ReportProps) => {
  const fetcher = useCustomFetcher();
  const { form, fields } = useConform({
    id: `report-${entityType}-${entityId}`,
    schema: ReportSchema,
    fetcher,
    defaultValue: { entityType, entityId },
  });

  const handleClose = () => {
    onClose(true);
    form.reset();
  };

  const categories = useMemo(
    () => getCategoriesForEntityType(entityType),
    [entityType]
  );

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => {
        const { label, description } = getCategoryLabel(category);
        return {
          value: category,
          label: (
            <Box>
              <Typography variant="subtitle2">{label}</Typography>
              <Typography variant="caption" className="text-foreground/70">
                {description}
              </Typography>
            </Box>
          ),
        };
      }),
    [categories]
  );

  useEffect(() => {
    if (fetcher.loaded && fetcher.data?.success) {
      onClose(true);
    }
  }, [fetcher.loaded, fetcher.data, onClose]);

  return (
    <FormModal
      open={open}
      onOpenChange={handleClose}
      title={title}
      confirmButtonProps={{
        text: 'Report',
        loading: fetcher.loading,
      }}
      formProps={{
        form,
        fetcher,
        action: '/resources/report',
      }}
      className="gap-6 sm:max-w-xl"
    >
      <Box display="flex" flexDirection="column" gap={4}>
        {message && (
          <Typography className="text-foreground/80 text-sm">
            {message}
          </Typography>
        )}

        <HiddenField field={fields.entityType} />
        <HiddenField field={fields.entityId} />

        <SelectField
          field={fields.category}
          label="Report Category"
          options={categoryOptions}
        />

        <TextareaField
          field={fields.reason}
          label="Reason (Optional)"
          placeholder="Provide any additional details that would help us review this report"
          rows={3}
        />
      </Box>
    </FormModal>
  );
};
