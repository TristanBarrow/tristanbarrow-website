import { std, admin, tb } from '../../../backend/middleware/auth';

const res: ResponseObj = {
    json: jest.fn(),
}

const next = jest.fn();

const makeReq = ({
    loggedIn, 
    isAdmin = false,
    username = 'NormalUser'
}: MakeReqParam): RequestObj => {
    return {
        session: {
            loggedIn,
            isAdmin,
            username,
        }
    }
}

beforeEach(() => {});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Standard Authentication', () => {
    it('allows you past if you are authenticated to a standard level', () => {
        const req: RequestObj = makeReq({
            loggedIn: true,
        });
        std(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
        expect(res.json).not.toHaveBeenCalled();
    });
    it('does not allow you past if you are not logged in', () => {
        const req: RequestObj = makeReq({
            loggedIn: false,
        });        
        std(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledTimes(1)
    });
});

describe('Admin Authentication', () => {
    it('does not let you past if you are not logged in', () => {
        const req: RequestObj = makeReq({
            loggedIn: false,
        });
        admin(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledTimes(1);
    });
    it('does not let you past if you are not admin', () => {
        const req: RequestObj = makeReq({
            loggedIn: false,
        });
        admin(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledTimes(1);
    });
    it('lets you past if you are admin and logged in', () => {
        const req: RequestObj = makeReq({
            loggedIn: true,
            isAdmin: true
        });
        admin(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
        expect(res.json).not.toHaveBeenCalled();
    });
});

describe('Tristan Authentication', () => {
    it('does not let you past if you are not logged in', () => {
        const req: RequestObj = makeReq({
            loggedIn: false,
        });
        tb(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledTimes(1);
    });
    it('does not let you past if you are not admin even if your username is "TristanBarrow"', () => {
         const req: RequestObj = makeReq({
            loggedIn: true,
            isAdmin: false,
            username: 'TristanBarrow',
        });
        tb(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledTimes(1);       
    });
    it('does not let you past if your username is not "TristanBarrow" but you are admin', () => {
         const req: RequestObj = makeReq({
            loggedIn: true,
            isAdmin: false,
        });
        tb(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledTimes(1);       
    });
    it('will let you past if you are logged in you are admin and your name is "TristanBarrow"', () => {
         const req: RequestObj = makeReq({
            loggedIn: true,
            isAdmin: true,
            username: 'TristanBarrow'
        });
        tb(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
        expect(res.json).not.toHaveBeenCalled();
    });
});

type RequestObj = {
    session: {
        loggedIn: boolean
        isAdmin: boolean
        username: string
    }
}

type ResponseObj = {
    json: (json: object) => void
}

type MakeReqParam = {
    loggedIn: boolean 
    isAdmin?: boolean
    username?: string 
}