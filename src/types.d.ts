export type ITable = {
	x_ord: number;
	y_ord: number;
}

export type IRow = {
	handleChangedCell: (ITable, string) => void;
	updateCells: () => void;
	rowData: Array<any>;
	y: number;
}

export type ICell = {
	onChangedValue: (ITable, string) => void;
	updateCells: () => void;
	Value: string;
	x: number;
	y: number;
}

export type IData = Object