import React, {
  Component,
  PropTypes
} from 'react';
import fetch from 'isomorphic-fetch';

/* Functional */
const listings = (listings) => listings.map(l => listing(l));
const errormsg = (error) => <p>Sorry, there was an error</p>
const loadmsg = (loading) => <p>Loading</p>
const needData = (data = []) => !data.length > 0;
const listing = (listing) =>
  <p key={listing.first_name}>
    {listing.first_name} {listing.last_name} {listing.email}
  </p>
const fetchData = (endpoint, searchTerm = '', cb) => {
  fetch(`${endpoint}/listings?q=${searchTerm}&_limit=20`)
    .then(response => response.json())
      .then(json => cb(json))
        .catch(e => cb(null, true));
}

class SearchableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || [],
      loading: false,
      error: false,
      searchTerm: null,
    }
  }
  static defaultProps = {
    endpoint: '',
  }
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
  }

  /* Lifecycle Functions */
  componentDidMount = () => {
    const { data } = this.state;
    const { endpoint } = this.props;
    const { handleResponse } = this;
    if (!needData(data)) {
      return;
    };
    this.setState({
      loading: true,
    })
    fetchData(endpoint, '', handleResponse);
  }
  componentDidUpdate = (prevProps, prevState) => {
    const { endpoint } = this.props;
    const { searchTerm } = this.state;
    const { handleResponse } = this;
    if (searchTerm === prevState.searchTerm) return;
    this.setState({
      loading: true,
    });
    fetchData(endpoint, searchTerm, handleResponse);
  }

  /* StateChange Functions */
  handleResponse = (data, error = false) => {
    if (error) {
      this.setState({
        error: true,
        loading: false,
      })
    } else {
      this.setState({
        data: data,
        loading: false,
        error: false,
      })
    }
  }
  updateSearchTerm = (e) => {
    this.setState({
      searchTerm: e.target.value,
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
