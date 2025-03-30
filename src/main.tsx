
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize the React application by rendering the App component into the DOM
// Using createRoot API which is part of React 18's concurrent features
createRoot(document.getElementById("root")!).render(<App />);
