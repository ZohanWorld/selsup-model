import { Component} from 'react'
import './App.css'

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  name: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues
    };
  }

  handleParamChange = (paramId: number, value: string) => {
    this.setState(prevState => ({
      paramValues: prevState.paramValues.map(param => 
        param.paramId === paramId ? { ...param, value } : param
      )
    }));
  }

  getModel(): Model {
    return {
      ...this.props.model,
      paramValues: this.state.paramValues
    };
  }

  render() {
    return (
      <div className="param-editor">
        {this.props.params.map(param => {
          const value = this.state.paramValues.find(p => p.paramId === param.id)?.value || '';
          return (
            <div key={param.id} className="param-field">
              <label>{param.name}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => this.handleParamChange(param.id, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

function App() {
  const params: Param[] = [
    {
      id: 1,
      name: "Назначение",
      type: 'string'
    },
    {
      id: 2,
      name: "Длина",
      type: 'string'
    }
  ];

  const initialModel: Model = {
    paramValues: [
      {
        paramId: 1,
        value: "повседневное"
      },
      {
        paramId: 2,
        value: "макси"
      }
    ],
    colors: []
  };

  return (
    <div className="app">
      <ParamEditor params={params} model={initialModel} />
    </div>
  );
}

export default App
