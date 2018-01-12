import EventUtil from './EventUtil';
import React, {Component, PropTypes} from 'react';

class InputTypeFile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {value: props.defaultValue};
  }
  
  getValue() {
    return this.state.value;
  }
  
  render() {
    let files = null;
    return (
      <div>
        <form>
            <input 
              type="file"
              defaultValue={this.props.defaultValue}
              onChange={e => this.setState({files: e.target.files})}
              id={this.props.id} />

            <input 
              type="reset"
              defaultValue={this.props.defaultValue}
              onChange={e => this.setState({files: e.target.files})}
              id={this.props.id} />

        
        </form> 
      </div>
    );
  }
}

InputTypeFile.propTypes = {
  id: PropTypes.string,
  defaultValue: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
};

export default InputTypeFile
