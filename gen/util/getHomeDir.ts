export const getHomeDir = (): string[] => {
    let home = `${__dirname}`;
    let homeArray = home.split('/');
    homeArray.pop();
    homeArray.pop();
    home = homeArray.join('/');
    return homeArray;
}