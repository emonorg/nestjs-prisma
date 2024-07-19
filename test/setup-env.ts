import { config } from 'dotenv';
if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' });
} else {
  config({ path: '.env.test.local' });
}
