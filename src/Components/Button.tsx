import * as React from 'react';

export interface IButtonProps {
  className?: string;
  disabled?: boolean;
  onClick(): void;
}

export default class Button extends React.Component<IButtonProps> {
  public readonly defaultProps = {
    disabled: false,
    onClick: () => undefined
  }

  public render(): React.ReactNode {
    let classes: string = 'button';
    if (this.props.className) classes += ` ${this.props.className}`
    return (
      <button
        className={classes}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    )
  }
}