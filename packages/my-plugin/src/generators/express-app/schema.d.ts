import { Schema } from '@nrwl/express/src/generators/application/schema';

export interface ExpressAppGeneratorSchema extends Schema {
    name: string;
    tags?: string;
    directory?: string;
}