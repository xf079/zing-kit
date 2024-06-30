import { useMemo, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import useRequest from '../useRequest';
import useUpdateEffect from '../useUpdateEffect';
import type { Data, InfiniteScrollOptions, Service } from './types';

const useInfiniteScroll = <TData extends Data>(
  service: Service<TData>,
  options: InfiniteScrollOptions<TData> = {}
) => {
  const {
    target,
    isNoMore,
    threshold = 100,
    reloadDeps = [],
    manual,
    onBefore,
    onSuccess,
    onError,
    onFinally
  } = options;

  const [finalData, setFinalData] = useState<TData>();
  const [loadingMore, setLoadingMore] = useState(false);

  const noMore = useMemo(() => {
    if (!isNoMore) return false;
    return isNoMore(finalData);
  }, [finalData]);

  const { loading, error, run, runAsync, cancel } = useRequest(
    async (lastData?: TData) => {
      const currentData = await service(lastData);
      if (!lastData) {
        setFinalData({
          ...currentData,
          list: [...(currentData.list ?? [])]
        });
      } else {
        setFinalData({
          ...currentData,
          list: [...(lastData.list ?? []), ...currentData.list]
        });
      }
      return currentData;
    },
    {
      manual,
      onFinally: (_, d, e) => {
        setLoadingMore(false);
        onFinally?.(d, e);
      },
      onBefore: () => onBefore?.(),
      onSuccess: (d) => {
        onSuccess?.(d);
      },
      onError: (e) => onError?.(e)
    }
  );

  const loadMore = useMemoizedFn(() => {
    if (noMore) return;
    setLoadingMore(true);
    run(finalData);
  });

  const loadMoreAsync = useMemoizedFn(() => {
    if (noMore) return Promise.reject();
    setLoadingMore(true);
    return runAsync(finalData);
  });

  const reload = () => {
    setLoadingMore(false);
    return run();
  };

  const reloadAsync = () => {
    setLoadingMore(false);
    return runAsync();
  };

  useUpdateEffect(() => {
    run();
  }, [...reloadDeps]);

  return {
    data: finalData,
    loading: !loadingMore && loading,
    error,
    loadingMore,
    noMore,

    loadMore,
    loadMoreAsync,
    reload: useMemoizedFn(reload),
    reloadAsync: useMemoizedFn(reloadAsync),
    mutate: setFinalData,
    cancel
  };
};

export default useInfiniteScroll;
