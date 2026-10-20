import { TextEncoder, TextDecoder } from 'node:util';
import '@testing-library/jest-dom';

// jsdom doesn't provide these globals, but react-router-dom v7 requires them.
global.TextEncoder ??= TextEncoder;
global.TextDecoder ??= TextDecoder as typeof global.TextDecoder;
