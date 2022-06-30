import { FC, useContext } from 'react'
import { HomeContext } from '../contexts/HomeContext';
import type { IRow } from '../types'
import Cell from './Cell';

const Row: FC<IRow> = ({ handleChangedCell, updateCells, rowData, y }) => {
	const { x_ord } = useContext(HomeContext);

	const getCols = () => {
		let cells = [];
		for (let x = 0; x < x_ord; x += 1) {
			cells.push(
				<Cell
					x={x}
					y={y}
					key={`${x}-${y}`}
					onChangedValue={handleChangedCell}
					updateCells={updateCells}
					Value={rowData[x] || ''}
				/>,
			)
		}
		return cells;
	}
	return (
		<div>
			{getCols()}
		</div>
	)
}

export default Row