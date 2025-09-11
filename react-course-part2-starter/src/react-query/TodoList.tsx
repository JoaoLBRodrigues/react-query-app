import useTodos from "../hooks/useTodos";

const TodoList = () => {
	const { error, isLoading, data: todo } = useTodos();

	if (error) return <p>{error.message}</p>;

	if (isLoading) return <p>loading...</p>;

	return (
		<ul className="list-group">
			{todo?.map((todo) => (
				<li key={todo.id} className="list-group-item">
					<a>{todo.title}</a>
				</li>
			))}
		</ul>
	);
};

export default TodoList;
