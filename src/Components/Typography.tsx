import * as React from 'react';
import { TypographyEnum } from '../Typings/TypographyEnum';

export interface ITopographyProps {
  className?: string;
  error?: boolean;
  success?: boolean;
  variant?: TypographyEnum;
  warning?: boolean;
}

export default class Typography extends React.Component<ITopographyProps>{
  constructor(props: ITopographyProps) {
    super(props);
    this.renderTypography = this.renderTypography.bind(this);
  }

  public readonly defaultProps = {
    // default to paragrah if no variant is passed in
    variant: TypographyEnum.paragraph
  }

  private renderTypography(): React.ReactNode {
    // fetch the typography enum string an apply it as the className
    let classes: string = 'typography';
    if (this.props.variant) classes += ` ${TypographyEnum[this.props.variant]}`;
    // add any classes being passed in from props to allow for customization
    if (this.props.className) classes += ` ${this.props.className}`;
    // text will be red
    if (this.props.error) classes += ' error';
    // text will be green
    if (this.props.success) classes += 'success';
    // text will be yellow
    if (this.props.warning) classes += ' warning';
    // render html tag based on variant passed in
    switch (this.props.variant) {
      case TypographyEnum.paragraph: {
        return <p className={classes}>{this.props.children}</p>
      }
      case TypographyEnum.title: {
        return <h1 className={classes}>{this.props.children}</h1>
      }
      case TypographyEnum.subtitle: {
        return <h3 className={classes}>{this.props.children}</h3>
      }
      default:
        return <p className="paragraph">{this.props.children}</p>
    }
  }
  public render(): React.ReactNode {
    // create the typography based off of the typography enum value passed in from props
    return this.renderTypography();
  }
}