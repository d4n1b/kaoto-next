import * as catalogIndex from '@kaoto-next/camel-catalog/index.json';
import { ModelValidationService } from './model-validation.service';
import { createVisualizationNode } from '../../visualization-node';
import { NodeStatus } from '@patternfly/react-topology';
import { CamelComponentSchemaService } from './camel-component-schema.service';
import { CamelCatalogService } from '../camel-catalog.service';
import { CatalogKind } from '../../../catalog-kind';
import { ICamelComponentDefinition } from '../../../camel-components-catalog';
import { ICamelProcessorDefinition } from '../../../camel-processors-catalog';
describe('ModelValidationService', () => {
  const camelRoute = {
    route: {
      id: 'route-8888',
      from: {
        uri: 'timer:tutorial',
        steps: [
          {
            to: {
              uri: 'activemq',
              parameters: {},
            },
          },
        ],
      },
    },
  };

  beforeAll(async () => {
    const componentCatalogMap = await import('@kaoto-next/camel-catalog/' + catalogIndex.catalogs.components.file);
    const modelCatalogMap = await import('@kaoto-next/camel-catalog/' + catalogIndex.catalogs.models.file);
    const patternCatalogMap = await import('@kaoto-next/camel-catalog/' + catalogIndex.catalogs.patterns.file);
    CamelCatalogService.setCatalogKey(
      CatalogKind.Component,
      componentCatalogMap as unknown as Record<string, ICamelComponentDefinition>,
    );
    CamelCatalogService.setCatalogKey(
      CatalogKind.Processor,
      modelCatalogMap as unknown as Record<string, ICamelProcessorDefinition>,
    );
    CamelCatalogService.setCatalogKey(
      CatalogKind.Pattern,
      patternCatalogMap as unknown as Record<string, ICamelProcessorDefinition>,
    );
  });

  describe('validateNodeStatus()', () => {
    it('should set warning status if required parameter is missing', () => {
      const model = camelRoute.route.from.steps[0].to;
      const path = 'route.from.steps[0].to';
      const schema = CamelComponentSchemaService.getVisualComponentSchema(path, model);
      const vizNode = createVisualizationNode('dummy', {});
      ModelValidationService.validateNodeStatus(schema, model, vizNode);
      expect(vizNode.getNodeStatus()).toEqual(NodeStatus.warning);
      expect(vizNode.getNodeStatusMessage()).toContain('destinationName');
    });

    it('should set default status if required parameter is set', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const model = { ...camelRoute.route.from.steps[0].to } as any;
      model.parameters['destinationName'] = 'myQueue';
      const path = 'route.from.steps[0].to';
      const schema = CamelComponentSchemaService.getVisualComponentSchema(path, model);
      const vizNode = createVisualizationNode('dummy', {});
      ModelValidationService.validateNodeStatus(schema, model, vizNode);
      expect(vizNode.getNodeStatus()).toEqual(NodeStatus.default);
      expect(vizNode.getNodeStatusMessage()).toBeUndefined();
    });
  });
});
