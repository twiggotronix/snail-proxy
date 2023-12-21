import * as process from 'process';

export const config = () => ({
  port: process.env.PORT || 3001,
  delay: process.env.DELAY || 5000,
});
