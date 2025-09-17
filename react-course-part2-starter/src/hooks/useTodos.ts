import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../react-query/constants";
import todoService from "../services/todoService";

export interface Todo {
	id: number;
	title: string;
	userId: number;
	completed: boolean;
}

const useTodos = () => {
	return useQuery<Todo[], Error>({
		queryKey: CACHE_KEY_TODOS, // store in cache by this key
		queryFn: todoService.getAll,
	});
};

export default useTodos;
