import { SessionProvider } from "./context/sessionContext";
import SessionForm from "./components/SessionForm";
import SessionList from "./components/SessionList";

const App = () => {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-stone-50 font-sans">

        {/* Navbar */}
        <header className="bg-white border-b border-stone-100 px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center gap-2">
            <div className="w-6 h-6 bg-stone-800 rounded-md flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <span className="text-sm font-bold text-stone-800 tracking-tight">Study Planner</span>
          </div>
        </header>

        {/* Main */}
        <main className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">

            {/* Left — Form */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <SessionForm />
            </div>

            {/* Right — List */}
            <SessionList />

          </div>
        </main>

      </div>
    </SessionProvider>
  );
};

export default App;