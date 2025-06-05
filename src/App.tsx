import { useReducer, useEffect, useMemo } from "react"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import { ActivityReducer, initialState } from "./reducers/activity-reducer"
import CalorieTracker from "./components/CalorieTracker";

export default function App() {

  const [state, dispatch] = useReducer(ActivityReducer, initialState);
  useEffect(() => {
    // Load initial data from localStorage or any other source if needed
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = () => useMemo(() => state.activities.length,[state.activities]);

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center font-bold text-lg text-white uppercase">
            Contador de Calorias
          </h1>
          <button
          className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white rounded-lg cursor-pointer text-sm
          disabled:opacity-10"
          disabled={!canRestartApp()}
          onClick={() => dispatch({ type: 'restart-app' })}
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
          dispatch={dispatch}
          state={state}
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
          activities={state.activities}
          />

        </div>
      </section>

      <section className="max-w-4xl mx-auto py-10 px-5">
        <ActivityList
        activities={state.activities}
        dispatch={dispatch}
        />
      </section>
    </>
  )
}

