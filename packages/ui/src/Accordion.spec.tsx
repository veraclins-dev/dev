import { render } from '@testing-library/react';

import { Accordion } from './accordion';

describe('Accordion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Accordion type="single" />);
    expect(baseElement).toBeTruthy();
  });
});
