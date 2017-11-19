import React, { Component } from 'react';

// Search Bar component
class SearchBar extends Component {
  render() {
    return <input onChange={event => console.log(event.target.value)} />;
  }
}

// Export Search Bar to index.js
export default SearchBar;