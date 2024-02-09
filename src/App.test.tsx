/* eslint-disable linebreak-style */
import { describe, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('should render hello world', () => {
        // Arrange
        render(<App />);
        const heading = 'Hello world!';
        // Act
        // Expect
        expect(
            screen.getByRole('heading', {
                level: 1,
            })
        ).toHaveTextContent(heading);
    });
});
