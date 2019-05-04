import React from 'react';

const TableHeader = ({fields}) => {
        return (
            <thead>
            <tr>
                {fields.map(f => (
                    <th scope="col" key={f.key}>{f.field}</th>
                ))}
            </tr>
            </thead>
        );
};

export default TableHeader;