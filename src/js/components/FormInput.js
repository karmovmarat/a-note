import Rating from './Rating';
import React, {Component, PropTypes} from 'react';
import Suggest from './Suggest';
import Button from 'react-bootstrap/lib/Button';

class FormInput extends Component {
  
  getValue() {
    return 'value' in this.refs.input
      ? this.refs.input.value
      : this.refs.input.getValue();
  }

  render() {
    const common = {
      id: this.props.id,
      ref: 'input',
      defaultValue: this.props.defaultValue,
    };
    switch (this.props.type) {
      case 'year':
        return (
          <input
            {...common}
            type="number" 
            defaultValue={this.props.defaultValue || new Date().getFullYear()} />
        );
      case 'suggest':
        return (<Suggest {...common} options={this.props.options} />);
      case 'rating':
        return (
          <Rating
            {...common}
            defaultValue={parseInt(this.props.defaultValue, 10)} />
        );
      case 'textarea':
        return <textarea {...common} />;
      case 'button':
        return <Button 
                 {...common}
                 defaultValue={this.props.defaultValue || "CreateNew"}
                onClick={this.props.getNewNote} > Create-New </Button>;
      default:
        return <input {...common} type="text" />;
    }
  }
}

FormInput.propTypes = {
  type: PropTypes.oneOf(['year', 'suggest', 'rating', 'textarea', 'input', 'button']), // ... 'text', 'input']),
  id: PropTypes.string,
  options: PropTypes.array,
  defaultValue: PropTypes.any,
  getNewNote: PropTypes.func,

};

export default FormInput
