import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import WorkoutPrograms from './components/WorkoutPrograms';
import ExerciseLibrary from './components/ExerciseLibrary';
import BMICalculator from './components/BMICalculator';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ExerciseDetail from './components/ExerciseDetail';

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
              <WorkoutPrograms />
              <ExerciseLibrary />
              <BMICalculator />
              <Testimonials />
            </>
          }
        />
        <Route path="/exercises/:id" element={<ExerciseDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
