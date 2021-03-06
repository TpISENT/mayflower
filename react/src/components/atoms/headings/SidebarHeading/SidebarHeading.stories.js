import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, select, withKnobs } from '@storybook/addon-knobs/react';

import sidebarMarkdown from './SidebarHeading.md';
import SidebarHeading from './index';

storiesOf('atoms/headings', module).addDecorator(withKnobs)
  .add('SidebarHeading', withInfo({ sidebarMarkdown })(() => {
    const levelOptions = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6
    };

    const title = text('sidebarHeading.title', 'Key Agencies');
    const level = select('sidebarHeading.level', levelOptions, levelOptions[2]);

    return(<SidebarHeading title={title} level={level} />);
  }));

