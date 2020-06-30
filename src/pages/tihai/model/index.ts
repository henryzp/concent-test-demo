import { configure } from 'concent';
import state from './state';
import * as reducer from './reducer';
import init from './init';

const tihaiModule = { state, reducer, init };

configure('tihai', tihaiModule);
