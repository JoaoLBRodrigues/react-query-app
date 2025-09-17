import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}
interface queryProps {
	pageSize: number;
}

const usePosts = (query: queryProps) => {
	return useInfiniteQuery<Post[], Error>({
		// follow url flow, like: /users/1/posts
		queryKey: ["posts", query],
		queryFn: ({ pageParam = 1 }) =>
			axios
				.get("https://jsonplaceholder.typicode.com/posts", {
					params: {
						_start: (pageParam - 1) * query.pageSize,
						_limit: query.pageSize,
					},
				})
				.then((res) => res.data),
		staleTime: 1 * 60 * 1000, // 1 minute
		keepPreviousData: true,
		getNextPageParam: (lastPage, allPages) => {
			// 1 -> 2
			return lastPage.length > 0 ? allPages.length + 1 : undefined;
		},
	});
};

export default usePosts;
