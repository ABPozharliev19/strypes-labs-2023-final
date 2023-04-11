import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

const App = (): JSX.Element => {
	const dispatch = useDispatch();

	return (
		<Router>
			<Routes>
			</Routes>
		</Router>
	);
};

export default App;
