import * as React from 'react';
import Typography from './Typography';
import { TypographyEnum } from '../Typings/TypographyEnum';
import Button from './Button';
import ApiBodyInput from './ApiBodyInput';
import CodeViewer from './CodeViewer';
import { sendRequest } from '../Services/Api';
import Spinner from './Spinner';
import { validatePattern, validateMaxLength, validateMinLength } from '../Services/Validation';

export interface IExplorerComponentProps {
  apiConfig: IApiConfig;
}

export interface IExplorerComponentState {
  bodyFields: IBodyFieldState[];
  data: any;
  loading: boolean;
}

export type IBodyFieldState = {
  config: IBodyField;
  value: string|number;
}

export default class ExplorerComponent extends React.Component<IExplorerComponentProps, IExplorerComponentState> {
  constructor(props: IExplorerComponentProps) {
    super(props);
    this.state = {
      bodyFields: [],
      data: undefined,
      loading: false
    }
    this.createData = this.createData.bind(this);
    this.hasError = this.hasError.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderBody = this.renderBody.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  public componentDidMount(): void {
    let bodyFields: IBodyFieldState[] = [];
    if (this.props.apiConfig && Array.isArray(this.props.apiConfig.body) && this.props.apiConfig.body.length) {
      bodyFields = this.props.apiConfig.body.map((bodyField: IBodyField, index: number) => {
        return {
          config: bodyField,
          value: ''
        };
      })
    }
    this.setState({ bodyFields });
  }

  private createData(): IHashTable<string|number> {
    let data: IHashTable<string|number> = {};
    this.state.bodyFields.forEach((bodyFieldState: IBodyFieldState) => {
      data[bodyFieldState.config.name] = bodyFieldState.value;
    });
    return data;
  }

  private async sendRequest(): Promise<void> {
    const { apiConfig } = this.props;
    let reqObject: IReqObject = {
      url: apiConfig.url,
      method: apiConfig.method
    }
    if (Array.isArray(this.state.bodyFields) && this.state.bodyFields.length) {
      reqObject.data = this.createData();
    }
    // clear data to hide the response and show loading spinner
    this.setState({ loading: true, data: undefined })
    try {
      const data = await sendRequest(reqObject);
      this.setState({ data, loading: false });
    } catch (err) {
      console.error(err);
      this.setState({ loading: false });
    }
  }

  private onChange(value: string|number, bodyField: IBodyFieldState): void {
    // find the index of the field we're updating
    const currentIndex: number = this.state.bodyFields.findIndex(bodyFieldState => {
      return bodyFieldState.config.name === bodyField.config.name
    });
    const bodyFields: IBodyFieldState[] = [...this.state.bodyFields];
    bodyFields[currentIndex].value = value;
    this.setState({ bodyFields });
  }

  private renderBody(): React.ReactNode {
    // loop through the body fields in state and create a text field for each one
    return (
      <div className="explorer-component__section">
        <Typography variant={TypographyEnum.subtitle}>Body</Typography>
        {
          Array.isArray(this.state.bodyFields) &&
          this.state.bodyFields.length &&
          this.state.bodyFields.map((bodyField: IBodyFieldState, index: number) => {
            return (
              <ApiBodyInput bodyField={bodyField} onChange={this.onChange} />
            );
          })
        }
      </div>
    );
  }

  private hasError(): boolean {
    for (let i = 0; i < this.state.bodyFields.length; i++) {
      const field: IBodyFieldState = this.state.bodyFields[i];
      const { config, value } = field;
      if (config.required && value !== 0 && !value) return true;
      // if we're provided a regex pattern, let's make sure it's a match
      if (config.pattern && !validatePattern(String(value), config.pattern).valid) {
        return true;
      }
      // if we're provided a min, check if string is greater than min
      if (config.min !== undefined && !validateMinLength(String(value), config.min).valid) {
        return true;
      }
      // if we're provided a max, check if string is less than max
      if (config.max !== undefined && !validateMaxLength(String(value), config.max).valid) {
        return true;
      }
    }
    console.log('made it past loop');
    
    return false;
  }

  public render(): React.ReactNode {
    const { apiConfig } = this.props;
    if (!apiConfig) return undefined;
    const { title, method, url, body } = apiConfig;
    return (
      <div className="explorer-component__wrapper">
        {title && <Typography variant={TypographyEnum.title}>{title}</Typography>}
        {method && <Typography error={true} variant={TypographyEnum.subtitle}>{method}</Typography>}
        {url && 
          <div>
            <Typography variant={TypographyEnum.subtitle}>Base URL</Typography>
            <Typography variant={TypographyEnum.paragraph}>{url}</Typography>
          </div>
        }
        {Array.isArray(body) && body.length && this.renderBody()}
        <Button disabled={this.hasError()} onClick={this.sendRequest}>Send Request</Button>
        {this.state.loading && <Spinner />}
        {this.state.data && 
          <div>
            <Typography variant={TypographyEnum.subtitle}>Response</Typography>
            <CodeViewer data={this.state.data} />
        </div>}
      </div>
    );
  }
}
