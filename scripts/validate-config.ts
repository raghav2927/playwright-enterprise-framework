import { createAppConfig } from '@config/environment';

function main(): void {
  const config = createAppConfig();

  console.log('Configuration is valid.');
  console.log(`Environment: ${config.environment}`);
  console.log(`Web base URL: ${config.webBaseUrl}`);
  console.log(`API base URL: ${config.apiBaseUrl}`);
}

main();
``