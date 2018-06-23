import { App } from './components/app';
import './index.css';
import { isCompatible } from 'viage';

export let app: App;
if (isCompatible()) {
    app = new App();
}
