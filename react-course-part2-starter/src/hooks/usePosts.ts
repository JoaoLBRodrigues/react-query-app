import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}
interface queryProps {
	page: number;
	pageSize: number;
}

const usePosts = (query: queryProps) => {
	return useQuery<Post[], Error>({
		// follow url flow, like: /users/1/posts
		queryKey: ["posts", query],
		queryFn: () =>
			axios
				.get("https://jsonplaceholder.typicode.com/posts", {
					params: {
						_start: (query.page - 1) * query.pageSize,
						_limit: query.pageSize,
					},
				})
				.then((res) => res.data),
		staleTime: 1 * 60 * 1000, // 1 minute~
		keepPreviousData: true,
	});
};

export default usePosts;
