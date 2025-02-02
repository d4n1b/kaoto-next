import { render } from '@testing-library/react';
import { TestProvidersWrapper } from '../../../stubs';
import { VisualizationEmptyState } from './VisualizationEmptyState';

describe('VisualizationEmptyState.tsx', () => {
  describe('when there are no routes', () => {
    it.only('should render the CubesIcon whenever there are no routes', () => {
      const wrapper = render(
        <TestProvidersWrapper>
          <VisualizationEmptyState entitiesNumber={0} />
        </TestProvidersWrapper>,
      );

      const icon = wrapper.getByTestId('cubes-icon');

      expect(icon).toBeInTheDocument();
    });

    it('should state that there are no routes', () => {
      const wrapper = render(
        <TestProvidersWrapper>
          <VisualizationEmptyState entitiesNumber={0} />
        </TestProvidersWrapper>,
      );

      const noRoutesTitle = wrapper.getByText('There are no routes defined');
      const noRoutesSuggestion = wrapper.getByText('You can create a new route using the New button');

      expect(noRoutesTitle).toBeInTheDocument();
      expect(noRoutesSuggestion).toBeInTheDocument();
    });
  });

  describe('when there are routes but they are not visible', () => {
    it('should render the EyeSlashIcon whenever there are no routes', () => {
      const wrapper = render(
        <TestProvidersWrapper>
          <VisualizationEmptyState entitiesNumber={1} />
        </TestProvidersWrapper>,
      );
      const icon = wrapper.getByTestId('eye-slash-icon');

      expect(icon).toBeInTheDocument();
    });

    it('should state that there are no visible routes', () => {
      const wrapper = render(
        <TestProvidersWrapper>
          <VisualizationEmptyState entitiesNumber={1} />
        </TestProvidersWrapper>,
      );
      const noRoutesTitle = wrapper.getByText('There are no visible routes');
      const noRoutesSuggestion = wrapper.getByText('You can toggle the visibility of a route by using Routes list');

      expect(noRoutesTitle).toBeInTheDocument();
      expect(noRoutesSuggestion).toBeInTheDocument();
    });
  });
});
