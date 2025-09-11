import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Todo {
	id: number;
	title: string;
	userId: number;
	completed: boolean;
}

const useTodos = () => {
	const fetchTodo = () =>
		axios
			.get("https://jsonplaceholder.typicode.com/todos")
			.then((res) => res.data);

	return useQuery<Todo[], Error>({
		queryKey: ["todo", "completed"], // store in cache by this key
		queryFn: fetchTodo,
	});
};

export default useTodos;
