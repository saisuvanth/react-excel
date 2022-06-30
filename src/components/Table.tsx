import React, { Dispatch, FC, useCallback, useContext, useState } from 'react'
import { HomeContext } from '../contexts/HomeContext';
import type { IData, ITable } from '../types';
import Row from './Row';

interface TableProps {
	data: any;
	setData: Dispatch<[]>;
}

const Table: FC<TableProps> = ({ data, setData }) => {
	const { x_ord, y_ord } = useContext(HomeContext);
	// const [data, setData] = useState([]);
	const [, updateState] = useState<{}>();
	const forceUpdate = useCallback(() => updateState({}), []);

	const handleChangedCell = ({ x_ord, y_ord }: ITable, value: string) => {
		console.log(x_ord, y_ord, value);
		const modifiedData: any = Object.assign({}, data)
		if (!modifiedData[y_ord]) modifiedData[y_ord] = {}
		modifiedData[y_ord][x_ord] = value;
		console.log(modifiedData);
		setData(modifiedData);
	}

	const updateCells = () => {
		forceUpdate();
	}

	const getRows = (): JSX.Element[] => {
		let rows = [];
		for (let y = 0; y < y_ord + 1; y += 1) {
			const rowData = data[y] || {}
			rows.push(
				<Row
					handleChangedCell={handleChangedCell}
					updateCells={updateCells}
					key={y}
					y={y}
					rowData={rowData}
				/>,
			)
		}
		return rows;
	}

	return (
		<div>
			{getRows()}
		</div>
	)
}

export default Table