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
    expect(await screen.findByText('The Oracle')).toBeInTheDocument();
    expect(
      await screen.findByText(/yours is unwritten/i),
    ).toBeInTheDocument();
    expect(await screen.findByText(/Begin an assessment/i)).toBeInTheDocument();
  });
});
