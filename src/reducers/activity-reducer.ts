import type { Activity } from '../types';

export type ActivityActions = 
{type: 'save-activity', payload: {newActivity: Activity}} |
{type: 'set-activeId', payload: {id: Activity['id']}} | 
{type: 'delete-activity', payload: {id: Activity['id']}} |
{type: 'restart-app'} 

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : [];
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const ActivityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    
    if (action.type === 'save-activity') {
        // Manage the logic to update the state with the new activity
        let updatedActivity : Activity[] = []
        
        if (state.activeId) {
            updatedActivity = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity);
        } else {
            updatedActivity = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: updatedActivity,
            activeId: '' // Reset activeId after saving
        };
    }

    if (action.type === 'set-activeId') {
        // Manage the logic to set the active ID
        return {
            ...state,
            activeId: action.payload.id
        };
    }

    if (action.type === 'delete-activity') {
        // Manage the logic to delete an activity
        const updatedActivities = state.activities.filter(activity => activity.id !== action.payload.id);
        return {
            ...state,
            activities: updatedActivities,
            activeId: '' // Reset activeId after deletion
        };
    }

    if (action.type === 'restart-app') {
        // Reset the state to initial state
        return {
            activities : [],
            activeId: ''
        };
    }

    return state;
}
