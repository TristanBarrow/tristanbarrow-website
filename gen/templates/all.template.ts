const location = ['src', 'backend', 'api', 'endpoints', 'gen', 'all.ts'];


const generateAllRoutes = (routeSets: string[]) => {
    let imports = '';
    let calls = '';

    if (routeSets.length !== 0) {
        imports = routeSets.map((routeSet: string) => {
            return `import { ${routeSet} } from './${routeSet}'`;
        }).join('\n');

        calls = routeSets.map((routeSet: string) => {
            return `    ${routeSet}(app);`;
        }).join('\n');
    }

    return {
        location,
        template: generateAllRoutesTemplate({
            imports,
            calls
        })
    };
}

type GenerateAllRoutesTemplateArgs = {
    imports: string
    calls: string
}

const generateAllRoutesTemplate = ({
    imports,
    calls
}: GenerateAllRoutesTemplateArgs) => (
`import { Express } from 'express'; 

import { application } from '../application';
import { user } from '../user';
${imports}

export default (app: Express) => {
    application(app);
    user(app);
${calls}

}
`);

export default generateAllRoutes;