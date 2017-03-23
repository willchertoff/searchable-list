import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import SearchableList from '../index';

const data = [{first_name: 'ssrFirst', last_name: 'ssrLast', email: 'ssrEmail'}];

storiesOf('SearchableList', module)
  .add('Client fetch', () => (
    <SearchableList
      endpoint={'http://localhost:3000'}
    />
  ))
  .add('SSR data', () => (
    <SearchableList 
      endpoint={'http://localhost:3000'}
      data={data}
    />
    ))
