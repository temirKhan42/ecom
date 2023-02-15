import { createWrapper } from 'next-redux-wrapper';
import store from '../store';

export default createWrapper(() => store);
