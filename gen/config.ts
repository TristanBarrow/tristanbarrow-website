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
    auth: Permission
    crud: {
        all: boolean
        create?: Permission
        read?:   Permission
        update?: Permission
        remove?: Permission
    }
    props: Prop[]
}

const CONFIG: ConfigObject[] = [
    {
        name: 'todo',
        auth: Permission.STD,
        crud: {
            all: false,
            create: Permission.STD,
            read: Permission.STD,
            update: Permission.STD, 
            remove: Permission.STD,
        },
        props: [
            {name: 'name', dbType: DbType.STRING_NN, tsType: TsType.STRING},
            {name: 'description', dbType: DbType.LONG_STRING_NN, tsType: TsType.STRING},
            {name: 'is_finished', dbType: DbType.BOOLEAN_NN, tsType: TsType.BOOLEAN},
        ]
    },
    // {
    //     name: 'project',
    //     auth: Permission.ADMIN,
    //     crud: {
    //         all: false,
    //         create: Permission.ADMIN,
    //         read: Permission.NONE,
    //         update: Permission.ADMIN, 
    //         remove: Permission.ADMIN,
    //     },
    //     props: [
    //         {name: 'title', dbType: DbType.STRING_NN, tsType: TsType.STRING},
    //         {name: 'sub_title', dbType: DbType.LONG_STRING_NN, tsType: TsType.STRING},
    //         {name: 'body', dbType: DbType.TEXT_NN, tsType: TsType.STRING},
    //     ]
    // }
];

export default CONFIG;