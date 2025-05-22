
import { templatesMap,registerTemplates } from "./registerTemplates.js";

import { Jumbotron } from "../templates/Jumbotron.js";

// Register all templates
registerTemplates("jumbotron", Jumbotron.data, Jumbotron.config, Jumbotron.getItems);



export const TemplatesMap = templatesMap;