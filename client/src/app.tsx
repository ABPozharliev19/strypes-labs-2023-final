import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "@app/components/navbar";
import { SearchPage } from "@app/pages/search.page";

const App = (): JSX.Element => {
	const dispatch = useDispatch();

	return (
		<Router>
			< Navbar />

			<Routes>
				<Route path={"/search"} element={ <SearchPage />} />
			</Routes>
		</Router>
	);
};

export default App;
