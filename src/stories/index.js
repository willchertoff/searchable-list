import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import SearchableList from '../SearchableList';

storiesOf('SearchableList', module)
  .add('default view', () => (
    <SearchableList />
  ));
