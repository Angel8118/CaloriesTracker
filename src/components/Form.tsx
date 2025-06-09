import { useState, type ChangeEvent, type FormEvent, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import type { Activity } from '../types';
import { categories } from "../data/categories";
import { useActivity } from '../hooks/useActivity';


const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form() {

    const { state, dispatch } = useActivity()

    const [activity, setActivity] = useState<Activity>(initialState);
    useEffect(() => {
        // If there is an activeId, find the activity and set it to the form
        if (state.activeId) {
            const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectActivity);
        }
        // else {
        //     // Reset to initial state if no activeId
        //     setActivity(initialState);
        // }

    }, [state.activeId]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id);

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        });
    }

    const isValidActivity = () => {
        const { name, calories } = activity;
        return name.trim() !== '' && calories > 0;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({ type: 'save-activity', payload: { newActivity: activity } });

        setActivity({
            ...initialState,
            id: uuidv4() // Generate a new ID for the next activity
        });
    }


    return (
        <form className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="font-bold" htmlFor="category">Categoría:</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="font-bold" htmlFor="name">Actividad:</label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg bg-white"
                    placeholder="Ej. Correr 30 minutos, Comida, Jugo de Naranja, Pesas, etc."
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="font-bold" htmlFor="calories">Calorías:</label>
                <input
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg bg-white"
                    placeholder="Ej. 200, 500, 1000"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white 
                cursor-pointer disabled:opacity-10"
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                disabled={!isValidActivity()}
            />
        </form>
    )
}
