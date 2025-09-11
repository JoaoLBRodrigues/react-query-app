import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

const fetchPosts = async (): Promise<Post[]> => {
	const response = await axios.get(
		"https://jsonplaceholder.typicode.com/posts"
	);
	return response.data;
};

const usePosts = () => {
	return useQuery<Post[], Error>({
		queryKey: ["posts"],
		queryFn: fetchPosts,
		staleTime: 1 * 60 * 1000, // 1 minute
	});
};

export default usePosts;
