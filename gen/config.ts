enum Crud {
    CREATE = 'CREATE',
    READ   = 'READ',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

enum TsType {
    BOOLEAN = 'boolean', 
    STRING = 'string',
    NUMBER = 'number',
}

enum DbType {
    NUMBER = '',
    BOOLEAN = '',
    STRING = 'VARCHAR(255) NOT NULL',
    LONG_STRING = 'VARCHAR(1023) NOT NULL',
    LONG_LONG_STRING = 'VARCHAR(4095) NOT NULL',
}

type Prop = {
    name: string
    dbType: DbType | string
    tsType: TsType
}

enum Permission {
    NONE,
    STD,
    AUTH,
    TB,
} 

type CrudOp = {
    crud: Crud
    perm: Permission
}

type ConfigObject = {
    name: string
    curd: CrudOp[]
    props: Prop[]
}

const CONFIG: ConfigObject[] = [
    {
        name: 'todo',
        curd: [
            {crud: Crud.CREATE, perm: Permission.AUTH},
            {crud: Crud.READ,   perm: Permission.AUTH},
            {crud: Crud.DELETE, perm: Permission.AUTH},
            {crud: Crud.UPDATE, perm: Permission.AUTH},
        ],
        props: [
            {name: 'name', dbType: DbType.STRING, tsType: TsType.STRING},
            {name: 'description', dbType: DbType.LONG_STRING, tsType: TsType.STRING},
            {name: 'isFinished', dbType: DbType.BOOLEAN, tsType: TsType.BOOLEAN},
        ]
    }
];

export default CONFIG