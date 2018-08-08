
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthInterface from './AuthInterface'

// So this component is definitely pretty 🤯
// But let's step through it one line at a time.

// First thing we do is declare a functional react component called `PrivateRoute`
// and functional components receive `props` as their first argument.
// In `App.js` we've defined one of our private routes like the following:

// <PrivateRoute exact path='/' component={ Conversations } />

// So the `props` being passed to the `PrivateRoute` component
// in the above instance will be the following object:

// { exact: true, path: '/', component: Conversations }

// The `component: Component` is taking advantage of object 
// destructuring and also aliasing. In practical terms it
// is grabbing the `component` property from `props` and
// renaming it to `Component`. The equivalent in old JS
// could look like the following:

/*
function PrivateRoute (props) {
  var Component = props.component
}
*/

// The `...rest` bit is taking advantage of the rest operator
// (the three dots are the operator and the word is the variable
// you assign the value to). The rest operator simply grabs
// all the values from `props` that aren't explicitly grabbed
// by destructuring. To reuse the example `props` from above,
// the `rest` variable would be equal to the following object:

// { exact: true, path: '/' }

// The three dots are known as the rest operator when grabbing
// an unkown quantity of properties from an object, but when
// used later in this function as `{ ...rest }` it's known
// as the spread operator. The surrounding curly brackets are 
// there to allow us to define a JS expression within our JSX.
// The `...rest` piece "spreads" out each property it has pulled
// off `props` and passes them to the `Route component`
// Given the above value of rest, the initial component would end
// up looking like the following:

// <Route exact='true' path='/' render={ render function goes here.. } />


const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route
    { ...rest }
    render={ props => (
      AuthInterface.isLoggedIn() ? (
        <Component { ...props } />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
  )} />
)

export default PrivateRoute
