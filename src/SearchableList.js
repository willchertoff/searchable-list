import React,
  {
    Component,
    PropTypes
  } from 'react';
import fetch from 'isomorphic-fetch';

class SearchableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      loading: false,
      error: false,
      searchTerm: null,
    }
  }
  static defaultProps = {
    endpoint: 'http://localhost:3000',
  }
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
  }

  /* Lifecycle Functions */
  componentDidMount = () => {
    this.setState({
      loading: true,
    })
    this.fetchListings();
  }
  componentDidUpdate = (prevProps, prevState) => {
    // Make Network Request
    if (this.state.searchTerm === prevState.searchTerm) return;
    const { searchTerm } = this.state;
    this.setState({
      loading: true,
    });
    this.fetchListings(searchTerm);
  }

  /* Component Functions */
  fetchListings = (searchTerm = '') => {
    fetch(`http://localhost:3000/listings?q=${searchTerm}&_limit=20`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          listings: json,
          loading: false,
        })
      })
  }
  updateSearchTerm = (e) => {
    let term = e.target.value;
    this.setState({
      searchTerm: term,
    })
  }
  renderListings = () => {
    const { listings, loading } = this.state;
    const l = loading ? (
        <p>Loading</p>
      ) : (
        listings.length > 0 ? (
          listings.map(listing => 
            <p key={listing.first_name}>
              {listing.first_name} {listing.last_name} {listing.email}
            </p>
          )
        ) : ( <p>No Listings</p> )
      )
    return l;
  }
  render() {
    return (
      <div>
        <input 
          type='text'
          placeholder={'search for users'}
          onChange={this.updateSearchTerm}
        />
        <br />
        {this.renderListings()}
      </div>
    )
  }
}

export default SearchableList;