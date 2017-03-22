import React, {
  Component,
  PropTypes
} from 'react';
import fetch from 'isomorphic-fetch';

/* Functional */
const listings = (listings) => listings.map(l => listing(l));
const errormsg = (error) => <p>Sorry, there was an error</p>
const loadmsg = (loading) => <p>Loading</p>
const listing = (listing) =>
  <p key={listing.first_name}>
    {listing.first_name} {listing.last_name} {listing.email}
  </p>

class SearchableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
    this.fetchData();
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.searchTerm === prevState.searchTerm) return;
    const { searchTerm } = this.state;
    this.setState({
      loading: true,
    });
    this.fetchData(searchTerm);
  }

  /* StateChange Functions */
  fetchData = (searchTerm = '') => {
    fetch(`http://localhost:3000/listings?q=${searchTerm}&_limit=20`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json,
          loading: false,
        })
      })
      .catch(e => {
        this.setState({
          error: true,
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

  /* Content Functions */
  renderContent = () => {
    const { data, loading, error } = this.state;
    if (error) return errormsg();
    if (loading) return loadmsg();
    if (data.length > 0) return listings(data);
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
        {this.renderContent()}
      </div>
    )
  }
}

export default SearchableList;