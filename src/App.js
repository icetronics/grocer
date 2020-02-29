import React from 'react';
import Draggable from 'react-draggable';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';

import './App.css';

const FOOD_LIST = [
  'apple',
  'avocado',
  'bacon',
  'baguette',
  'banana',
  'biscuit',
  'blueberries',
  'bread',
  'broccoli',
  'cabbage',
  'eggplant',
  'nutella',
  'peas'
];

class App extends React.Component {
  constructor() {
    super();
    this.myListRef = React.createRef();
    this.state = {
      draggedItem: null
    };
  }

  isInsideMyListArea = ({ clientX, clientY }) => {
    const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = this.myListRef.current;

    return (
      clientX >= offsetLeft &&
      clientX <= offsetLeft + offsetWidth &&
      clientY >= offsetTop &&
      clientY <= offsetTop + offsetHeight
    );
  }

  handleDrag = e => {
    console.warn(this.isInsideMyListArea(e));
    console.warn(this.state.draggedItem);
  }

  handleDragStart = item => {
    this.setState({ draggedItem: item });
  }

  handleDragStop = (e) => {
    this.setState({ draggedItem: null });
    console.warn(this.myListRef);
    console.warn(e);
  }

  render() {
    const { draggedItem } = this.state;
    const areaClasses = classNames('area', { dragging: !!draggedItem });
    const myListClasses = classNames('myList');

    return (
      <div className="App">
        <div className={areaClasses}>
          {FOOD_LIST.map(item => (
            <Draggable
              key={item}
              //grid={[24, 24]}
              onDrag={this.handleDrag}
              onStart={() => this.handleDragStart(item)}
              onStop={this.handleDragStop}
            >
              <ReactSVG
                className="item"
                src={`/images/food/${item}.svg`}
                wrapper="span"
              />
            </Draggable>
          ))}
          <div className={myListClasses} ref={this.myListRef}></div>
        </div>
      </div>
    );
  }
}

export default App;
