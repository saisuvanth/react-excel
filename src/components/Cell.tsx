import { useEffect, useState } from 'react';
import type { FC, FormEvent, KeyboardEvent, FocusEvent } from 'react';
import type { ICell, ITable } from '../types';
import './components.css';


const Cell: FC<ICell> = ({ onChangedValue, updateCells, Value, x, y }) => {
	const [editing, setEditing] = useState<boolean>(false);
	const [selected, setSelected] = useState<boolean>(false);
	const [value, setValue] = useState(Value);

	const determineDisplay = ({ x_ord, y_ord }: ITable, value: string): string => {
		return value;
	}

	let display = determineDisplay({ x_ord: x, y_ord: y }, Value);
	let timer: any = 0;
	const delay = 200;
	let prevent: boolean = false;

	const emitUnselectAllEvent = () => {
		const unselectAllEvent = new Event('unselectAll')
		window.document.dispatchEvent(unselectAllEvent);
	}


	const handleUnselectAll = () => {
		if (selected || editing) {
			setSelected(false);
			setEditing(false);
		}
	}

	const cellOnChange = (event: FormEvent<HTMLInputElement>) => {
		setValue(event.currentTarget.value);
		display = determineDisplay({ x_ord: x, y_ord: y }, event.currentTarget.value);

	}

	const hasNewValue = (value: string) => {
		console.log(x, y, value);
		onChangedValue({ x_ord: x, y_ord: y }, value);
		setEditing(false);
	}

	const onKeyPressOnInput = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			hasNewValue(event.currentTarget.value)
		}
	}

	const onKeyPressOnSpan = () => {
		if (!editing) {
			setEditing(true);
		}
	}

	const onBlur = (e: FocusEvent<HTMLInputElement>) => {
		hasNewValue(e.target.value)
	}

	const handleClick = () => {
		timer = setTimeout(() => {
			if (!prevent) {
				emitUnselectAllEvent()
				setSelected(true)
			}
			prevent = false
		}, delay)
	}

	const handleDoubleClick = () => {
		clearTimeout(timer)
		prevent = true
		emitUnselectAllEvent()
		setSelected(true);
		setEditing(true);
	}

	useEffect(() => {
		window.addEventListener('unselectAll', handleUnselectAll);
		return () => window.removeEventListener('unselectAll', handleUnselectAll);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	if (x === 0) {
		return (
			<span className='cell index_x'>
				{y}
			</span>
		)
	}

	if (y === 0) {
		const alpha = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
		return (
			<span
				onKeyPress={onKeyPressOnSpan}
				className="cell index"
				role="presentation">
				{alpha[x]}
			</span>
		)
	}

	if (editing) {
		return (
			<input
				className={selected ? 'active cell' : 'cell'}
				type="text"
				onBlur={onBlur}
				onKeyPress={onKeyPressOnInput}
				value={value}
				onChange={cellOnChange}
				autoFocus
			/>
		)
	}
	return (
		<span
			onClick={handleClick}
			onDoubleClick={handleDoubleClick}
			className={selected ? 'passive cell' : 'cell'}
			role="presentation"
		>
			{display}
		</span>
	)
}

export default Cell