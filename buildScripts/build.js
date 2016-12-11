// Production Build file

/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

// bable and some other tools look for this setting.  So if you have a dev specific setup somewhere,
// it will make a difference
process.env.NODE_ENV = 'production';

console.log(chalk.blue('Generating minified bundle for production.  This will take a few moments'));

webpack(webpackConfig).run((err, stats) => {
    if (err) {
        console.log(chalk.red(err));
        return 1;
    }

    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
        return jsonStats.errors.map(error => console.log(chalk.red(error)));
    }

    if (jsonStats.hasWarnings) {
        console.log(chalk.yellow('webpack has generated the following warnings: '));
        jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
    }

    console.log(`Webpack stats: ${stats}`);

    // if got this far, the build has succeeded
    console.log(chalk.green('your app has built for production and written to /dist folder !!!!'));


    return 0;
});
