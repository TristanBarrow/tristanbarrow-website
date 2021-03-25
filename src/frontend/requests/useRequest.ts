import { useState, useCallback } from 'react';
import { RequestMethod } from '../../types/network/RequestMethod';
import { ResponseMessage } from '../../types/network/ResponseMessage';

enum RequestStatus {
    NOT_SENT = 'Not Sent',
    IS_FETCHING = 'Is Fetching',
    ERROR = 'Error',
    SUCCESS = 'Success',
}

type UseRequestArgs = {
    route: string,
    method: RequestMethod
}

export const useRequest = <OUT, IN>({
    route,
    method
}: UseRequestArgs) => {
    const [data, setData] = useState(null as null | IN | ResponseMessage);
    const [status, setStatus] = useState(RequestStatus.NOT_SENT);

    const makeRequest = useCallback((body: OUT | null): void => {
        setStatus(RequestStatus.IS_FETCHING);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const request = new Request(route, {
            method: method.valueOf(),
            headers,
            mode: 'same-origin',
            body: JSON.stringify(body)
        });

        fetch(request)
            .then((res: Response) => res.json())
            .then((data: IN | ResponseMessage) => {
                if ((data as ResponseMessage).success === false) {
                    setStatus(RequestStatus.ERROR);
                } else {
                    setStatus(RequestStatus.SUCCESS);
                }
                setData(data);
            })
            .catch((err: Error) => {
                setStatus(RequestStatus.ERROR);
                console.error(err);
            });
    }, []);

    return {
        makeRequest,
        isFetching: status === RequestStatus.IS_FETCHING,
        isFetched: status === RequestStatus.SUCCESS,
        notSent: status === RequestStatus.NOT_SENT,
        error: status === RequestStatus.ERROR,
        data,
    }
}