const devMode = process.env.NODE_ENV.trim() !== "production";

module.exports = {
    plugins: {
        'postcss-modules': {
            getJSON: function(cssFileName, json){
                const path = require('path'), fs = require('fs');
                const moduleFile = path.resolve('./tmp/module-data.json');
                const cssName = path.basename(cssFileName, '.scss');
                const moduleData = fs.existsSync(moduleFile) ? require(moduleFile) : {};
                moduleData[cssName] = json;
                fs.existsSync('./tmp') || fs.mkdirSync('./tmp');
                fs.writeFileSync(moduleFile, JSON.stringify(moduleData));
            },
            // generateScopedName: '[hash:base64:5]'
            generateScopedName: '[local]'
        }
    }
}