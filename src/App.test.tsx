import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('renders learn react link', () => {
  it('renders link', () => {
    render(<App />);
  });
});
