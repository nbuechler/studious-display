import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import _ from 'underscore';

export default class Node extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }

  _handleOver(d) {
    var shifter = 30; // This gets the whole tooltip away from the node

    var forceTipDOM = ReactDOM.findDOMNode(this).parentElement.parentElement.children[3]; //DOM Element
    console.log(forceTipDOM);
    var nodePiePaths = forceTipDOM.children[2].children[0].children; //piePaths
    var nodePieData = [d.physicArrayLength, d.emotionArrayLength, d.academicArrayLength, d.communeArrayLength, d.etherArrayLength]; //data
    var nodePie = d3.layout.pie()(nodePieData); //pie layout
    var arcGen = d3.svg.arc() //arcGeneration of pie slices paths
          .innerRadius(25 * 0.0)
          .outerRadius(25 * 0.9);

    // Change Rectangle Element
    forceTipDOM.children[0].setAttribute('x', d.cx + shifter);
    forceTipDOM.children[0].setAttribute('y', d.cy + shifter);
    forceTipDOM.children[0].setAttribute('visibility', 'visible');

    // Change Text Title
    forceTipDOM.children[1].innerHTML = d.nodeType.charAt(0).toUpperCase() + d.nodeType.slice(1);
    forceTipDOM.children[1].setAttribute('x', d.cx + 20 + shifter);
    forceTipDOM.children[1].setAttribute('y', d.cy + 30 + shifter);
    forceTipDOM.children[1].setAttribute('visibility', 'visible');

    // Change MiniPieChart Element
    forceTipDOM.children[2].setAttribute('visibility', 'visible');
    forceTipDOM.children[2].setAttribute('x', d.cx + 5);
    forceTipDOM.children[2].setAttribute('y', d.cy + 5);
    forceTipDOM.children[2].setAttribute('visibility', 'visible');

    nodePiePaths[0].setAttribute('d', arcGen(nodePie[0]));
    nodePiePaths[1].setAttribute('d', arcGen(nodePie[1]));
    nodePiePaths[2].setAttribute('d', arcGen(nodePie[2]));
    nodePiePaths[3].setAttribute('d', arcGen(nodePie[3]));
    nodePiePaths[4].setAttribute('d', arcGen(nodePie[4]));


    console.log(arcGen(nodePie[0]), nodePiePaths[0]);

    console.log(forceTipDOM.children, d, [d.physicArrayLength, d.emotionArrayLength, d.academicArrayLength, d.communeArrayLength, d.etherArrayLength]);
  }
  _handleOut(d) {
    var forceTipDOM = ReactDOM.findDOMNode(this).parentElement.parentElement.children[3];

    // Change Rectangle Element
    forceTipDOM.children[0].setAttribute('visibility', 'hidden');

    // Change Text Title
    forceTipDOM.children[1].setAttribute('visibility', 'hidden');

    // Change MiniPieChart Element
    forceTipDOM.children[2].setAttribute('visibility', 'hidden');

    // console.log(d, forceTipDOM.children);
  }

  render () {
    var node = '';
    var nodeColor = '#111';
    if (this.props.privacy) {
      nodeColor = 'white';
    }

    switch (this.props.nodeType) {
      case 'log':

        node = <circle  fill={nodeColor}
                        r={this.props.r + 'px'}
                        cx={this.props.cx}
                        cy={this.props.cy}
                        stroke={nodeColor}
                        style={{strokeWidth: '3px'}}
                        onMouseOver={this._handleOver.bind(this, this.props)}
                        onMouseOut={this._handleOut.bind(this, this.props)}
                        />
        break;
      case 'word':
        node = <circle  fill={this.props.fillColor}
                        r={this.props.r * ('.' + this.props.characters) + 'px'}
                        cx={this.props.cx}
                        cy={this.props.cy}
                        stroke={this.props.stroke}
                        style={{strokeWidth: '3px'}}
                        onMouseOver={this._handleOver.bind(this, this.props)}
                        onMouseOut={this._handleOut.bind(this, this.props)}
                        />
        break;
      default:
        break;
    }

    return (
      node
    );
  }
}
