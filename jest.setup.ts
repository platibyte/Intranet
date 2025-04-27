
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// Extend the Jest matcher types to include testing library matchers
declare global {
  namespace jest {
    interface Matchers<R, T = {}> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string | RegExp): R;
      toBeVisible(): R;
      // Add any other matchers you commonly use
    }
  }
}
