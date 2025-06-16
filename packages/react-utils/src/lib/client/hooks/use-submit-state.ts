import { useEffect, useState } from 'react';
import { type Navigation, useActionData, useNavigation } from 'react-router';

export function useSubmitState<
  T extends { status?: 'error' | 'idle' | 'success' },
>() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [transitions, setTransitions] = useState<Array<Navigation['state']>>(
    [],
  );
  const actionData = useActionData<T>();
  const navigation = useNavigation();

  useEffect(() => {
    setTransitions((current) => {
      if (current[current.length - 1] === navigation.state) return current;
      if (navigation.state === 'idle' && current.includes('submitting')) {
        setHasSubmitted(true);
        return ['idle'];
      }
      setHasSubmitted(false);
      return [...current, navigation.state];
    });
  }, [navigation.state]);

  return {
    hasSubmitted,
    hasErrors: actionData?.status === 'error' && hasSubmitted,
    successful: hasSubmitted && actionData?.status !== 'error',
    transitions,
  };
}
