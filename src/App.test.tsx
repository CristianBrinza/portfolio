// Import necessary libraries and the component to be tested
import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  it('should render hello world', () => {
    // Arrange
    render(<App />);
    const heading = 'Hello world!';
    // Act - The rendering is the action in this case
    // Expect
    expect(
      screen.getByRole('heading', { name: heading, level: 1 })
    ).toHaveTextContent(heading);
  });
});
