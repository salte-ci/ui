import debug from 'debug';

export const RootLogger = debug('salte-ci');
export const ComponentLogger = RootLogger.extend('components');
