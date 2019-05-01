import React from 'react';

const GroupButtons = ({ onDelete, onChange, people }) => {

    const buttons = [
        {type: 'button', cl: 'btn btn-success mr-1', iCl: 'fa fa-edit', key:1},
        {type: 'button', cl: 'btn btn-danger', iCl: 'fa fa-remove', key:2}
    ];

    return (
            <div className="btn-group" role="group" aria-label="Basic example">
                {buttons.map(b => (
                        <button key={b.key} type={b.type} className={b.cl} style={{ cursor: "pointer" }} onClick={() => b.iCl === 'fa fa-edit' ? onChange(people) : onDelete(people)}><i className={b.iCl}></i></button>
                    ))}
            </div>
        );
}

export default GroupButtons;