import * as React from 'react';
import { InputTypeEnum } from '../Typings/InputTypeEnum';

export interface IInputProps {
  className?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  onChange(value: string|number): void;
  placeholder?: string;
  required?: boolean;
  title?: string;
  type?: string;
  validationPattern?: string;
  value?: string|number;
}

export default class Input extends React.Component<IInputProps> {

  constructor(props:IInputProps) {
    super(props);
    this.onChange = this.onChange.bind(this)
  }

  public defaultProps = {
    disabled: false,
    onChange: () => undefined,
    placeholder: '',
    required: false,
    type: 'text',
    value: '',
  }

  private onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    typeof this.props.onChange === 'function' && this.props.onChange(e.target.value);
  }

  public render(): React.ReactNode {
    let classes: string = 'text-field';
    let labelClasses: string = 'text-field__label'
    if (this.props.className) classes += ` ${this.props.className}`
    // Adds red * to required fields
    if (this.props.required) labelClasses += ' required';
    return (
      <span className='text-field__wrapper'>
        <label className={labelClasses}>{this.props.title}</label>
        <input
          className={classes}
          id='text-field'
          onChange={this.onChange}
          placeholder={this.props.placeholder}
          type={this.props.type}
          value={this.props.value}
        />
      </span>
    );
  }
}