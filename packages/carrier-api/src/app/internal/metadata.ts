import { CarrierAppDefinition } from '../carrier-app-definition';
import { ShippingProviderConnector } from '../metadata/shipping-provider-connector';
import { FunctionSpecification } from '../metadata/function';

import { CarrierAppSpecification } from './carrier-app-specificaion';
import { CarrierSpecification } from './carrier-specificaion';

const fn = (name: string): FunctionSpecification => ({
  Name: name,
  IsSandboxed: false,
});

const mapFunctions = (app: CarrierAppDefinition): FunctionSpecification[] => {
  const fns: FunctionSpecification[] = [];

  if (app.Register) {
    fns.push(fn('Register'));
  }

  if (app.CreateLabel) {
    fns.push(fn('CreateLabel'));
  }

  if (app.VoidLabels) {
    fns.push(fn('VoidLabels'));
  }

  if (app.CreateManifest) {
    fns.push(fn('CreateManifest'));
  }

  if (app.SchedulePickup) {
    fns.push(fn('SchedulePickup'));
  }

  if (app.CancelPickup) {
    fns.push(fn('CancelPickup'));
  }

  if (app.GetRates) {
    fns.push(fn('GetRates'));
  }

  if (app.Track) {
    fns.push(fn('Track'));
  }

  return fns;
};

export class Metadata implements CarrierAppSpecification {
  Id: string;
  Name: string;
  Connector: ShippingProviderConnector;
  Carriers: CarrierSpecification[];

  constructor(app: CarrierAppDefinition) {
    this.Id = app.Metadata.Id;
    this.Name = app.Metadata.Name;
    this.Carriers = app.Metadata.Carriers.map(
      (c) => new CarrierSpecification(c),
    );

    this.Connector = {
      DiagnosticRoutes: {
        Liveness: '/diagnostics/liveness',
        Readiness: '/diagnostics/readiness',
        Version: '/diagnostics/version',
      },
      ApiVersion: '2.0.0',
      Functions: mapFunctions(app),
    };
  }
}
