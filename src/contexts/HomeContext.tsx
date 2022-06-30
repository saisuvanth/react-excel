import { createContext, useState } from "react";
import type { ITable } from "../types";

export const HomeContext = createContext<ITable>({} as ITable);

type HomeContextProviderProps = {
	children: JSX.Element[] | JSX.Element;
}


const HomeContextProvider = ({ children }: HomeContextProviderProps) => {
	const [data, setData] = useState<ITable>({ x_ord: 26, y_ord: 30 });

	return (
		<HomeContext.Provider value={data}>
			{children}
		</HomeContext.Provider>
	)
}

export default HomeContextProvider;
