import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function useGetData(url: string) {
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState<any>(null);
	const [loading, setLoading] = useState<Boolean>(false);

	const getData = async () => {
		try {
			setLoading(true);
			const response = await axios.get(url);
			setData(response.data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, [url]);

	return { data, error, loading };
}
