import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCdkx3THxbf1xzZFBMY1pbR3ZPMyBoS35RdUVkW39edXBWRmlZVEN/');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
