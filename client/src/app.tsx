import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "@app/components/navbar";

import { SearchPage } from "@app/pages/search.page";
import { ProductPage } from "@app/pages/listing.page";

const App = (): JSX.Element => {
	return (
		<Router>
			< Navbar />

			<Routes>
				<Route path={"/search"} element={ <SearchPage />} />
				<Route path={"/listing/:id"} element={ <ProductPage />} />
			</Routes>
		</Router>
	);
};

export default App;
