import axios from "axios";
import { useEffect, useState } from "react";
import usePosts from "../hooks/usePosts";
import React from "react";

const PostList = () => {
	//const [userId, setUserId] = useState<number>();
	//const { data: posts, error, isLoading } = usePosts(userId);
	const pageSize = 10;
	const {
		data: posts,
		error,
		isLoading,
		fetchNextPage,
		isFetching,
	} = usePosts({ pageSize });
	if (error) return <p>{error.message}</p>;
	if (isLoading) return <p>loading...</p>;

	return (
		<>
			{/** 
			<select
				onChange={(e) => setUserId(parseInt(e.target.value))}
				value={userId}
				name=""
				id=""
				className="form-selcect mb-3"
			>
				<option value=""></option>
				<option value="1">User 1</option>
				<option value="2">User 2</option>
				<option value="3">User 3</option>
			</select>
            */}
			<ul className="list-group">
				{posts.pages.map(
					(
						page,
						index // map each page to a react fragment
					) => (
						<React.Fragment key={index}>
							{page.map((post) => (
								<li key={post.id} className="list-group-item">
									{post.title}
								</li>
							))}
						</React.Fragment>
					)
				)}
			</ul>
			<div className="mt-2"></div>

			<button
				className="btn btn-primary ms-2"
				onClick={() => fetchNextPage()}
				disabled={isFetching}
			>
				{isFetching ? "Loading..." : "Load More"}
			</button>
		</>
	);
};

export default PostList;
