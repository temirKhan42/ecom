import { useContext } from 'react';
import { MainImageContext } from '../context/index.js';

export const useMainImage = () => useContext(MainImageContext);
