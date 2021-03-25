import { useQuery } from 'react-query';
import { RequestMethod } from '../../types/network/RequestMethod';

type UseSubscriptionArgs = {
    route: string
    queryKey: string
}

export const useSubscription = ({
    route,
    queryKey,
}: UseSubscriptionArgs) => {
    return useQuery(queryKey, () => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const request = new Request(route, {
            method: RequestMethod.GET.valueOf(),
            headers,
            mode: 'same-origin',
        });

        return fetch(request).then((res) => res.json());
    });
}
