import React, {Component} from 'react';

export default class Search extends Component {
    state = {
        value: ''
    }
    onChange = (e) => {
        const {onFiltered} = this.props;
        const value = e.target.value;
        this.setState({value});
        onFiltered(value);
    }

    isError = () => {
        const { count } = this.props;
        const { length } = this.state.value;
        const mainClass = 'form-control';
        return count === 0 && length > 0 ? `${mainClass} is-invalid` : mainClass;
    }

    render() {
        return (<div className="form-group">
            <input className={this.isError()}
                   placeholder="Поиск агента"
                   value={this.state.value} onChange={this.onChange}/>
            <div className="invalid-feedback">
                Агенты не найдены
            </div>
        </div>)
    }
}