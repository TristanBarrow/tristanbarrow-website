import { s3 } from './s3instance';

export const getAwsImageUrl = (bucket: string, file: string): string => {
    return s3.getSignedUrl('getObject', {
        Bucket: bucket,
        Key: file,
    });
}