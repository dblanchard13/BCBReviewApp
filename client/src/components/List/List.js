
import React from 'react'
import './List.css'

// The `{ children }` code below is again making use of
// object destructuring and grabbing the `children` property
// off of the `props` being passed to this component.
// The value of the `children` property is whatever elements
// are nested within the component's opening and closing tags.
// So, given the following `List` component instance:
/*
  <List>
    <ListItem>
      Some list item
    </ListItem>
  </List>
*/
// The `children` property would be an array with the
// `ListItem` component in it. And when the `{ children }`
// code is run within the `ul` tag below, it will display
// the rendered `ListItem`.

export const List = ({ children }) => (
  <div className='list-overflow-container'>
    <ul className='list-group'>
      { children }
    </ul>
  </div>
)

