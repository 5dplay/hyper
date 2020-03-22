import {webFrame} from 'electron';
import React from 'react';
import {render} from 'react-dom';

class HelloMessage extends React.Component {
    render() {
      return (
        <div>
          Hello {this.props.name}
        </div>
      );
    }
  }


const app = render(
    <HelloMessage name="Taylor" />,
    document.getElementById('mount_ssh')
);


console.log('i am ok!');