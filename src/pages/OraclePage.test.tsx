import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TestApp } from '@/test/TestApp';
import OraclePage from './OraclePage';

describe('OraclePage', () => {
  it('gates on an unwritten Wire with a path to the assessments', async () => {
    render(
      <TestApp>
        <OraclePage />
      </TestApp>,
    );
    // Title (German default)
    expect(await screen.findByText('Das Orakel')).toBeInTheDocument();
    // The Canon tab is shown by default, which gates on unwritten Wire
    expect(
      await screen.findByText(/deiner ist noch ungeschrieben/i),
    ).toBeInTheDocument();
    expect(await screen.findByText(/Test starten/i)).toBeInTheDocument();
  });
});
