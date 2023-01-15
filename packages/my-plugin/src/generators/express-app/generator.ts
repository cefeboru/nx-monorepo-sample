import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import  { applicationGenerator as expressGenerator } from '@nrwl/express';
import * as path from 'path';
import { ExpressAppGeneratorSchema } from './schema';

interface NormalizedSchema extends ExpressAppGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(tree: Tree, options: ExpressAppGeneratorSchema): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
    const templateOptions = {
      ...options,
      ...names(options.name),
      offsetFromRoot: offsetFromRoot(options.projectRoot),
      template: ''
    };
    generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}

export default async function (tree: Tree, options: ExpressAppGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await expressGenerator(tree, {
     ...options,
     skipPackageJson: false,
  });

  addFiles(tree, normalizedOptions);
  
  await formatFiles(tree);
}
