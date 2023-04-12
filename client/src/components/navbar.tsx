import { KeyboardEventHandler, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SearchBar } from "@app/styles/navbar.style";
import { Container } from "@app/styles/common.style";
import { useSearchText } from "@app/stores/reducers";
import { setSearchText } from "@app/stores/search.store";

const Navbar: React.FC = (): ReactElement => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const searchState = useSearchText();

	const [search, setSearch] = useState(searchState);

	const onSearch = (event: KeyboardEventHandler): void => {
		if (event.key === "Enter") {
			dispatch(setSearchText(search));
			navigate("/search");
		}
	};

	return (
		<Container>
			<SearchBar value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={onSearch} />
		</Container>
	);
};

export default Navbar;
