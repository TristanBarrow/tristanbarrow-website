export default () => { 
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Tristan Barrow</title>
            <style>
                html,
                body {
                    margin: 0;
                    border: 0;
                    padding: 0;
                    font-size: 62.5%;
                }
            </style>
        </head>
        <body>
            <div id='app'></div>
            <script src="/bundle"></script>
        </body>
        </html>
    `;
}