import React, {Component} from 'react';

export default class TableBody extends Component {

    generateUniqueKey = (keyName,inf) => {
        return `${inf}_${keyName}`;
    }

    generateValue = function (data, key) {
        const value = data[key];
        if(key === 'buttons') return value(data);
        return value;
    }


    render() {
        const {data} = this.props;
        return (
            <tbody>
            {data.map(d => (
                <tr key={d.key}>
                    {Object.keys(d).map((keyName, i) => (
                        <td key={this.generateUniqueKey(keyName, i)}>{this.generateValue(d, keyName)}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        )
    }
}