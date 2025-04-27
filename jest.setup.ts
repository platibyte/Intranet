
import '@testing-library/jest-dom';

// This explicitly adds the types to the global Jest namespace
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string | RegExp): R;
      toBeVisible(): R;
      // Add other matchers as needed
    }
  }
}
