import React from 'react';
import GroupButtons from "../elements/groupButtons";

const TableBody = ({data,people, onDelete, onChange}) => {

    const generateUniqueKey = (keyName,inf) => {
        return `${inf}_${keyName}`;
    }

    const generateValue = (data, key) => {
        const value = data[key];
        if(key === 'buttons') return value(data);
        return value;
    }

    const buttons = (d) => {
            return (
                <td><GroupButtons people={d} onDelete={onDelete} onChange={onChange}/></td>
            );
    }

        return (
            <tbody>
            {data.map(d => (
                <tr key={d.key}>
                    {Object.keys(d).map((keyName, i) => (
                        <td key={generateUniqueKey(keyName, i)}>{generateValue(d, keyName)}</td>
                    ))}
                    {buttons(d)}
                </tr>
            ))}
            </tbody>
        )
};
//export default withData(TableBody);
export default TableBody;