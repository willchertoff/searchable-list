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
const fetchData = (searchTerm = '', cb, err) => {
  fetch(`http://localhost:3000/listings?q=${searchTerm}&_limit=20`)
    .then(response => response.json())
    .then(json => cb(json))
    .catch(e => err())
}

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
    const { 
      handleSuccess,
      handleError 
    } = this;
    this.setState({
      loading: true,
    })
    fetchData('', handleSuccess, handleError);
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.searchTerm === prevState.searchTerm) return;
    const { searchTerm } = this.state;
    const { 
      handleSuccess,
      handleError 
    } = this;
    this.setState({
      loading: true,
    });
    fetchData(searchTerm, handleSuccess, handleError);
  }

  /* StateChange Functions */
  handleError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }
  handleSuccess = (json) => {
    this.setState({
      data: json,
      loading: false,
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
