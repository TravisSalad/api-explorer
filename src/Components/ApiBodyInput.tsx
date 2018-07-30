import * as React from 'react';
import Input from './Input';
import { IBodyFieldState } from './ExplorerComponent';
import { InputTypeEnum } from '../Typings/InputTypeEnum';

export interface IApiBodyInputProps {
  bodyField: IBodyFieldState;
  onChange(value: string|number, bodyField): void;
}

export default class ApiBodyInput extends React.Component<IApiBodyInputProps> {
  constructor(props: IApiBodyInputProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  private onChange(value: string|number): void {
    this.props.onChange(value, this.props.bodyField);
  }
  
  public render(): React.ReactNode {
    const { bodyField } = this.props;
    const { config } = bodyField;
    return (
      <Input
        max={config && config.max}
        min={config && config.min}
        onChange={this.onChange}
        placeholder={config && config.placeholder}
        required={config && config.required}
        title={config && config.name}
        type={config && config.type || InputTypeEnum.text}
        validationPattern={config && config.pattern}
        value={bodyField.value}
      />
    );
  }
}