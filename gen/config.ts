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
            {name: 'is_finished', dbType: DbType.BOOLEAN_FALSE, tsType: TsType.BOOLEAN},
        ]
    },
    {
        name: 'project',
        auth: Permission.ADMIN,
        crud: {
            all: false,
            create: Permission.ADMIN,
            read: Permission.NONE,
            update: Permission.ADMIN, 
            remove: Permission.ADMIN,
        },
        props: [
            {name: 'title', dbType: DbType.STRING_NN, tsType: TsType.STRING},
            {name: 'sub_title', dbType: DbType.LONG_STRING_NN, tsType: TsType.STRING},
            {name: 'description', dbType: DbType.TEXT_NN, tsType: TsType.STRING},
            {name: 'link', dbType: DbType.STRING_NN, tsType: TsType.STRING},
        ]
    },
    {
        name: 'exercise',
        auth: Permission.NONE,
        crud: {
            all: false,
            create: Permission.ADMIN,
            read: Permission.NONE,
            update: Permission.ADMIN, 
            remove: Permission.DNE,
        },
        props: [
            {name: 'name', dbType: DbType.STRING_NN, tsType: TsType.STRING},
            {name: 'description', dbType: DbType.LONG_LONG_STRING_NN, tsType: TsType.STRING},
        ]
    },
    {
        name: 'workout',
        auth: Permission.NONE,
        crud: {
            all: false,
            create: Permission.STD,
            read: Permission.STD,
            update: Permission.STD, 
            remove: Permission.STD,
        },
        props: [
            {name: 'workout_type', dbType: DbType.STRING_NN, tsType: TsType.STRING},
            {name: 'date', dbType: DbType.STRING_NN, tsType: TsType.STRING},
            {name: 'description', dbType: DbType.LONG_STRING_NN, tsType: TsType.STRING},
        ]
    },
    {
        name: 'workoutSet',
        auth: Permission.NONE,
        crud: {
            all: false,
            create: Permission.STD,
            read: Permission.STD,
            update: Permission.STD, 
            remove: Permission.STD,
        },
        props: [
            {name: 'workout', dbType: DbType.INTEGER_NN, tsType: TsType.NUMBER},
            {name: 'exercise', dbType: DbType.INTEGER_NN, tsType: TsType.NUMBER},
            {name: 'workoutOrder', dbType: DbType.INTEGER_NN, tsType: TsType.NUMBER},
            {name: 'resistance', dbType: DbType.INTEGER_NN, tsType: TsType.NUMBER},
            {name: 'reps', dbType: DbType.INTEGER_NN, tsType: TsType.NUMBER},
            {name: 'side', dbType: DbType.STRING_NN, tsType: TsType.STRING},
            {name: 'notes', dbType: DbType.LONG_LONG_STRING, tsType: TsType.STRING},
        ]
    },
];

export default CONFIG;