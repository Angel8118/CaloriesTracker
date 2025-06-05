import { type Activity } from '../types';
import { categories } from '../data/categories';
import { useMemo, type Dispatch} from 'react';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import type { ActivityActions } from '../reducers/activity-reducer';

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>

}

export default function ActivityList({ activities, dispatch }: ActivityListProps) {

    const categoryNames = useMemo(() => (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
        , [activities])
    const isEmptyActivities = useMemo(() => activities.length === 0, [activities]);


    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center ">Comida y Actividades</h2>

            {isEmptyActivities ? (
                <p className="text-center text-2xl font-bold text-shadow-black mt-10">
                    No hay actividades registradas...
                </p>
            ) :
            activities.map(activity => (
                <div key={activity.id} className="bg-white py-5 px-10 flex justify-between rounded-lg mt-5 shadow">
                    <div className='space-y-2 relative' >
                        <p
                            className={`absolute -top-8 -left-8 text-white px-10
                             py-2 rounded-lg font-bold uppercase text-xs 
                             ${activity.category === 1 ? "bg-lime-500" : "bg-orange-500"}`}

                        >{categoryNames(+activity.category)}</p>
                        <p className="text-2xl font-bold pt-5">{activity.name}</p>
                        <p className='font-black text-4xl text-lime-500'>
                            {activity.calories} {''}
                            <span >Calorías:</span>
                        </p>
                    </div>

                    <div className='flex items-center gap-5'>
                        <button
                        onClick={() => dispatch({ type: 'set-activeId', payload: { id: activity.id } })}
                        >
                            <PencilSquareIcon
                            className='h-8 w-8 text-gray-800'
                            />
                        </button>
                        <button
                        onClick={() => dispatch({ type: 'delete-activity', payload: { id: activity.id } })}
                        >
                            <XCircleIcon
                            className='h-8 w-8 text-red-500'
                            />
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
