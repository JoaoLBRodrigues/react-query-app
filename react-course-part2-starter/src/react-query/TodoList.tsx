import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Todo {
	id: number;
	title: string;
	userId: number;
	completed: boolean;
}

const TodoList = () => {
	const fetchTodo = () =>
		axios
			.get("https://jsonplaceholder.typicode.com/todos")
			.then((res) => res.data);

	const {
		data: todo,
		error,
		isLoading,
	} = useQuery<Todo[], Error>({
		queryKey: ["todo", "completed"], // store in cache by this key
		queryFn: fetchTodo,
	});

	if (error) return <p>{error.message}</p>;

	if (isLoading) return <p>loading...</p>;

	return (
		<ul className="list-group">
			{todo?.map((todo) => (
				<li key={todo.id} className="list-group-item">
					{todo.title}
				</li>
			))}
		</ul>
	);
};

export default TodoList;
