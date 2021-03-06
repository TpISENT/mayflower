import { text } from '@storybook/addon-knobs/react';

const list = [{
  text: 'This is a list item in an unordered list'
}, {
  text: 'An unordered list is a list in which the sequence of items is not important. Sometimes, an unordered list is a bulleted list. And this is a long list item in an unordered list that can wrap onto a new line.'
}, {
  text: 'Lists can be nested inside of each other',
  sublist: [{
    text: 'This is a nested list item'
  }, {
    text: 'This is another nested list item in an unordered list'
  }]
}, {
  text: 'This is the last list item'
}];

export default {
  sublist: (value) => {
    const unorderedList = (value.length) ? value : list;
    const newList = [];
    unorderedList.forEach((listItem, idx) => {
      const newItem = listItem;
      newItem.text = text(`List Item ${idx}`, listItem.text);
      if (listItem.sublist) {
        listItem.sublist.forEach((subItem, subIdx) => {
          newItem.sublist[subIdx] = subItem;
          newItem.sublist[subIdx].text = text(`Sub Item ${subIdx}`, subItem.text);
        });
      }
      newList.push(newItem);
    });
    return newList;
  }
};
