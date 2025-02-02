import { getCamelRandomId } from '../../../../camel-utils/camel-random-id';

export const routeTemplate = () => {
  return `- route:
    id: ${getCamelRandomId('route')}
    from:
      id: ${getCamelRandomId('from')}
      uri: timer
      parameters:
        timerName: template
        period: "1000"
      steps:
        - log:
            id: ${getCamelRandomId('log')}
            message: template message`;
};
