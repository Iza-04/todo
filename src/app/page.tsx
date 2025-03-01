'use client'

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
    const [arrayOfNames, setArrayOfNames] = useState([
        'Morning',
        'Afternoon',
        'Evening'
    ]);

    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedValue, setEditedValue] = useState('');

    function onAdd() {
        // @ts-ignore
        setArrayOfNames((previousArray) => [...previousArray, value || value2])
        setValue('');
        setValue2('')
    }

    function onDelete(value :string) {
        setArrayOfNames((previousArray) => {
            const filteredArray = previousArray.filter(name => name !== value)
            return filteredArray
        })
    }

    function onEdit(index: number, name: string) {
        setEditingIndex(index);
        setEditedValue(name);
    }

    function onSaveEdit(index: number) {
        if (editedValue.trim() === '')
            return;
        setArrayOfNames((prevArray) =>
            prevArray.map((name, i) => (i === index ? editedValue : name))
        );
        setEditingIndex(null);
        setEditedValue('');
    }

    function onCancelEdit() {
        setEditingIndex(null);
        setEditedValue('');
    }

    return (
        <>
            <div className="todo-list">
                <h1 style={{ display: 'flex', justifyContent: 'center', borderRadius: '5px', backgroundColor: 'lightblue' }}>TO DO LIST</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <div>
                        <p style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'grey', borderRadius: '4px' }}>Today</p>
                        <input value={value} onChange={(event) => setValue(event.target.value)} type='text' />
                        <button onClick={onAdd}>+</button>
                    </div>
                    <div>
                        <p style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'grey', borderRadius: '4px' }}>Tomorrow</p>
                        <input value={value2} onChange={(event) => setValue2(event.target.value)} type='text' />
                        <button onClick={onAdd}>+</button>
                    </div>
                    <div>
                        <ul>
                            {arrayOfNames.map((name, index) => (
                                <li key={index}>
                                    {editingIndex === index ? (
                                        <>
                                            <input
                                                value={editedValue}
                                                onChange={(event) => setEditedValue(event.target.value)}
                                                type='text'
                                            />
                                            <button onClick={() => onSaveEdit(index)}>Save</button>
                                            <button onClick={onCancelEdit}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            {name}
                                            <button onClick={() => onEdit(index, name)}>Edit</button>
                                            <button onClick={() => onDelete(name)}>X</button>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}