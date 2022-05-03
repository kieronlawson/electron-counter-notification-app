import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { Counter } from './Counter';
import classes from './App.module.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className={classes.app}>
              <Counter />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
