import { Request, Response } from 'express';
import { Nuxt } from 'nuxt';

import * as config from '../nuxt.config.js';

export default new Nuxt({ ...config, dev: false });
