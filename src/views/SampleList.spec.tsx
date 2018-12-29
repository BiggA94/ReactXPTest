import React from 'react';
import { shallow } from 'enzyme';
import { SampleList } from './SampleList';

describe('<SampleList />', () => {
  it('matches its snapshot', () => {
    const component = shallow(<SampleList />);
    expect(component).toMatchSnapshot();
  });
});
