import {
	QueryClient,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { Todo } from "../hooks/useTodos";

interface AddTodoContext {
	previousTodos?: Todo[];
}

const TodoForm = () => {
	const queryClient = useQueryClient();
	const queryKey = ["todos", "completed"];

	const ref = useRef<HTMLInputElement>(null);

	//useMutation<data getting from backend, represent error, represent the data that we send to the server>

	const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
		mutationFn: (todo: Todo) =>
			axios
				.post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
				.then((response) => response.data),
		onMutate: async (newTodo) => {
			const previousTodos = queryClient.getQueryData<Todo[]>(queryKey);
			queryClient.setQueryData<Todo[]>(queryKey, (todos) => [
				newTodo,
				...(todos || []),
			]);

			if (ref.current) ref.current.value = "";

			return { previousTodos };
		},

		onSuccess: (savedTodo, newTodo) => {
			queryClient.setQueryData<Todo[]>(queryKey, (todos = []) =>
				todos.map((todo) =>
					todo.title === newTodo.title ? savedTodo : todo
				)
			);
		},

		onError: (error, newTodo, context) => {
			if (context?.previousTodos) {
				queryClient.setQueryData<Todo[]>(
					queryKey,
					context.previousTodos
				);
			}
		},
	});

	return (
		<>
			{addTodo.error && (
				<div className="alert alert-danger">
					{addTodo.error.message}
				</div>
			)}
			<form
				className="row mb-3"
				onSubmit={(e) => {
					e.preventDefault();
					if (ref.current && ref.current.value)
						addTodo.mutate({
							id: 0,
							title: ref.current.value,
							completed: false,
							userId: 1,
						});
				}}
			>
				<div className="col">
					<input ref={ref} type="text" className="form-control" />
				</div>
				<div className="col">
					<button className="btn btn-primary">Add</button>
				</div>
			</form>
		</>
	);
};

export default TodoForm;
