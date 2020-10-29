
"use strict";

class Example extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
          <span> Gato gatuno </span>
        )              
    }
}

customElements.define('example-component', Example);