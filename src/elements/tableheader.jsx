import React, {Component} from 'react';

export default class TableHeader extends Component {
    render() {
        const {fields} = this.props;
        return (
            <thead>
            <tr>
                {fields.map(f => (
                    <th scope="col" key={f.key}>{f.field}</th>
                ))}
            </tr>
            </thead>
        );
    }
}