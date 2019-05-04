import React from 'react';

const TableBody = ({data}) => {

    function generateUniqueKey(keyName,inf){
        return `${inf}_${keyName}`;
    }

    function generateValue (data, key) {
        const value = data[key];
        if(key === 'buttons') return value(data);
        return value;
    }
        return (
            <tbody>
            {data.map(d => (
                <tr key={d.key}>
                    {Object.keys(d).map((keyName, i) => (
                        <td key={generateUniqueKey(keyName, i)}>{generateValue(d, keyName)}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        )
};

export default TableBody;