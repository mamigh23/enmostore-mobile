import {environment} from '../src/config/environment';
test('api base URL is versioned',()=>{expect(environment.apiBaseUrl).toContain('/api/v1')});
