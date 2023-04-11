import { KeyboardEventHandler, ReactElement, useState } from "react";

import { SearchBar } from "@app/styles/navbar.style";
import { Container } from "@app/styles/common.style";

const Navbar: React.FC = (): ReactElement => {
	const [search, setSearch] = useState("");

	const onSearch = (event: KeyboardEventHandler): void => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		if (event.key === "Enter") {
			console.log("nice");
		}
	};

	return (
		<Container>
			<SearchBar value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={onSearch} />
		</Container>
	);
};

export default Navbar;
