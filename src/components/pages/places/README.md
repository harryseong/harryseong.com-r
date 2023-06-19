# React

## Making API Calls
- Via Axios library.

## State management
- React built-in states
- Redux vs Redux Toolkit (RTK)

## Routing & navigation
- Use "Routes" from "react-router-dom" library.


# Redux

## Actions
- Plain JS object with a "type" field.
    - "type" field should be a string that gives the action a descriptive name; "<domain>/<eventName>" (Ex: "places/placesLoaded").
- An action object can have other fields with additional information about what happened.

```
const loadPlacesAction = {
    type: 'places/placesLoaded',
    payload: 'New place'
}
```

## Action Creators
- An action creator is a function that creates and returns an action object.

```
const loadPlaces = text => {
    return {
        type: 'places/loadPlaces',
        payload: text
    }
}
```

## Reducers
- A reducer is a function that...
    1. receives the current "state" and an "action" object
    2. decides how to update the state if necessary
    3. returns the new state "(state, action) => newState"
- Reducer can be thought of as an event listener which handles events based on the received action (event) type.
    - Why is it called "reducer"?: they are similar to kind of callback function you pass to the Array.reduce() method.
- Reducers must always follow some specific rules:
    - Should only calculate the new state based on the state and action arguments.
    - Not allowed to modify the existing state. Instead, they must make immmutable updates by copying the existing state and making changes to the copied values.
    - Must not do any asynchronous logic, calculate random values, or cause other "side effects"
- Typical logic inside reducer functions:
    - Check to see if reducer care about this action.
        - If so, make copy of the state, update the copy with new values, and return it.
    - Otherwise, return the existing state unchanged.

```
const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
    // See if reducer cares about this action:
    if (action.type === 'counter/increment') {
        return {
            // If so, make a copy of state
            ...state,
            // and update the copy with the new value
            value: state.value + 1
        }
    }

    // otherwise return the existing state unchanged
    return state
}
```

## Store
- The current Redux application state lives in an object called the "store".
- The store is created by passing in a reducer.
- The store has a method called "getState" that returns the current state value.

```
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: counterReducer});

console.log(store.getState());
// {value: 0}
```


## Dispatch
- Redux store has a method called "dispatch".
- The only way to update the store is to call "store.dispatch()" and pass in an action object.
- The store will run its reducer function and save the new state value inside.
- We can call getState() to retrieve the udpated value.

```
store.dispatch({ type: 'counter/increment' });

console.log(store.getState());
// {value: 1}
```

- Dispatching actions = triggering an event
- Typically, action creators are called to dispatch the right action:
```
const increment = () => {
    return {
        type = 'counter/increment'
    }
}

store.dispatch(increment());

console.log(store.getState());
// {{ value: 2}}
```

## Selectors
- Selectors are functions that know how to extract specific pieces of information from a store state value.
- As app grows in size, this can help avoid repeating logic as different parts of apps need to read the same data.

```
const selectCounterValue = state => state.value;

const currentValue = selectCounterValue(store.getState())
console.log(currentValue);
// 2
```



# Redux Toolkit (RTK)
- Opinionated library compared to Redux.
- Includes a collection of utilities and helpers that make it easier to manage state in Redux applications.
- Key features:
    1. Use of "createReducer" and "createAction" functions which make it easier to create and manage reducers and actions in Redux.
    2. These functions provide a simplified, opinionnated approach to creating reducers and actions, helping reduce the amount of boilerplate code developers need to write.
    3. RTK also includes support for middleware including Reduc Thunk middleware, which allows writing of asynchronous actions.
    4. RTK also includes a "configureStore" function, which makes it easier to configure the Redux store.


# GOAL TODAY:
- Setup Places store, reducer, actions
- Get Places to be able to make an API call to get Places and save in the Places store.
- Display places in a list
- BONUS: Try w/ Redux Toolkit
