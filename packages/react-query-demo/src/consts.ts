import {
  QueryClient,
  type QueryKey,
  type QueryFunction,
  type FetchQueryOptions,
} from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  logger: {
    log: (...args) => {
      console.log('info:', args);
    },
    warn: (...args) => {
      console.warn('warning:', args);
    },
    error: (...args) => {
      console.error('error:', args);
    },
  },
  defaultOptions: {
    queries: {
      retry: 3, // 重试三次
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 重试延时
      refetchOnWindowFocus: false, // 关闭页面聚焦重新请求
      enabled: true, // 默认开启网络请求
      keepPreviousData: false, // 默认每次都是新请求，不再使用前面的数据（分页或者无限滚动请求需要开启）
    },
  },
});

// 获取缓存的数据
export const cacheData = (queryKey: QueryKey) => {
  return queryClient.getQueryData(queryKey);
};

// 预请求
export const prefetchData = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  options?: FetchQueryOptions
) => {
  return queryClient.prefetchQuery(queryKey, queryFn, options);
};
