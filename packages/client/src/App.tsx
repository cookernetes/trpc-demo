import { useEffect, useState } from "react";
import { trpc } from "./util/trpc";

function App() {
	const [content, setContent] = useState("");

	useEffect(() => {
		// When page loads initially...
		(async () => {
			const data = await trpc.sayHello.query({
				name: "Henry Sargeant",
				age: 6000
			});

			setContent(String(data))
		})();
	}, [])

	return (
		<div className="App">
			<h1>{content}</h1>
		</div>
	)
}

export default App
