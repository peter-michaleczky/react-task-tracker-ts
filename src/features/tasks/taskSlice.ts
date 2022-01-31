import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {TaskModel} from "../../models";

// entity adapters are type safe and supports CRUD operations out-of-the-box
const tasksAdapter = createEntityAdapter<TaskModel>({
    selectId: task => task.id,
    sortComparer: (a, b) => a.text.localeCompare(b.text)
})

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: tasksAdapter.getInitialState(),
    reducers: {
        taskAdded: tasksAdapter.addOne,
        taskSetAll: tasksAdapter.setAll,
        taskRemoved: tasksAdapter.removeOne,
    }
});

export default taskSlice.reducer;