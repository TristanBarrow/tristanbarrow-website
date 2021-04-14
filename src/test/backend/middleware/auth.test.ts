import { std, admin, tb } from '../../../backend/middleware/auth';

describe('Standard Authentication', () => {
    it('allows you past if you are authenticated to a standard level', () => {
        const req = {
            session: {
                loggedIn: true
            }
        }
        const next = jest.fn();
        std(req, {}, next);
        expect(next).toHaveBeenCalledTimes(1);
        
    });
});