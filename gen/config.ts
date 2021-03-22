import { Permission } from './types/Permission';
import { DbType } from './types/DbType';
import { TsType } from './types/TsType';

type Prop = {
    name: string
    dbType: DbType | string
    tsType: TsType
}

export type ConfigObject = {
    name: string
    crud: {
        all: boolean
        create?: Permission
        read?: Permission
        update?: Permission
        remove?: Permission
    }
    props: Prop[]
}

const CONFIG: ConfigObject[] = [
    {
        name: 'todo',
        crud: {
            all: false,
            create: Permission.STD,
            read: Permission.STD,
            update: Permission.STD, 
            remove: Permission.STD,
        },
        props: [
            {name: 'name', dbType: DbType.STRING, tsType: TsType.STRING},
            {name: 'description', dbType: DbType.LONG_STRING, tsType: TsType.STRING},
            {name: 'isFinished', dbType: DbType.BOOLEAN, tsType: TsType.BOOLEAN},
        ]
    }
];

export default CONFIG